'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface CourseFlyerActionsProps {
  flyerPath: string;
}

export default function CourseFlyerActions({
  flyerPath,
}: CourseFlyerActionsProps) {
  return (
    <Card className="p-4 border-2 border-gray-200 bg-white">
      <div className="text-sm mb-3 font-medium uppercase tracking-wide swiss-blue-gradient-text">
        Event Flyer
      </div>
      <Button
        asChild
        variant="outline"
        className="w-full"
      >
        <a href={flyerPath} download>
          <Download className="w-4 h-4" />
          Download PNG
        </a>
      </Button>
    </Card>
  );
}
