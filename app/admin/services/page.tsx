import { createClient } from "@/lib/supabase/server"
import { ServicesManager } from "@/components/admin/services-manager"

export default async function ServicesPage() {
  const supabase = await createClient()

  const { data: services } = await supabase.from("services").select("*").order("name")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Catálogo de Serviços</h1>
        <p className="text-muted-foreground">Gerencie os serviços oferecidos pela assistência técnica</p>
      </div>

      <ServicesManager initialServices={services || []} />
    </div>
  )
}
