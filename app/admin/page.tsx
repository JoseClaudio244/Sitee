import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Users, CheckCircle, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Buscar estatísticas
  const { count: totalOrders } = await supabase.from("repair_orders").select("*", { count: "exact", head: true })

  const { count: pendingOrders } = await supabase
    .from("repair_orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: inProgressOrders } = await supabase
    .from("repair_orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_progress")

  const { count: completedOrders } = await supabase
    .from("repair_orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed")

  const { count: totalCustomers } = await supabase.from("customers").select("*", { count: "exact", head: true })

  const { data: completedOrdersData } = await supabase
    .from("repair_orders")
    .select("final_cost, estimated_cost")
    .in("status", ["completed", "delivered"])

  const totalRevenue =
    completedOrdersData?.reduce((sum, order) => {
      return sum + (order.final_cost || order.estimated_cost || 0)
    }, 0) || 0

  // Buscar ordens recentes
  const { data: recentOrders } = await supabase
    .from("repair_orders")
    .select("*, customers(name)")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da assistência técnica</p>
        </div>
        <Link href="/admin/reports">
          <Button variant="outline" className="gap-2 bg-transparent">
            <DollarSign className="h-4 w-4" />
            Ver Relatórios Completos
          </Button>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ordens</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressOrders || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground mt-2">De ordens concluídas e entregues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCustomers || 0}</div>
            <p className="text-sm text-muted-foreground mt-2">Clientes cadastrados no sistema</p>
          </CardContent>
        </Card>
      </div>

      {/* Ordens Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Ordens Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders && recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{order.customers?.name || "Cliente não informado"}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.device_brand} {order.device_model} - {order.problem_description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status === "pending"
                        ? "Pendente"
                        : order.status === "in_progress"
                          ? "Em Andamento"
                          : order.status === "completed"
                            ? "Concluída"
                            : order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Nenhuma ordem de serviço cadastrada ainda</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
