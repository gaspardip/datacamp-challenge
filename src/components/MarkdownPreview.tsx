import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { memo } from 'react';
import Markdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type MarkdownPreviewProps = {
  markdown: string;
}

export const MarkdownPreview = memo(({ markdown }: MarkdownPreviewProps) => {
  return <Card className="h-full rounded-none border-0 bg-background">
    <ScrollArea className="h-full">
      <div className="p-4 prose max-w-none">
        <Markdown components={components}>{markdown}</Markdown>
      </div>
    </ScrollArea>
  </Card>
});

const components: Components = {
  code(props) {
    const { children, className, node, ref, ...rest } = props;
    const match = /language-(\w+)/.exec(className ?? '');

    return match ? (
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={match[1]}
        style={{
          ...dark,
          'pre[class*="language-"]': {
            ...dark['pre[class*="language-"]'],
            margin: 0,
            padding: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent',
            border: 'none',
          }
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code {...rest} className={`${className} bg-secondary/30 px-1.5 py-0.5 rounded-md`}>
        {children}
      </code>
    );
  },
}