"use client"

import { useState } from "react"
import { useProfiles } from "@/hooks/use-profiles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Mail, Phone, Globe, RefreshCw } from "lucide-react"

export function ProfileComparison() {
  const { profiles } = useProfiles()
  const [profile1Id, setProfile1Id] = useState("")
  const [profile2Id, setProfile2Id] = useState("")

  const profile1 = profiles.find((p) => p.id.toString() === profile1Id)
  const profile2 = profiles.find((p) => p.id.toString() === profile2Id)

  const handleRandomComparison = () => {
    if (profiles.length < 2) return

    const randomIndices = getRandomIndices(profiles.length, 2)
    setProfile1Id(profiles[randomIndices[0]].id.toString())
    setProfile2Id(profiles[randomIndices[1]].id.toString())
  }

  // Helper function to get random indices
  const getRandomIndices = (max, count) => {
    const indices = []
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max)
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex)
      }
    }
    return indices
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Compare Profiles</span>
          <Button variant="outline" size="sm" onClick={handleRandomComparison} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Random Comparison
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <div className="md:col-span-3">
            <div className="mb-4">
              <Select value={profile1Id} onValueChange={setProfile1Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile 1" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.map((profile) => (
                    <SelectItem key={`p1-${profile.id}`} value={profile.id.toString()}>
                      {profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {profile1 ? (
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="w-20 h-20 mb-2">
                      <AvatarImage src={profile1.avatar} alt={profile1.name} />
                      <AvatarFallback>{profile1.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{profile1.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-primary/70" />
                      <span>{profile1.location}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">{profile1.description}</p>
                    </div>

                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {profile1.name.toLowerCase().replace(" ", ".")}@example.com
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        +1 (555) {Math.floor(100 + Math.random() * 900)}-{Math.floor(1000 + Math.random() * 9000)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Globe className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span className="text-primary">website.com/{profile1.name.toLowerCase().replace(" ", "")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
                Select a profile to compare
              </div>
            )}
          </div>

          <div className="flex items-center justify-center md:col-span-1">
            <div className="bg-primary/10 rounded-full p-2">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4">
              <Select value={profile2Id} onValueChange={setProfile2Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile 2" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.map((profile) => (
                    <SelectItem key={`p2-${profile.id}`} value={profile.id.toString()}>
                      {profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {profile2 ? (
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="w-20 h-20 mb-2">
                      <AvatarImage src={profile2.avatar} alt={profile2.name} />
                      <AvatarFallback>{profile2.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{profile2.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-primary/70" />
                      <span>{profile2.location}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">{profile2.description}</p>
                    </div>

                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {profile2.name.toLowerCase().replace(" ", ".")}@example.com
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        +1 (555) {Math.floor(100 + Math.random() * 900)}-{Math.floor(1000 + Math.random() * 9000)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Globe className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span className="text-primary">website.com/{profile2.name.toLowerCase().replace(" ", "")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
                Select a profile to compare
              </div>
            )}
          </div>

          {profile1 && profile2 && (
            <div className="md:col-span-7 mt-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Comparison Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Location</h4>
                      <Badge variant={profile1.location === profile2.location ? "default" : "outline"}>
                        {profile1.location === profile2.location ? "Same location" : "Different locations"}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Distance</h4>
                      <Badge variant="outline">
                        {calculateDistance(profile1.coordinates, profile2.coordinates).toFixed(1)} miles apart
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(coord1, coord2) {
  const R = 3958.8 // Earth's radius in miles
  const dLat = toRad(coord2.lat - coord1.lat)
  const dLon = toRad(coord2.lng - coord1.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(value) {
  return (value * Math.PI) / 180
}

