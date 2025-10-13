import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { OrderDetails } from "@/components/admin/order-details"

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "new") {
    redirect("/admin/orders/new")
  }

  const supabase = await createClient()

  const { data: order } = await supabase
    .from("repair_orders")
    .select("*, customers(name, phone, email)")
    .eq("id", id)
    .single()

  if (!order) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Detalhes da Ordem</h1>
        <p className="text-muted-foreground">Visualize e edite informações da ordem de serviço</p>
      </div>

      <OrderDetails order={order} />
    </div>
  )
}
