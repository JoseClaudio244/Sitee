"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createOrder } from "@/app/admin/orders/new/actions"
import { Save, ArrowLeft, Smartphone, User, Wrench } from "lucide-react"

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
  const [selectedService, setSelectedService] = useState("")
  const [estimatedCost, setEstimatedCost] = useState("")

  function handleServiceSelect(serviceId: string) {
    setSelectedService(serviceId)
    if (serviceId !== "custom") {
      const service = services.find((s) => s.id === serviceId)
      if (service) {
        setEstimatedCost(String(service.estimated_price))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("estimatedCost", estimatedCost)
      await createOrder(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar ordem")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* DADOS DO CLIENTE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#00a8ff]">
          <User className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Dados do Cliente</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="customerName">Nome *</Label>
            <Input id="customerName" name="customerName" required placeholder="Nome completo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerPhone">Telefone / WhatsApp *</Label>
            <Input id="customerPhone" name="customerPhone" required placeholder="(82) 99999-9999" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email (opcional)</Label>
          <Input id="customerEmail" name="customerEmail" type="email" placeholder="email@exemplo.com" />
        </div>
      </div>

      {/* DADOS DO DISPOSITIVO */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#00a8ff]">
          <Smartphone className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Dados do Dispositivo</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="deviceType">Tipo *</Label>
            <Select name="deviceType" defaultValue="smartphone" required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smartphone">Smartphone</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="notebook">Notebook</SelectItem>
                <SelectItem value="smartwatch">Smartwatch</SelectItem>
                <SelectItem value="fone_bluetooth">Fone Bluetooth</SelectItem>
                <SelectItem value="caixa_som">Caixa de Som</SelectItem>
                <SelectItem value="console">Console de Jogos</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deviceBrand">Marca *</Label>
            <Select name="deviceBrand" required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Samsung">Samsung</SelectItem>
                <SelectItem value="Motorola">Motorola</SelectItem>
                <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                <SelectItem value="LG">LG</SelectItem>
                <SelectItem value="Huawei">Huawei</SelectItem>
                <SelectItem value="Asus">Asus</SelectItem>
                <SelectItem value="Nokia">Nokia</SelectItem>
                <SelectItem value="Realme">Realme</SelectItem>
                <SelectItem value="POCO">POCO</SelectItem>
                <SelectItem value="OnePlus">OnePlus</SelectItem>
                <SelectItem value="Sony">Sony</SelectItem>
                <SelectItem value="Lenovo">Lenovo</SelectItem>
                <SelectItem value="Outra">Outra</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="deviceModel">Modelo</Label>
            <Input id="deviceModel" name="deviceModel" placeholder="Ex: iPhone 14, Galaxy S23" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deviceColor">Cor do Aparelho</Label>
            <Input id="deviceColor" name="deviceColor" placeholder="Ex: Preto, Branco, Azul" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="deviceImei">IMEI (opcional)</Label>
            <Input id="deviceImei" name="deviceImei" placeholder="Numero IMEI do aparelho" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="devicePassword">Senha do Aparelho (opcional)</Label>
            <Input id="devicePassword" name="devicePassword" placeholder="Senha/PIN/Padrao" />
          </div>
        </div>
      </div>

      {/* DETALHES DO SERVICO */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#00a8ff]">
          <Wrench className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Detalhes do Servico</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="problemDescription">Defeito / Problema Relatado *</Label>
          <Textarea
            id="problemDescription"
            name="problemDescription"
            required
            placeholder="Descreva o defeito relatado pelo cliente. Ex: Tela quebrada, nao carrega, nao liga..."
            rows={4}
          />
        </div>

        {services.length > 0 && (
          <div className="space-y-2">
            <Label>Servico a Realizar</Label>
            <Select value={selectedService} onValueChange={handleServiceSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um servico do catalogo" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - R$ {Number(service.estimated_price).toFixed(2)}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Valor personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="estimatedCost">Valor do Servico (R$)</Label>
          <Input
            id="estimatedCost"
            name="estimatedCost"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Selecione um servico acima para preencher o valor automaticamente ou digite manualmente.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessories">Acessorios Deixados</Label>
          <Input
            id="accessories"
            name="accessories"
            placeholder="Ex: Carregador, capa, pelicula, fone..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Observacoes</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Observacoes adicionais do tecnico..."
            rows={3}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="bg-[#00a8ff] hover:bg-[#0088cc]">
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              Criando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Criar Ordem de Servico
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </form>
  )
}
