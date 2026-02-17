"use server"

import { createAdminClient } from "@/lib/supabase/admin"

export async function trackOrderByPhone(phone: string) {
  console.log("[v0] Tracking order for phone:", phone)

  try {
    const supabase = createAdminClient()

    // First, find the customer by phone
    const { data: customers, error: customerError } = await supabase
      .from("customers")
      .select("id, name")
      .eq("phone", phone)
      .limit(1)

    if (customerError) {
      console.log("[v0] Customer lookup error:", customerError)
      throw customerError
    }

    if (!customers || customers.length === 0) {
      console.log("[v0] No customer found for phone:", phone)
      return { success: false, message: "Nenhum cliente encontrado com este telefone." }
    }

    const customer = customers[0]
    console.log("[v0] Found customer:", customer.id)

    // Get all orders for this customer
    const { data: orders, error: ordersError } = await supabase
      .from("repair_orders")
      .select("*")
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false })

    if (ordersError) {
      console.log("[v0] Orders lookup error:", ordersError)
      throw ordersError
    }

    console.log("[v0] Found orders:", orders?.length || 0)

    return {
      success: true,
      customerName: customer.name,
      orders: orders || [],
    }
  } catch (error) {
    console.error("[v0] Track order error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao buscar ordens",
    }
  }
}
