import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { proceduresService } from '@/api/proceduresService';
import type { Procedure } from '@/types';
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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function ProcedureList() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    proceduresService.getAll()
      .then((res) => setProcedures(res.data))
      .catch(() => toast.error('Erro ao carregar procedimentos'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await proceduresService.delete(id);
      setProcedures((prev) => prev.filter((p) => p.id !== id));
      toast.success('Procedimento excluído');
    } catch {
      toast.error('Erro ao excluir procedimento');
    }
  };

  const filtered = procedures.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar procedimento..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Link to="/procedures/new">
          <Button><Plus className="mr-2 h-4 w-4" />Novo Procedimento</Button>
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-background shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Duração (min)</TableHead>
              <TableHead className="w-24"><span className="sr-only">Ações</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Carregando...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Nenhum procedimento encontrado</TableCell></TableRow>
            ) : (
              filtered.map((proc) => (
                <TableRow key={proc.id}>
                  <TableCell className="font-medium">{proc.name}</TableCell>
                  <TableCell className="text-muted-foreground">{formatCurrency(proc.price)}</TableCell>
                  <TableCell className="text-muted-foreground">{proc.duration} min</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/procedures/edit/${proc.id}`}>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir procedimento?</AlertDialogTitle>
                            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(proc.id)}>Excluir</AlertDialogAction>
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
