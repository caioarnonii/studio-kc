import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { appointmentsService } from '@/api/appointmentsService';
import type { Appointment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentsService.getAll()
      .then((res) => setAppointments(res.data))
      .catch(() => toast.error('Erro ao carregar agendamentos'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await appointmentsService.delete(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      toast.success('Agendamento excluído');
    } catch {
      toast.error('Erro ao excluir agendamento');
    }
  };

  const filtered = appointments.filter((a) =>
    (a.client?.name || a.clientId).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar agendamento..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Link to="/appointments/new">
          <Button><Plus className="mr-2 h-4 w-4" />Novo Agendamento</Button>
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-background shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Procedimento</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-24"><span className="sr-only">Ações</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Carregando...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Nenhum agendamento encontrado</TableCell></TableRow>
            ) : (
              filtered.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell className="font-medium">{appt.client?.name || appt.clientId}</TableCell>
                  <TableCell className="text-muted-foreground">{appt.procedure?.name || appt.procedureId}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {appt.date ? format(new Date(appt.date), 'dd/MM/yyyy HH:mm') : '—'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/appointments/edit/${appt.id}`}>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir agendamento?</AlertDialogTitle>
                            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(appt.id)}>Excluir</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
