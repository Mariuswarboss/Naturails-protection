
"use client";

import SiteLayout from '@/components/SiteLayout';
import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <SiteLayout>
      <div className="mb-8 text-center">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t('contactPage.title')}</h1>
        <p className="text-base md:text-lg text-foreground/80 mt-2">{t('contactPage.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <Card className="shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center text-xl md:text-2xl">
              <MapPin className="h-6 w-6 mr-2 text-primary" />
              {t('contactPage.ourLocation')}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="space-y-2 text-muted-foreground mb-4 text-sm md:text-base">
                <p><strong>{t('contactPage.companyNameLabel')}</strong> DIABRAVO SRL</p>
                <p><strong>{t('contactPage.addressLabel')}</strong> {t('contactPage.addressValue')}</p>
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden border flex-grow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d838.8138695822078!2d28.805689240415884!3d47.02155713074227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97d9b229b0d93%3A0xbc94fa08481ef5cf!2sNatures%20Protection%20Moldova!5e1!3m2!1sen!2s!4v1749818509323!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px', maxHeight: '400px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nature's Protection Moldova Location"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center text-xl md:text-2xl">
                    <Phone className="h-6 w-6 mr-2 text-primary" />
                    {t('contactPage.contactDetailsTitle')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-foreground/90 text-base md:text-lg">
                    <div className="flex flex-col">
                        <span className="font-semibold">Angela Chistrea</span>
                        <a href="tel:+37369110316" className="text-primary hover:underline">(+373) 069110316</a>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Igor Chistrea</span>
                        <a href="tel:+37369149646" className="text-primary hover:underline">(+373) 069149646</a>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
