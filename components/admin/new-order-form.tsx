"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createOrder } from "@/app/admin/orders/new/actions"

interface Service {
  id: string
  name: string
  description: string | null
  estimated_price: number
}

interface NewOrderFormProps {
  services: Service[]
}

export function NewOrderForm({ services }: NewOrderFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      await createOrder(formData)
    } catch (err) {
      console.error("[v0] Error submitting form:", err)
      setError(err instanceof Error ? err.message : "Erro ao criar ordem")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Dados do Cliente</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="customerName">Nome do Cliente *</Label>
            <Input id="customerName" name="customerName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerPhone">Telefone *</Label>
            <Input id="customerPhone" name="customerPhone" required placeholder="(82) 99999-9999" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email (opcional)</Label>
          <Input id="customerEmail" name="customerEmail" type="email" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Dados do Dispositivo</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="deviceType">Tipo de Dispositivo *</Label>
            <Select name="deviceType" defaultValue="smartphone" required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smartphone">Smartphone</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="notebook">Notebook</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deviceBrand">Marca *</Label>
            <Input id="deviceBrand" name="deviceBrand" required placeholder="Apple, Samsung, etc." />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="deviceModel">Modelo</Label>
          <Input id="deviceModel" name="deviceModel" placeholder="iPhone 13, Galaxy S21, etc." />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Detalhes do Serviço</h3>
        <div className="space-y-2">
          <Label htmlFor="problemDescription">Descrição do Problema *</Label>
          <Textarea
            id="problemDescription"
            name="problemDescription"
            required
            placeholder="Descreva o problema relatado pelo cliente..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedCost">Valor Estimado (R$)</Label>
          <Input id="estimatedCost" name="estimatedCost" type="number" step="0.01" placeholder="0.00" />
          {services.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Serviços disponíveis: {services.map((s) => `${s.name} (R$ ${s.estimated_price})`).join(", ")}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="bg-[#00a8ff] hover:bg-[#0088cc]">
          {isLoading ? "Criando..." : "Criar Ordem"}
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
