"use client";

import { trackResultCopied } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

interface CopyButtonProps {
  text: string;
  className?: string;
  calculatorName?: string;
}

export function CopyButton({ text, className, calculatorName = 'general' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    
    if (success) {
      setCopied(true);
      trackResultCopied(calculatorName, 'full_results');
      toast({
        title: "¡Copiado!",
        description: "Los resultados se han copiado al portapapeles",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: "Error",
        description: "No se pudo copiar. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="sm"
      className={className}
      aria-label="Copiar resultados al portapapeles"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          ¡Copiado!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-2" />
          Copiar resultados
        </>
      )}
    </Button>
  );
}