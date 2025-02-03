type StatsProps = {
  markdown: string;
};

export const Stats = ({ markdown }: StatsProps) => {
  const plainText = markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*`~_]/g, '')
    .replace(/\n{2,}/g, ' ')
    .trim();

  const stats = {
    chars: markdown.length,
    words: plainText.length > 0 ? plainText.split(/\s+/).length : 0
  };

  return (
    <div className="text-sm text-muted-foreground">
      {stats.words} words | {stats.chars} characters
    </div>
  );
};
