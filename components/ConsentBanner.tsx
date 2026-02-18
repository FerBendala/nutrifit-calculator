"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { initializeAutoAds } from '@/lib/adsense';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

// Funciones auxiliares fuera del componente para evitar dependencias
const loadGTM = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
};

const loadAdSense = (isMobile: boolean) => {
  const delay = isMobile ? 1500 : 1000;

  setTimeout(() => {
    initializeAutoAds().catch(() => {
      // AdSense may be blocked — fail silently
    });
  }, delay);
};

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    advertising: false
  });

  useEffect(() => {
    // Detectar si es mobile para ajustar timing
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // Si ya hay consentimiento, cargar los scripts automáticamente
      const consentData = JSON.parse(consent);
      if (consentData.analytics && process.env.NEXT_PUBLIC_GTM_ID) {
        loadGTM();
      }
      if (consentData.advertising && process.env.NEXT_PUBLIC_ADSENSE_ID) {
        loadAdSense(isMobile);
      }
    }
  }, []);

  const saveConsent = (acceptAll: boolean = false) => {
    // Detectar si es mobile para ajustar timing
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const consentData = acceptAll ? {
      necessary: true,
      analytics: true,
      advertising: true
    } : preferences;

    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    localStorage.setItem('ads-consent', consentData.advertising.toString());
    localStorage.setItem('analytics-consent', consentData.analytics.toString());

    setShowBanner(false);

    // Actualizar consent mode con delay para mobile
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: consentData.advertising ? 'granted' : 'denied',
        analytics_storage: consentData.analytics ? 'granted' : 'denied',
        ad_user_data: consentData.advertising ? 'granted' : 'denied',
        ad_personalization: consentData.advertising ? 'granted' : 'denied'
      });
    }

    // Load scripts based on consent con timing optimizado para mobile
    if (consentData.analytics && process.env.NEXT_PUBLIC_GTM_ID) {
      loadGTM();
    }

    if (consentData.advertising && process.env.NEXT_PUBLIC_ADSENSE_ID) {
      // Delay ajustado para mobile - dar tiempo al consent mode
      const delay = isMobile ? 1000 : 500;
      setTimeout(() => {
        loadAdSense(isMobile);
      }, delay);
    }
  };


  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-t">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">🍪 Gestión de Cookies</h3>
              <p className="text-sm text-muted-foreground">
                Utilizamos cookies necesarias para el funcionamiento del sitio y opcionales para
                análisis y publicidad. Puedes gestionar tus preferencias en cualquier momento.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Preferencias de Cookies</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Necesarias</div>
                        <div className="text-sm text-muted-foreground">
                          Esenciales para el funcionamiento del sitio
                        </div>
                      </div>
                      <Switch checked={true} disabled />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Análisis</div>
                        <div className="text-sm text-muted-foreground">
                          Google Analytics para mejorar la experiencia
                        </div>
                      </div>
                      <Switch
                        checked={preferences.analytics}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, analytics: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Publicidad</div>
                        <div className="text-sm text-muted-foreground">
                          Google AdSense para mostrar anuncios relevantes
                        </div>
                      </div>
                      <Switch
                        checked={preferences.advertising}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, advertising: checked }))
                        }
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={() => saveConsent(false)} className="flex-1">
                        Guardar preferencias
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button onClick={() => saveConsent(true)} size="sm">
                Aceptar todas
              </Button>

              <Button
                onClick={() => saveConsent(false)}
                variant="outline"
                size="sm"
              >
                Solo necesarias
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}