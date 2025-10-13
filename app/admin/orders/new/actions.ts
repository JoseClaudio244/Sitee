"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function getServices() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("services").select("*").order("name")

  if (error) {
    console.error("[v0] Error loading services:", error)
    return []
  }

  return data || []
}

export async function createOrder(formData: FormData) {
  const supabase = await createClient()

  try {
    // Extract form data
    const customerName = formData.get("customerName") as string
    const customerPhone = formData.get("customerPhone") as string
    const customerEmail = formData.get("customerEmail") as string
    const deviceType = formData.get("deviceType") as string
    const deviceBrand = formData.get("deviceBrand") as string
    const deviceModel = formData.get("deviceModel") as string
    const problemDescription = formData.get("problemDescription") as string
    const estimatedCost = formData.get("estimatedCost") as string

    console.log("[v0] Creating order with data:", {
      customerName,
      customerPhone,
      deviceType,
      deviceBrand,
    })

    // Check for existing customer
    let customerId: string

    const { data: existingCustomer, error: customerSearchError } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", customerPhone)
      .maybeSingle()

    if (customerSearchError) {
      console.error("[v0] Error searching for customer:", customerSearchError)
      throw new Error("Erro ao buscar cliente: " + customerSearchError.message)
    }

    if (existingCustomer) {
      console.log("[v0] Found existing customer:", existingCustomer.id)
      customerId = existingCustomer.id
    } else {
      console.log("[v0] Creating new customer...")
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
        console.error("[v0] Error creating customer:", customerError)
        throw new Error("Erro ao criar cliente: " + customerError.message)
      }

      console.log("[v0] Customer created:", newCustomer.id)
      customerId = newCustomer.id
    }

    // Create repair order
    const finalCost = estimatedCost ? Number.parseFloat(estimatedCost) : null

    const { error: orderError } = await supabase.from("repair_orders").insert({
      customer_id: customerId,
      device_type: deviceType,
      device_brand: deviceBrand,
      device_model: deviceModel || null,
      problem_description: problemDescription,
      estimated_cost: finalCost,
      status: "pending",
    })

    if (orderError) {
      console.error("[v0] Error creating order:", orderError)
      throw new Error("Erro ao criar ordem: " + orderError.message)
    }

    console.log("[v0] Order created successfully!")

    revalidatePath("/admin/orders")
  } catch (error) {
    console.error("[v0] Error in createOrder:", error)
    throw error
  }

  redirect("/admin/orders")
}
