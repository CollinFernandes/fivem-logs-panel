'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const Login = () => {
  const searchParams = useSearchParams();
  const error: string | null = searchParams.get('error');

  const handleLogin = () => {
    signIn('discord', { callbackUrl: 'http://localhost:3000/dash' });
  };

  return (
    <main className="w-screen min-h-screen flex items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="font-bold text-3xl leading-6 text-center">Bitte Einloggen!</CardTitle>
          <CardDescription className="text-center text-md">
            Bitte logge dich mit deinem <strong>Discord Account</strong> ein!
          </CardDescription>
        </CardHeader>

        <CardContent className="-mt-3">
          <Button className="w-full" onClick={handleLogin}>
            <LogIn /> Mit Discord Einloggen
          </Button>
        </CardContent>

        {error && (
          <CardFooter>
            <h4 className="w-full text-center text-red-500 -mt-2">
              <b>Fehler:</b> {error === 'AccessDenied' ? 'Du hast keinen zugang zum Panel!' : error}
            </h4>
          </CardFooter>
        )}
      </Card>
    </main>
  );
};

export default Login;
