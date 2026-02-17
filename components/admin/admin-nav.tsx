"use client"

import { Button } from "@/components/ui/button"
import { Home, ClipboardList, Users, Wrench, DollarSign, LogOut } from "lucide-react"
import { logout } from "@/app/auth/login/actions"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/orders", label: "Ordens", icon: ClipboardList },
    { href: "/admin/customers", label: "Clientes", icon: Users },
    { href: "/admin/services", label: "Servicos", icon: Wrench },
    { href: "/admin/reports", label: "Relatorios", icon: DollarSign },
  ]

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <Image src="/images/infocell-logo.png" alt="InfoCell" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-bold">
                <span className="text-[#00a8ff]">INFO</span>
                <span className="text-[#00ff00]">CELL</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
          <form action={logout}>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </form>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button variant={isActive ? "secondary" : "ghost"} size="sm" className="whitespace-nowrap">
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
