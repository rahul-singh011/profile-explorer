"use client"

import { useFavorites } from "@/hooks/use-favorites"
import { useProfiles } from "@/hooks/use-profiles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Star, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FavoritesList() {
  const { favorites, removeFavorite } = useFavorites()
  const { profiles } = useProfiles()

  // Get favorite profiles
  const favoriteProfiles = profiles.filter((profile) => favorites.includes(profile.id))

  if (favorites.length === 0) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Favorite Profiles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed">
            <Heart className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">Add profiles to your favorites to quickly access them later</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" fill="currentColor" />
          Favorite Profiles
          <Badge variant="outline" className="ml-2">
            {favorites.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {favoriteProfiles.map((profile) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border-primary/10">
                  <div className="absolute top-2 right-2 z-10">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() => removeFavorite(profile.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove from favorites</span>
                    </Button>
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium flex items-center gap-1">
                        {profile.name}
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1 text-primary/70" />
                        <span>{profile.location}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

