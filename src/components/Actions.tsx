import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

type ActionsProps = {
  markdown: string;
};

export const Actions = ({ markdown }: ActionsProps) => {
  const { toast } = useToast();

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
  );
};
