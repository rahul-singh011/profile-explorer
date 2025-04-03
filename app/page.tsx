import { ProfileList } from "@/components/profile-list"
import { SearchFilters } from "@/components/search-filters"
import { HeroSection } from "@/components/hero-section"
import { StatsDashboard } from "@/components/stats-dashboard"
import { ProfileComparison } from "@/components/profile-comparison"
import { FavoritesList } from "@/components/favorites-list"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <HeroSection />
      <div className="container mx-auto py-6 px-4">
        <StatsDashboard />
        <FavoritesList />
        <SearchFilters />
        <ProfileComparison />
        <ProfileList />
      </div>
    </div>
  )
}

