import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { OrdersTable } from "@/components/admin/orders-table"

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from("repair_orders")
    .select("*, customers(name, phone)")
    .order("created_at", { ascending: false })

  console.log("[v0] Orders loaded:", orders?.length || 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ordens de Serviço</h1>
          <p className="text-muted-foreground">Gerencie todas as ordens de reparo</p>
        </div>
        <Link href="/admin/orders/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-[#00a8ff] hover:bg-[#0088cc] text-white font-semibold shadow-lg hover:shadow-xl transition-all">
            <Plus className="h-5 w-5 mr-2" />
            Nova Ordem de Serviço
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Ordens</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders || []} />
        </CardContent>
      </Card>

      <Link href="/admin/orders/new" className="fixed bottom-6 right-6 sm:hidden z-50">
        <Button size="lg" className="h-14 w-14 rounded-full bg-[#00a8ff] hover:bg-[#0088cc] shadow-2xl">
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}
