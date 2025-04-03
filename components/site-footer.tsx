import { MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <p>© {new Date().getFullYear()} Profile Explorer. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

