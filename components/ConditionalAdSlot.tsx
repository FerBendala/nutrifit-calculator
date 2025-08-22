"use client";

import { useEffect, useState } from 'react';
import { AdSlot } from './AdSlot';

interface ConditionalAdSlotProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
  /** Solo mostrar después de que el usuario haya interactuado */
  requireInteraction?: boolean;
  /** Elemento que debe existir para mostrar el anuncio */
  requireElement?: string;
}

export function ConditionalAdSlot({
  adSlot,
  adFormat = "auto",
  style = { display: 'block' },
  className = "",
  requireInteraction = true,
  requireElement
}: ConditionalAdSlotProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!requireInteraction && !requireElement) {
      setShouldShow(true);
      return;
    }

    const checkConditions = () => {
      let canShow = true;

      // Verificar si se requiere interacción del usuario
      if (requireInteraction) {
        // Buscar elementos que indiquen que el usuario ha interactuado
        const hasResults = document.querySelector('[class*="result"], [class*="calculation"], .text-primary') !== null;
        const hasFilledForms = Array.from(document.querySelectorAll('input, select, textarea')).some(
          (element: any) => element.value && element.value.trim() !== ''
        );

        canShow = canShow && (hasResults || hasFilledForms);
      }

      // Verificar si se requiere un elemento específico
      if (requireElement) {
        const elementExists = document.querySelector(requireElement) !== null;
        canShow = canShow && elementExists;
      }

      setShouldShow(canShow);
    };

    // Verificar inmediatamente
    checkConditions();

    // Verificar periódicamente para cambios dinámicos
    const interval = setInterval(checkConditions, 1000);

    // También escuchar eventos de formulario
    const handleFormSubmit = () => {
      setTimeout(checkConditions, 500); // Retraso para permitir que se rendericen los resultados
    };

    document.addEventListener('submit', handleFormSubmit);

    return () => {
      clearInterval(interval);
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, [requireInteraction, requireElement]);

  if (!shouldShow) {
    return null;
  }

  return (
    <AdSlot
      adSlot={adSlot}
      adFormat={adFormat}
      style={style}
      className={className}
      requireMinContent={true}
      minWords={150} // Requerir más contenido para anuncios condicionales
    />
  );
}
