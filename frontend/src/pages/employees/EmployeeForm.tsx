import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { employeesService, type EmployeeInput } from '@/api/employeesService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
});

export default function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<EmployeeInput>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isEditing && id) {
      employeesService.getById(id).then((res) => {
        setValue('name', res.data.name);
        setValue('email', res.data.email);
        setValue('phone', res.data.phone);
      }).catch(() => toast.error('Erro ao carregar funcionária'));
    }
  }, [id, isEditing, setValue]);

  const onSubmit = async (data: EmployeeInput) => {
    try {
      if (isEditing && id) {
        await employeesService.update(id, data);
        toast.success('Funcionária atualizada');
      } else {
        await employeesService.create(data);
        toast.success('Funcionária cadastrada');
      }
      navigate('/employees');
    } catch {
      toast.error('Erro ao salvar funcionária');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-rose border-border">
        <CardHeader className="border-b border-border">
          <CardTitle>{isEditing ? 'Editar Funcionária' : 'Nova Funcionária'}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" {...register('phone')} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Link to="/employees">
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-rose"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
