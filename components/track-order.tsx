"use client"

import type React from "react"

import { useState } from "react"
import { trackOrderByPhone } from "@/app/track/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Wrench, CheckCircle2, Package, XCircle } from "lucide-react"

type Order = {
  id: string
  device_type: string
  device_brand: string
  device_model: string | null
  problem_description: string
  status: string
  estimated_cost: number | null
  final_cost: number | null
  created_at: string
  updated_at: string
}

export function TrackOrder() {
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    customerName?: string
    orders?: Order[]
    message?: string
  } | null>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    const cleanPhone = phone.replace(/\D/g, "")
    const response = await trackOrderByPhone(cleanPhone)
    setResult(response)
    setIsLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in_progress":
        return <Wrench className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "delivered":
        return <Package className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "in_progress":
        return "Em Andamento"
      case "completed":
        return "Concluída"
      case "delivered":
        return "Entregue"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "in_progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "delivered":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rastrear Ordem de Serviço</CardTitle>
          <CardDescription>Digite seu número de telefone para verificar o status do seu reparo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(82) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-[#00a8ff] hover:bg-[#0088cc]">
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? "Buscando..." : "Buscar Ordens"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && !result.success && (
        <Card className="border-yellow-500/50">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">{result.message}</p>
          </CardContent>
        </Card>
      )}

      {result && result.success && result.orders && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Olá, {result.customerName}!</h3>
            <p className="text-muted-foreground">
              {result.orders.length === 0
                ? "Você não tem ordens de serviço no momento."
                : `Encontramos ${result.orders.length} ordem(ns) de serviço.`}
            </p>
          </div>

          {result.orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {order.device_brand} {order.device_model || order.device_type}
                    </CardTitle>
                    <CardDescription className="mt-1">{order.problem_description}</CardDescription>
                  </div>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Data de Criação</Label>
                    <p className="font-medium">{new Date(order.created_at).toLocaleDateString("pt-BR")}</p>
                  </div>
                  {order.estimated_cost && (
                    <div>
                      <Label className="text-muted-foreground">Valor Estimado</Label>
                      <p className="font-medium">R$ {order.estimated_cost.toFixed(2)}</p>
                    </div>
                  )}
                  {order.final_cost && (
                    <div>
                      <Label className="text-muted-foreground">Valor Final</Label>
                      <p className="font-medium">R$ {order.final_cost.toFixed(2)}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-muted-foreground">Última Atualização</Label>
                    <p className="font-medium">{new Date(order.updated_at).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
