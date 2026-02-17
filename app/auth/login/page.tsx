"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { loginWithPassword } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full bg-[#00a8ff] hover:bg-[#0088cc]" disabled={pending}>
      {pending ? (
        <>
          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Verificando...
        </>
      ) : (
        <>
          <Lock className="h-4 w-4 mr-2" />
          Entrar
        </>
      )}
    </Button>
  )
}

export default function LoginPage() {
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError("")
    const result = await loginWithPassword(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-[#00a8ff]/10 via-background to-[#00ff00]/10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/images/infocell-logo.png" alt="InfoCell" width={50} height={50} className="rounded-lg" />
            <h1 className="text-3xl font-bold">
              <span className="text-[#00a8ff]">INFO</span>
              <span className="text-[#00ff00]">CELL</span>
            </h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Area do Tecnico</CardTitle>
              <CardDescription>Digite a senha para acessar o painel</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Digite a senha de acesso"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
