"use client"

import { useState } from "react"
import { useProfiles } from "@/hooks/use-profiles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, User, FileText, MapPinned, PlusCircle } from "lucide-react"

export function ProfileForm({ profile = null, onSuccess }) {
  const { addProfile, updateProfile } = useProfiles()
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    avatar: profile?.avatar || "/placeholder.svg?height=200&width=200",
    description: profile?.description || "",
    location: profile?.location || "",
    address: profile?.address || "",
    coordinates: profile?.coordinates || { lat: 0, lng: 0 },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [name]: Number.parseFloat(value) || 0,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (profile) {
      updateProfile({ ...formData, id: profile.id })
    } else {
      addProfile(formData)
    }

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="City name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description about this person"
            />
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-1">
              <MapPinned className="h-4 w-4" />
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Full street address"
            />
          </div>

          <Card className="p-4">
            <h3 className="text-sm font-medium mb-3">Map Coordinates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  name="lat"
                  type="number"
                  step="any"
                  value={formData.coordinates.lat}
                  onChange={handleCoordinateChange}
                  required
                  placeholder="e.g. 37.7749"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  name="lng"
                  type="number"
                  step="any"
                  value={formData.coordinates.lng}
                  onChange={handleCoordinateChange}
                  required
                  placeholder="e.g. -122.4194"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Tip: You can find coordinates by right-clicking on Google Maps and selecting "What's here?"
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" className="gap-2">
          {profile ? "Update Profile" : "Add Profile"}
          {profile ? <User className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  )
}

