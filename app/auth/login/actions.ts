"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginWithPassword(formData: FormData) {
  const password = formData.get("password") as string

  if (!password) {
    return { error: "Digite a senha" }
  }

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return { error: "Senha do admin não configurada no servidor" }
  }

  if (password !== adminPassword) {
    return { error: "Senha incorreta" }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  })

  redirect("/admin")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/auth/login")
}
