import { AdminNav } from "@/components/admin-nav"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminNav />
      <div className="flex-1">{children}</div>
    </div>
  )
}

