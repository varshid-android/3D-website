import React from 'react';

interface ChatMarkdownProps {
  content: string;
}

export const ChatMarkdown: React.FC<ChatMarkdownProps> = ({ content }) => {
  // Split into paragraphs by double newlines or single newlines
  const lines = content.split('\n');

  const renderFormattedText = (text: string): React.ReactNode[] => {
    // Regex to match links [label](url), bold **bold**, code `code`
    const tokens: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // 1. Link [text](url)
      const linkMatch = remaining.match(/^\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [full, label, url] = linkMatch;
        const isInternalAnchor = url.startsWith('#');

        tokens.push(
          <a
            key={`link-${keyIdx++}`}
            href={url}
            target={isInternalAnchor ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="text-[#ff5c26] hover:text-[#ff7847] underline underline-offset-2 font-medium transition-colors cursor-pointer"
            onClick={(e) => {
              if (isInternalAnchor) {
                e.preventDefault();
                const targetEl = document.getElementById(url.replace('#', ''));
                if (targetEl) {
                  targetEl.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            {label}
          </a>
        );
        remaining = remaining.slice(full.length);
        continue;
      }

      // 2. Bold **text**
      const boldMatch = remaining.match(/^\*\*(.*?)\*\*/);
      if (boldMatch) {
        const [full, boldText] = boldMatch;
        tokens.push(
          <strong key={`bold-${keyIdx++}`} className="font-semibold text-white">
            {boldText}
          </strong>
        );
        remaining = remaining.slice(full.length);
        continue;
      }

      // 3. Inline code `code`
      const codeMatch = remaining.match(/^`(.*?)`/);
      if (codeMatch) {
        const [full, codeText] = codeMatch;
        tokens.push(
          <code
            key={`code-${keyIdx++}`}
            className="px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 text-xs font-mono"
          >
            {codeText}
          </code>
        );
        remaining = remaining.slice(full.length);
        continue;
      }

      // 4. Plain text up to next special character [ * `
      const nextSpecial = remaining.search(/(\[|\*\*|`)/);
      if (nextSpecial === -1) {
        tokens.push(remaining);
        break;
      } else if (nextSpecial === 0) {
        // Unmatched single special char
        tokens.push(remaining[0]);
        remaining = remaining.slice(1);
      } else {
        tokens.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }

    return tokens;
  };

  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[#ee4405] text-xs mt-1.5 select-none">•</span>
              <div className="flex-1">{renderFormattedText(trimmed.slice(2))}</div>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[#ee4405] font-mono text-xs mt-0.5 select-none">
                {numMatch[1]}.
              </span>
              <div className="flex-1">{renderFormattedText(numMatch[2])}</div>
            </div>
          );
        }

        return <p key={idx}>{renderFormattedText(line)}</p>;
      })}
    </div>
  );
};
