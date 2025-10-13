import { NewOrderForm } from "@/components/admin/new-order-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getServices } from "./actions"

export default async function NewOrderPage() {
  const services = await getServices()

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
