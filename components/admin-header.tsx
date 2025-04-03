"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ProfileForm } from "@/components/profile-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function AdminHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage profiles and their locations</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Profile
          </Button>
          <Link href="/">
            <Button variant="outline">View Site</Button>
          </Link>
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

