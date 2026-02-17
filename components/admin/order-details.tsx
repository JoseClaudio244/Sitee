"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateOrder, updateOrderStatus, deleteOrder } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Printer, Clock, Wrench, CheckCircle2, Package, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type OrderDetailsProps = {
  order: {
    id: string
    device_type: string
    device_brand: string
    device_model: string | null
    problem_description: string
    status: string
    estimated_cost: number | null
    final_cost: number | null
    notes: string | null
    created_at: string
    customers: { name: string; phone: string; email: string | null } | null
  }
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(order.status)
  const [finalCost, setFinalCost] = useState(order.final_cost?.toString() || "")
  const [notes, setNotes] = useState(order.notes || "")

  const handlePrint = () => {
    window.print()
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteOrder(order.id)
      router.push("/admin/orders")
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao excluir ordem")
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      await updateOrder(order.id, {
        status,
        final_cost: finalCost ? Number.parseFloat(finalCost) : null,
        notes: notes || null,
      })
      router.refresh()
      alert("Ordem atualizada com sucesso!")
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar ordem")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickStatusChange = async (newStatus: string) => {
    setIsLoading(true)
    setStatus(newStatus)
    try {
      await updateOrderStatus(order.id, newStatus)
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar status")
      setStatus(order.status)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir esta ordem de serviço? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="hidden print:block text-center mb-8">
        <h1 className="text-2xl font-bold">InfoCell - Assistência Técnica</h1>
        <p className="text-sm text-muted-foreground">Ordem de Serviço #{order.id.slice(0, 8)}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Label className="text-muted-foreground">Nome</Label>
              <p className="font-medium">{order.customers?.name || "N/A"}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Telefone</Label>
              <p className="font-medium">{order.customers?.phone || "N/A"}</p>
            </div>
            {order.customers?.email && (
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{order.customers.email}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Dispositivo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Label className="text-muted-foreground">Tipo</Label>
              <p className="font-medium capitalize">{order.device_type}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Marca</Label>
              <p className="font-medium">{order.device_brand}</p>
            </div>
            {order.device_model && (
              <div>
                <Label className="text-muted-foreground">Modelo</Label>
                <p className="font-medium">{order.device_model}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problema Relatado</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{order.problem_description}</p>
        </CardContent>
      </Card>

      <Card className="print:hidden">
        <CardHeader>
          <CardTitle>Gerenciar Ordem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Ações Rápidas</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant={status === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickStatusChange("pending")}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Pendente
              </Button>
              <Button
                variant={status === "in_progress" ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickStatusChange("in_progress")}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Wrench className="h-4 w-4" />
                Em Andamento
              </Button>
              <Button
                variant={status === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickStatusChange("completed")}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Concluída
              </Button>
              <Button
                variant={status === "delivered" ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickStatusChange("delivered")}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Package className="h-4 w-4" />
                Entregue
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status Detalhado</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluída</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="cancelled">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Valor Estimado</Label>
              <Input
                id="estimatedCost"
                type="number"
                step="0.01"
                value={order.estimated_cost || ""}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalCost">Valor Final</Label>
              <Input
                id="finalCost"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={finalCost}
                onChange={(e) => setFinalCost(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre o reparo..."
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button onClick={handleUpdate} disabled={isLoading} className="bg-[#00a8ff] hover:bg-[#0088cc]">
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </CardContent>
      </Card>

      <Card className="hidden print:block">
        <CardHeader>
          <CardTitle>Informações do Serviço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <Label className="text-muted-foreground">Status</Label>
            <p className="font-medium capitalize">
              {status === "pending"
                ? "Pendente"
                : status === "in_progress"
                  ? "Em Andamento"
                  : status === "completed"
                    ? "Concluída"
                    : status === "delivered"
                      ? "Entregue"
                      : "Cancelada"}
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">Valor Estimado</Label>
            <p className="font-medium">R$ {order.estimated_cost?.toFixed(2) || "0.00"}</p>
          </div>
          {finalCost && (
            <div>
              <Label className="text-muted-foreground">Valor Final</Label>
              <p className="font-medium">R$ {Number.parseFloat(finalCost).toFixed(2)}</p>
            </div>
          )}
          {notes && (
            <div>
              <Label className="text-muted-foreground">Observações</Label>
              <p className="font-medium">{notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <Label className="text-muted-foreground">Data de Criação</Label>
            <p className="font-medium">{new Date(order.created_at).toLocaleString("pt-BR")}</p>
          </div>
          <div className="print:hidden">
            <Label className="text-muted-foreground">ID da Ordem</Label>
            <p className="font-mono text-sm">{order.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
