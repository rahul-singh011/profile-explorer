"use client"

import { useState, useRef, useEffect } from "react"
import { X, Users, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProfileMap } from "@/components/profile-map"
import { ProfileListItem } from "@/components/profile-list-item"
import { useProfiles } from "@/hooks/use-profiles"
import { useSearch } from "@/hooks/use-search"
import { useFavorites } from "@/hooks/use-favorites"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProfileList() {
  const { profiles } = useProfiles()
  const { searchTerm, selectedLocation } = useSearch()
  const { favorites } = useFavorites()
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const mapRef = useRef(null)

  // Filter profiles based on search term and selected location
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      searchTerm === "" ||
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation =
      selectedLocation === "all" || selectedLocation === "" || profile.location === selectedLocation

    const matchesTab = activeTab === "all" || (activeTab === "favorites" && favorites.includes(profile.id))

    return matchesSearch && matchesLocation && matchesTab
  })

  // Scroll to map when a profile is selected
  useEffect(() => {
    if (selectedProfile && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [selectedProfile])

  return (
    <div className="mt-6" id="profiles">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Profiles
          {filteredProfiles.length > 0 && (
            <Badge variant="outline" className="ml-2">
              {filteredProfiles.length} {filteredProfiles.length === 1 ? "profile" : "profiles"}
            </Badge>
          )}
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Profiles
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
              {favorites.length > 0 && (
                <Badge variant="outline" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {favorites.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 relative"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setSelectedProfile(null)}
                className="rounded-full shadow-md"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close Map</span>
              </Button>
            </div>
            <ProfileMap profile={selectedProfile} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProfiles.map((profile) => (
            <ProfileListItem key={profile.id} profile={profile} onViewMap={setSelectedProfile} />
          ))}
        </AnimatePresence>
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-16 bg-muted/20 rounded-lg border border-dashed">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No profiles found</h3>
          <p className="text-muted-foreground mb-4">
            {activeTab === "favorites"
              ? "You haven't added any profiles to your favorites yet."
              : "No profiles match your search criteria."}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              document.getElementById("search").value = ""
              document.getElementById("location").click()
              setActiveTab("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

