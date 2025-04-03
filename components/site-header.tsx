import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Profile Explorer</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              Admin Dashboard
            </Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

