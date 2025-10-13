import { TrackOrder } from "@/components/track-order"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/infocell-logo.png" alt="InfoCell Logo" width={50} height={50} className="rounded-lg" />
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-[#00a8ff]">INFO</span>
                <span className="text-[#00ff00]">CELL</span>
              </h1>
              <p className="text-xs text-muted-foreground">Assistência Técnica Especializada</p>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <TrackOrder />
        </div>
      </main>
    </div>
  )
}
