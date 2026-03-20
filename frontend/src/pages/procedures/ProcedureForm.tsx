import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { proceduresService, type ProcedureInput } from '@/api/proceduresService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.coerce.number().positive('Preço deve ser positivo'),
  duration: z.coerce.number().int().positive('Duração deve ser positiva'),
});

export default function ProcedureForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ProcedureInput>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isEditing && id) {
      proceduresService.getById(id).then((res) => {
        setValue('name', res.data.name);
        setValue('price', res.data.price);
        setValue('duration', res.data.duration);
      }).catch(() => toast.error('Erro ao carregar procedimento'));
    }
  }, [id, isEditing, setValue]);

  const onSubmit = async (data: ProcedureInput) => {
    try {
      if (isEditing && id) {
        await proceduresService.update(id, data);
        toast.success('Procedimento atualizado');
      } else {
        await proceduresService.create(data);
        toast.success('Procedimento criado');
      }
      navigate('/procedures');
    } catch {
      toast.error('Erro ao salvar procedimento');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar Procedimento' : 'Novo Procedimento'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input id="price" type="number" step="0.01" {...register('price')} />
                {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="duration">Duração (minutos)</Label>
                <Input id="duration" type="number" {...register('duration')} />
                {errors.duration && <p className="text-sm text-destructive">{errors.duration.message}</p>}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Link to="/procedures">
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
