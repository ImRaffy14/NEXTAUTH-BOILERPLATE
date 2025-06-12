"use client"

import { UserManagement } from "@/components/User-management"

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage system users and their permissions</p>
      </div>
      <UserManagement />
    </div>
  )
}
