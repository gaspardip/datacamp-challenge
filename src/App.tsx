import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, FileText } from 'lucide-react';
import { useDeferredValue } from 'react';
import { useToast } from './hooks/use-toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { MarkdownPreview } from './MarkdownPreview';
import { Stats } from './Stats';

const defaultMarkdown = "# Test document\n\nLet's create a variable `x`, equal to 5.\n\n```\nx = 5\n```";

const MARKDOWN_KEY = 'markdown';

export function App() {
  const { toast } = useToast();

  const [markdown, setMarkdown] = useLocalStorage(MARKDOWN_KEY, defaultMarkdown);

  const deferredMarkdown = useDeferredValue(markdown)!;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast({
        title: 'Copied to clipboard',
      });
    } catch (e) {
      toast({
        title: 'Failed to copy to clipboard',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.md';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast({
        title: 'Download failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b border-border/40 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h1 className="font-semibold text-foreground">Markdown Editor</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="hover:bg-secondary/80"
            aria-label="Copy markdown content"
          >
            <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="hover:bg-secondary/80"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
        <Stats markdown={deferredMarkdown} />
      </header>
      <ResizablePanelGroup direction="horizontal" className="!flex-col md:!flex-row md:h-full flex-1">
        <ResizablePanel defaultSize={50} className="border-b border-border/40 md:border-b-0">
          <Card className="h-full rounded-none border-0 bg-background flex flex-col">
            <ScrollArea className="flex-1 [&>[data-radix-scroll-area-viewport]>div]:h-full">
              <div className="h-full flex flex-col p-4">
                <Textarea
                  aria-label="Markdown editor"
                  className="flex-1 w-full font-mono text-sm bg-secondary/30 border-0 resize-none focus-visible:ring-1 focus-visible:ring-ring/50"
                  value={markdown}
                  onChange={setMarkdown}
                  placeholder="Enter your markdown here..."
                  spellCheck={false}
                />
              </div>
            </ScrollArea>
          </Card>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-border/40 hover:bg-border/60 transition-colors hidden md:flex" />
        <ResizablePanel defaultSize={50}>
          <MarkdownPreview markdown={deferredMarkdown} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
