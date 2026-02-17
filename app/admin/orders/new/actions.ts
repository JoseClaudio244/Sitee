"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/admin"

export async function createOrder(formData: FormData) {
  const supabase = createAdminClient()

  const customerName = formData.get("customerName") as string
  const customerPhone = formData.get("customerPhone") as string
  const customerEmail = formData.get("customerEmail") as string
  const deviceType = formData.get("deviceType") as string
  const deviceBrand = formData.get("deviceBrand") as string
  const deviceModel = formData.get("deviceModel") as string
  const deviceColor = formData.get("deviceColor") as string
  const deviceImei = formData.get("deviceImei") as string
  const devicePassword = formData.get("devicePassword") as string
  const problemDescription = formData.get("problemDescription") as string
  const estimatedCost = formData.get("estimatedCost") as string
  const accessories = formData.get("accessories") as string
  const notes = formData.get("notes") as string

  // Check for existing customer or create new
  let customerId: string

  const { data: existingCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", customerPhone)
    .maybeSingle()

  if (existingCustomer) {
    customerId = existingCustomer.id
    // Update customer name/email if provided
    await supabase
      .from("customers")
      .update({ name: customerName, email: customerEmail || null })
      .eq("id", customerId)
  } else {
    const { data: newCustomer, error: customerError } = await supabase
      .from("customers")
      .insert({
        name: customerName,
        phone: customerPhone,
        email: customerEmail || null,
      })
      .select("id")
      .single()

    if (customerError) {
      throw new Error("Erro ao criar cliente: " + customerError.message)
    }
    customerId = newCustomer.id
  }

  // Create repair order
  const finalCost = estimatedCost ? Number.parseFloat(estimatedCost) : null

  const problemFull = [
    problemDescription,
    deviceColor ? `Cor: ${deviceColor}` : "",
    deviceImei ? `IMEI: ${deviceImei}` : "",
    devicePassword ? `Senha: ${devicePassword}` : "",
    accessories ? `Acessorios: ${accessories}` : "",
  ]
    .filter(Boolean)
    .join("\n")

  const { error: orderError } = await supabase.from("repair_orders").insert({
    customer_id: customerId,
    device_type: deviceType,
    device_brand: deviceBrand,
    device_model: deviceModel || null,
    problem_description: problemFull,
    estimated_cost: finalCost,
    notes: notes || null,
    status: "pending",
  })

  if (orderError) {
    throw new Error("Erro ao criar ordem: " + orderError.message)
  }

  revalidatePath("/admin/orders")
  redirect("/admin/orders")
}
