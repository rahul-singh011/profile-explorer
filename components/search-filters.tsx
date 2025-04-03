"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProfiles } from "@/hooks/use-profiles"
import { useSearch } from "@/hooks/use-search"
import { Card } from "@/components/ui/card"
import { Search, MapPin } from "lucide-react"

export function SearchFilters() {
  const { profiles } = useProfiles()
  const { searchTerm, setSearchTerm, selectedLocation, setSelectedLocation } = useSearch()

  // Extract unique locations from profiles
  const locations = [...new Set(profiles.map((profile) => profile.location))].sort()

  return (
    <Card className="p-4 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2 block font-medium flex items-center gap-1">
            <Search className="h-4 w-4" />
            Search Profiles
          </Label>
          <div className="relative">
            <Input
              id="search"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="w-full md:w-64">
          <Label htmlFor="location" className="mb-2 block font-medium flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Filter by Location
          </Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )
}

