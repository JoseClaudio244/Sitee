import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Instagram, Clock, Smartphone, Wrench, Shield, Zap, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/infocell-logo.png" alt="InfoCell Logo" width={50} height={50} className="rounded-lg" />
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-[#00a8ff]">INFO</span>
                <span className="text-[#00ff00]">CELL</span>
              </h1>
              <p className="text-xs text-muted-foreground">Assistência Técnica Especializada</p>
            </div>
          </div>
          <Link href="/auth/login">
            <Button variant="outline" size="sm">
              Área do Técnico
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#00a8ff]/10 via-background to-[#00ff00]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Seu Celular Quebrou?
              <br />
              <span className="text-[#00ff00]">A Solução Tá na InfoCell</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Especialistas em reparos de smartphones e tablets. Atendimento rápido, qualidade garantida e preços
              justos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5582991190301" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button size="lg" className="bg-[#00ff00] hover:bg-[#00dd00] text-black font-semibold">
                  <Phone className="mr-2 h-5 w-5" />
                  WhatsApp: (82) 99119-0301
                </Button>
              </a>
              <a
                href="https://instagram.com/info_cell082"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="lg" variant="outline">
                  <Instagram className="mr-2 h-5 w-5" />
                  @info_cell082
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Order Tracking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-[#00a8ff]/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-[#00a8ff]/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-[#00a8ff]" />
                </div>
                <CardTitle className="text-2xl">Rastreie Seu Reparo</CardTitle>
                <CardDescription>
                  Acompanhe o status do seu dispositivo em tempo real usando seu número de telefone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/track">
                  <Button size="lg" className="w-full bg-[#00a8ff] hover:bg-[#0088cc]">
                    <Search className="mr-2 h-5 w-5" />
                    Rastrear Minha Ordem
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-[#00a8ff] mb-2" />
                <CardTitle>Reparo Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Maioria dos reparos concluídos no mesmo dia</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-[#00a8ff] mb-2" />
                <CardTitle>Garantia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Todos os serviços com garantia de qualidade</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Wrench className="h-10 w-10 text-[#00a8ff] mb-2" />
                <CardTitle>Técnicos Especializados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Profissionais certificados e experientes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Smartphone className="h-10 w-10 text-[#00a8ff] mb-2" />
                <CardTitle>Todas as Marcas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Apple, Samsung, Motorola, Xiaomi e mais</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-muted-foreground text-lg">Soluções completas para seu dispositivo</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Troca de Tela</CardTitle>
                <CardDescription>A partir de R$ 250,00</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Substituição completa da tela do seu dispositivo com peças de qualidade
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Troca de Bateria</CardTitle>
                <CardDescription>A partir de R$ 150,00</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Bateria original ou compatível de alta qualidade</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Reparo de Placa</CardTitle>
                <CardDescription>A partir de R$ 300,00</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Diagnóstico e reparo de problemas na placa-mãe</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conector de Carga</CardTitle>
                <CardDescription>A partir de R$ 100,00</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Substituição do conector de carga com garantia</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Limpeza Interna</CardTitle>
                <CardDescription>A partir de R$ 80,00</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Limpeza completa dos componentes internos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Atualização de Software</CardTitle>
                <CardDescription>A partir de R$ 60,00</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Atualização e otimização do sistema operacional</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-muted-foreground text-lg">Estamos prontos para atender você</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Phone className="h-8 w-8 text-[#00a8ff] mb-2" />
                  <CardTitle>WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold mb-2">(82) 99119-0301</p>
                  <a href="https://wa.me/5582991190301" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#00ff00] hover:bg-[#00dd00] text-black">Enviar Mensagem</Button>
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Instagram className="h-8 w-8 text-[#00a8ff] mb-2" />
                  <CardTitle>Instagram</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold mb-2">@info_cell082</p>
                  <a href="https://instagram.com/info_cell082" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-transparent" variant="outline">
                      Seguir no Instagram
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <Clock className="h-8 w-8 text-[#00a8ff] mb-2" />
                <CardTitle>Horário de Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium">Segunda a Sexta:</span>
                    <span>08:00 - 18:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Sábado:</span>
                    <span>08:00 - 13:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Domingo:</span>
                    <span className="text-muted-foreground">Fechado</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/images/infocell-logo.png" alt="InfoCell" width={40} height={40} className="rounded-lg" />
            <p className="text-xl font-bold">
              <span className="text-[#00a8ff]">INFO</span>
              <span className="text-[#00ff00]">CELL</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 InfoCell - Assistência Técnica Especializada. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
