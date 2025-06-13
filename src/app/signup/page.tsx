
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: t('signupPage.passwordMismatchToastTitle'), description: t('signupPage.passwordMismatchToastDescription'), variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: t('signupPage.passwordLengthToastTitle'), description: t('signupPage.passwordLengthToastDescription'), variant: "destructive" });
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    console.log('Signing up user:', { name, email, password });
    localStorage.setItem('authToken', 'mockAuthToken'); 
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);

    toast({ title: t('signupPage.signupSuccessToastTitle'), description: t('signupPage.signupSuccessToastDescription') });
    router.push('/account'); 

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        <CardHeader className="text-center space-y-2">
           <Link href="/" className="inline-block">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto" />
          </Link>
          <CardTitle className="font-headline text-3xl text-primary">{t('signupPage.siteTitle')}</CardTitle>
          <CardDescription>{t('signupPage.createAccount')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{t('signupPage.fullNameLabel')}</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-base h-11 rounded-md border-border focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="email">{t('signupPage.emailLabel')}</Label>
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
            <div>
              <Label htmlFor="password">{t('signupPage.passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="text-base h-11 rounded-md border-border focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">{t('signupPage.confirmPasswordLabel')}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="text-base h-11 rounded-md border-border focus:border-primary"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? t('signupPage.creatingAccountButton') : t('signupPage.signUpButton')}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('signupPage.alreadyHaveAccount')}{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              {t('signupPage.logInLink')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
