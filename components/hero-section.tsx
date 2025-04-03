"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProfileForm } from "@/components/profile-form"
import { MapPin, PlusCircle, Users } from "lucide-react"

export function HeroSection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="relative bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-primary">Explore</span> Profiles & Locations
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover people and their locations with our interactive map explorer. Browse profiles, view their
              locations, and connect with professionals around the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" onClick={() => setOpen(true)}>
                <PlusCircle className="h-5 w-5" />
                Add New Profile
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="#profiles">
                  <Users className="h-5 w-5" />
                  Browse Profiles
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-3/4 opacity-10">
          <div className="absolute right-20 top-10 w-40 h-40 rounded-full bg-primary/30"></div>
          <div className="absolute right-60 top-40 w-60 h-60 rounded-full bg-primary/20"></div>
          <MapPin className="absolute right-40 bottom-20 w-32 h-32 text-primary/20" />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Profile</DialogTitle>
          </DialogHeader>
          <ProfileForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

