"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ProfileMap({ profile }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    // Skip if running on the server or if the map is already initialized
    if (typeof window === "undefined" || !mapRef.current || mapInstanceRef.current) return

    // Dynamically import Leaflet to avoid SSR issues
    const initializeMap = async () => {
      const L = (await import("leaflet")).default

      // Import Leaflet CSS
      await import("leaflet/dist/leaflet.css")

      // Clean up previous map instance if it exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }

      // Create map instance
      const map = L.map(mapRef.current).setView([profile.coordinates.lat, profile.coordinates.lng], 13)

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Custom marker icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div class="marker-pin"></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      })

      // Add marker for the profile location
      const marker = L.marker([profile.coordinates.lat, profile.coordinates.lng], {
        icon: customIcon,
      }).addTo(map)

      // Custom popup
      const popupContent = `
        <div class="map-popup">
          <h3>${profile.name}</h3>
          <p>${profile.address}</p>
        </div>
      `

      marker.bindPopup(popupContent).openPopup()

      // Store map instance for cleanup
      mapInstanceRef.current = map

      // Ensure map renders correctly by triggering a resize after a short delay
      setTimeout(() => {
        map.invalidateSize()
      }, 100)

      // Add custom CSS for the marker and popup
      const style = document.createElement("style")
      style.textContent = `
        .custom-marker {
          background: transparent;
        }
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          background: hsl(var(--primary));
          position: absolute;
          transform: rotate(-45deg);
          left: 50%;
          top: 50%;
          margin: -15px 0 0 -15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .marker-pin::after {
          content: '';
          width: 20px;
          height: 20px;
          margin: 5px 0 0 5px;
          background: white;
          position: absolute;
          border-radius: 50%;
        }
        .map-popup h3 {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .map-popup p {
          margin: 0;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
      `
      document.head.appendChild(style)
    }

    initializeMap()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [profile])

  return (
    <Card className="overflow-hidden border shadow-md">
      <CardHeader className="bg-primary/5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">{profile.name}'s Location</CardTitle>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Navigation className="h-3 w-3" />
            {profile.location}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{profile.address}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapRef} className="h-[400px] w-full"></div>
      </CardContent>
    </Card>
  )
}

