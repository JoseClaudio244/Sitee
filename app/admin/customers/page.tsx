import { createAdminClient } from "@/lib/supabase/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomersTable } from "@/components/admin/customers-table"

export default async function CustomersPage() {
  const supabase = createAdminClient()

  const { data: customers } = await supabase.from("customers").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clientes</h1>
        <p className="text-muted-foreground">Lista de todos os clientes cadastrados</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Clientes ({customers?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomersTable customers={customers || []} />
        </CardContent>
      </Card>
    </div>
  )
}
