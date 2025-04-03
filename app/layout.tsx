import { Inter } from "next/font/google"
import { ProfileProvider } from "@/hooks/use-profiles"
import { SearchProvider } from "@/hooks/use-search"
import { FavoritesProvider } from "@/hooks/use-favorites"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Profile Explorer",
  description: "Explore profiles with interactive map integration",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProfileProvider>
            <SearchProvider>
              <FavoritesProvider>
                <div className="flex min-h-screen flex-col">
                  <SiteHeader />
                  <main className="flex-1">{children}</main>
                  <SiteFooter />
                </div>
              </FavoritesProvider>
            </SearchProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'