import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { appointmentsService, type AppointmentInput } from '@/api/appointmentsService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const schema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  procedureId: z.string().min(1, 'Procedimento é obrigatório'),
  employeeId: z.string().min(1, 'Funcionário é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
});

export default function AppointmentForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<AppointmentInput>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isEditing && id) {
      appointmentsService.getById(id).then((res) => {
        setValue('clientId', res.data.clientId);
        setValue('procedureId', res.data.procedureId);
        setValue('employeeId', res.data.employeeId);
        setValue('date', res.data.date);
      }).catch(() => toast.error('Erro ao carregar agendamento'));
    }
  }, [id, isEditing, setValue]);

  const onSubmit = async (data: AppointmentInput) => {
    try {
      if (isEditing && id) {
        await appointmentsService.update(id, data);
        toast.success('Agendamento atualizado');
      } else {
        await appointmentsService.create(data);
        toast.success('Agendamento criado');
      }
      navigate('/appointments');
    } catch {
      toast.error('Erro ao salvar agendamento');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar Agendamento' : 'Novo Agendamento'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="clientId">ID do Cliente</Label>
              <Input id="clientId" {...register('clientId')} placeholder="ID do cliente" />
              {errors.clientId && <p className="text-sm text-destructive">{errors.clientId.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="procedureId">ID do Procedimento</Label>
              <Input id="procedureId" {...register('procedureId')} placeholder="ID do procedimento" />
              {errors.procedureId && <p className="text-sm text-destructive">{errors.procedureId.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="employeeId">ID do Funcionário</Label>
              <Input id="employeeId" {...register('employeeId')} placeholder="ID do funcionário" />
              {errors.employeeId && <p className="text-sm text-destructive">{errors.employeeId.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date">Data e Hora</Label>
              <Input id="date" type="datetime-local" {...register('date')} />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Link to="/appointments">
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
