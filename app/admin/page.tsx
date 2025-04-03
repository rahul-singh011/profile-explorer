import { AdminProfileList } from "@/components/admin-profile-list"
import { AdminHeader } from "@/components/admin-header"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <AdminHeader />
      <AdminProfileList />
    </div>
  )
}

