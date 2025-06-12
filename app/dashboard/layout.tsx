"use client"

import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/Dashboard-sidebar"
import { Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await axios.get("/api/auth/protected")
      return response.data
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (isError || !data) {
    // Redirect to login if unauthorized
    if (typeof window !== 'undefined') {
      router.push("/")
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar user={data.user} />
      <div className="flex-1 overflow-auto">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}