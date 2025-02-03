import { Card } from '@/components/ui/card';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import { useDeferredValue } from 'react';
import { Actions } from './components/Actions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { MarkdownPreview } from './components/MarkdownPreview';
import { Stats } from './components/Stats';

const defaultMarkdown = "# Test document\n\nLet's create a variable `x`, equal to 5.\n\n```\nx = 5\n```";

const MARKDOWN_KEY = 'markdown';

export function App() {
  const [markdown, setMarkdown] = useLocalStorage(MARKDOWN_KEY, defaultMarkdown);
  const deferredMarkdown = useDeferredValue(markdown)!;

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b border-border/40 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h1 className="font-semibold text-foreground">Markdown Editor</h1>
        </div>
        <Actions markdown={markdown} />
        <Stats markdown={markdown} />
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
