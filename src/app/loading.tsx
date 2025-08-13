
import SiteLayout from '@/components/SiteLayout';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <SiteLayout>
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </SiteLayout>
  );
}
