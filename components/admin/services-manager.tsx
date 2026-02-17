"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { ServiceDialog } from "./service-dialog"
import { deleteService, fetchServices } from "@/app/admin/actions"

type Service = {
  id: string
  name: string
  description: string | null
  estimated_price: number | null
  created_at: string
}

export function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const refetchServices = async () => {
    const data = await fetchServices()
    setServices(data)
  }

  const handleAddService = () => {
    setEditingService(null)
    setDialogOpen(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setDialogOpen(true)
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este servico?")) return
    setIsDeleting(id)
    try {
      await deleteService(id)
      setServices(services.filter((s) => s.id !== id))
    } catch {
      alert("Erro ao excluir servico")
    }
    setIsDeleting(null)
  }

  const handleDialogClose = async (updated: boolean) => {
    setDialogOpen(false)
    setEditingService(null)
    if (updated) {
      await refetchServices()
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Todos os Serviços</CardTitle>
          <Button onClick={handleAddService} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Novo Serviço
          </Button>
        </CardHeader>
        <CardContent>
          {services.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Preço Estimado</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell className="max-w-md truncate">{service.description || "-"}</TableCell>
                      <TableCell className="text-right">
                        {service.estimated_price ? `R$ ${service.estimated_price.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditService(service)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                            disabled={isDeleting === service.id}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Nenhum serviço cadastrado ainda</p>
              <Button onClick={handleAddService}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Serviço
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ServiceDialog open={dialogOpen} onClose={handleDialogClose} service={editingService} />
    </>
  )
}
