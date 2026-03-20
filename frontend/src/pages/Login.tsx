import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(4, 'Mínimo de 4 caracteres'),
});

type LoginForm = z.infer<typeof schema>;

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
}

export default function Login({ onLogin }: LoginProps) {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    setError('');
    const success = onLogin(data.email, data.password);
    if (!success) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-gold-light via-background to-rose-gold-light/50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-rose mb-4">
            <Scissors className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Studio KC</h1>
          <p className="text-muted-foreground mt-1">Gerencie seu salão com elegância</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-rose-lg border border-border p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Entrar</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="h-11 border-input focus-visible:ring-primary"
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                className="h-11 border-input focus-visible:ring-primary"
                {...register('password')}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-primary-foreground font-medium shadow-rose transition-all"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Studio KC — Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
