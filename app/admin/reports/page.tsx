import { createAdminClient } from "@/lib/supabase/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Calendar, CheckCircle } from "lucide-react"

export default async function ReportsPage() {
  const supabase = createAdminClient()

  // Buscar ordens concluídas com valores
  const { data: completedOrders } = await supabase
    .from("repair_orders")
    .select("final_cost, estimated_cost, created_at")
    .in("status", ["completed", "delivered"])

  // Calcular receita total
  const totalRevenue =
    completedOrders?.reduce((sum, order) => {
      return sum + (order.final_cost || order.estimated_cost || 0)
    }, 0) || 0

  // Calcular receita do mês atual
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlyRevenue =
    completedOrders?.reduce((sum, order) => {
      const orderDate = new Date(order.created_at)
      if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
        return sum + (order.final_cost || order.estimated_cost || 0)
      }
      return sum
    }, 0) || 0

  // Ticket médio
  const averageTicket = completedOrders && completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0

  // Ordens concluídas
  const completedCount = completedOrders?.length || 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Relatórios Financeiros</h1>
        <p className="text-muted-foreground">Acompanhe o desempenho financeiro da assistência técnica</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">De todas as ordens concluídas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ {monthlyRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">R$ {averageTicket.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Valor médio por ordem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordens Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Total de serviços finalizados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ordens Concluídas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {completedOrders && completedOrders.length > 0 ? (
            <div className="space-y-4">
              {completedOrders.slice(0, 10).map((order, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      R$ {(order.final_cost || order.estimated_cost || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Nenhuma ordem concluída ainda</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
