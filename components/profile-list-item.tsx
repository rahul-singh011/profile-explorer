"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MapPin, Mail, Phone, Globe, ArrowUpRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function ProfileListItem({ profile, onViewMap }) {
  const router = useRouter()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [isHovering, setIsHovering] = useState(false)

  const favorited = isFavorite(profile.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Card className="h-full flex flex-col overflow-hidden group hover:shadow-md transition-all duration-300 border-muted/80 relative">
        {/* Favorite button */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 z-10 h-8 w-8 rounded-full ${favorited ? "text-red-500" : "text-muted-foreground"} ${isHovering || favorited ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(profile.id)
          }}
        >
          <Heart className={`h-5 w-5 ${favorited ? "fill-current" : ""}`} />
          <span className="sr-only">{favorited ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>

        <CardHeader className="pb-2 relative">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-primary/10 to-primary/5 -z-10"></div>
          <div className="flex items-center gap-4 z-10">
            <Avatar className="w-16 h-16 border-4 border-background shadow-md">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/profile/${profile.id}`} className="group/link">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex items-center gap-1">
                  {profile.name}
                  <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </h3>
              </Link>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mr-1 text-primary/70" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{profile.description}</p>

          <div className="mt-4 pt-4 border-t flex flex-col gap-2">
            <div className="flex items-center text-sm">
              <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{profile.name.toLowerCase().replace(" ", ".")}@example.com</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">
                +1 (555) {Math.floor(100 + Math.random() * 900)}-{Math.floor(1000 + Math.random() * 9000)}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Globe className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <a href="#" className="text-primary hover:underline flex items-center">
                View Website <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t bg-muted/20 flex gap-2">
          <Button onClick={() => onViewMap(profile)} className="flex-1 gap-2" variant="outline">
            <MapPin className="h-4 w-4" />
            View on Map
          </Button>
          <Button onClick={() => router.push(`/profile/${profile.id}`)} className="flex-1 gap-2">
            <ExternalLink className="h-4 w-4" />
            View Profile
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

