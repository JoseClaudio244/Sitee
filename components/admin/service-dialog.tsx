"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createService, updateService } from "@/app/admin/actions"

type Service = {
  id: string
  name: string
  description: string | null
  estimated_price: number | null
}

type ServiceDialogProps = {
  open: boolean
  onClose: (updated: boolean) => void
  service: Service | null
}

export function ServiceDialog({ open, onClose, service }: ServiceDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (service) {
      setName(service.name)
      setDescription(service.description || "")
      setPrice(service.estimated_price ? service.estimated_price.toString() : "")
    } else {
      setName("")
      setDescription("")
      setPrice("")
    }
  }, [service, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const serviceData = {
      name,
      description: description || null,
      estimated_price: price ? Number.parseFloat(price) : null,
    }

    try {
      if (service) {
        await updateService(service.id, serviceData)
      } else {
        await createService(serviceData)
      }
      onClose(true)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao salvar servico")
    }

    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{service ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
            <DialogDescription>
              {service ? "Atualize as informações do serviço" : "Adicione um novo serviço ao catálogo"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Serviço *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Troca de Tela"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o serviço..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Preço Estimado (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onClose(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : service ? "Atualizar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
