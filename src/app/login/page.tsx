
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if ((email === 'buyer@example.com' && password === 'password123') || (email === 'admin@ecoshop.md' && password === 'adminpass')) {
      localStorage.setItem('authToken', 'mockAuthToken'); 
      localStorage.setItem('userEmail', email);
      if (email === 'buyer@example.com') {
        localStorage.setItem('userName', 'Alex Buyer'); 
      }

      toast({ title: t('loginPage.loginSuccessToastTitle'), description: t('loginPage.loginSuccessToastDescription') });
      
      const redirectUrl = searchParams.get('redirect');
      if (email === 'admin@ecoshop.md' && (redirectUrl || '/admin').startsWith('/admin')) {
        router.push(redirectUrl || '/admin');
      } else if (email === 'buyer@example.com') {
        router.push(redirectUrl || '/account');
      } else {
         router.push('/'); 
      }

    } else {
      toast({ title: t('loginPage.loginFailedToastTitle'), description: t('loginPage.loginFailedToastDescription'), variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        <CardHeader className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto" />
          </Link>
          <CardTitle className="font-headline text-3xl text-primary">{t('loginPage.siteTitle')}</CardTitle>
          <CardDescription>{t('loginPage.loginToAccount')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('loginPage.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base h-11 rounded-md border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('loginPage.passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-base h-11 rounded-md border-border focus:border-primary"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? t('loginPage.loggingInButton') : t('loginPage.loginButton')}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('loginPage.noAccount')}{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              {t('loginPage.signUpLink')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
