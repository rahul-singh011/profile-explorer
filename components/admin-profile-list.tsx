"use client"

import { useState } from "react"
import { useProfiles } from "@/hooks/use-profiles"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProfileForm } from "@/components/profile-form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash } from "lucide-react"

export function AdminProfileList() {
  const { profiles, deleteProfile } = useProfiles()
  const [editingProfile, setEditingProfile] = useState(null)
  const [deletingProfile, setDeletingProfile] = useState(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell className="font-medium">{profile.name}</TableCell>
              <TableCell>{profile.location}</TableCell>
              <TableCell className="max-w-[300px] truncate">{profile.address}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setEditingProfile(profile)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeletingProfile(profile)}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {profiles.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-24">
                No profiles found. Add your first profile to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Edit Profile Dialog */}
      <Dialog open={!!editingProfile} onOpenChange={(open) => !open && setEditingProfile(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          {editingProfile && <ProfileForm profile={editingProfile} onSuccess={() => setEditingProfile(null)} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingProfile} onOpenChange={(open) => !open && setDeletingProfile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the profile for {deletingProfile?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteProfile(deletingProfile.id)
                setDeletingProfile(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

