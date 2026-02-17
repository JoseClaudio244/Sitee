import { NewOrderForm } from "@/components/admin/new-order-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createAdminClient } from "@/lib/supabase/admin"

export default async function NewOrderPage() {
  let services: { id: string; name: string; description: string | null; estimated_price: number }[] = []

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("services").select("*").order("name")
    if (!error && data) {
      services = data
    }
    console.log("[v0] Services loaded:", services.length, "Error:", error?.message)
  } catch (err) {
    console.error("[v0] Failed to load services:", err)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Nova Ordem de Serviço</h1>
        <p className="text-muted-foreground">Cadastre uma nova ordem de reparo</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Ordem</CardTitle>
        </CardHeader>
        <CardContent>
          <NewOrderForm services={services} />
        </CardContent>
      </Card>
    </div>
  )
}
