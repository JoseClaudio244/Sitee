"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"

// ===== ORDER ACTIONS =====

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from("repair_orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)

  if (error) throw new Error("Erro ao atualizar status: " + error.message)
  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${orderId}`)
  return { success: true }
}

export async function updateOrder(orderId: string, data: { status: string; final_cost: number | null; notes: string | null }) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from("repair_orders")
    .update({
      status: data.status,
      final_cost: data.final_cost,
      notes: data.notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)

  if (error) throw new Error("Erro ao atualizar ordem: " + error.message)
  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${orderId}`)
  return { success: true }
}

export async function deleteOrder(orderId: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("repair_orders").delete().eq("id", orderId)

  if (error) throw new Error("Erro ao excluir ordem: " + error.message)
  revalidatePath("/admin/orders")
  return { success: true }
}

// ===== SERVICE ACTIONS =====

export async function createService(data: { name: string; description: string | null; estimated_price: number | null }) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("services").insert([data])

  if (error) throw new Error("Erro ao criar servico: " + error.message)
  revalidatePath("/admin/services")
  return { success: true }
}

export async function updateService(serviceId: string, data: { name: string; description: string | null; estimated_price: number | null }) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("services").update(data).eq("id", serviceId)

  if (error) throw new Error("Erro ao atualizar servico: " + error.message)
  revalidatePath("/admin/services")
  return { success: true }
}

export async function deleteService(serviceId: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("services").delete().eq("id", serviceId)

  if (error) throw new Error("Erro ao excluir servico: " + error.message)
  revalidatePath("/admin/services")
  return { success: true }
}

export async function fetchServices() {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from("services").select("*").order("name")

  if (error) return []
  return data || []
}
