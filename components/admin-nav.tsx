import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Users } from "lucide-react"

export function AdminNav() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/admin" className="font-bold text-xl flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Profile Explorer Admin
        </Link>
        <nav className="ml-auto flex gap-4">
          <Link href="/admin">
            <Button variant="ghost" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Profiles
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">View Site</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

