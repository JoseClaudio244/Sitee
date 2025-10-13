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
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

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

    console.log("[v0] Submitting service:", { name, description, price })

    const supabase = createClient()
    const serviceData = {
      name,
      description: description || null,
      estimated_price: price ? Number.parseFloat(price) : null,
    }

    let error

    if (service) {
      // Update existing service
      console.log("[v0] Updating service:", service.id)
      const result = await supabase.from("services").update(serviceData).eq("id", service.id)
      error = result.error
    } else {
      // Create new service
      console.log("[v0] Creating new service")
      const result = await supabase.from("services").insert([serviceData])
      error = result.error
    }

    if (error) {
      console.error("[v0] Error saving service:", error)
      alert("Erro ao salvar serviço: " + error.message)
    } else {
      console.log("[v0] Service saved successfully")
      onClose(true)
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
