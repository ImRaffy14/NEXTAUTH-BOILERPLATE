"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, LayoutDashboard, Settings, LogOut, User, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { signOut } from 'next-auth/react'
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { ConfirmationModal } from "@/components/modal/ConfirmationModal"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface UserData {
  name?: string | null
  email?: string | null
}

interface DashboardSidebarProps {
  user?: UserData
  isLoading?: boolean
}

export function DashboardSidebar({ user, isLoading }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <>
        <div className={cn(
          "flex h-full flex-col border-r border-neutral-200 bg-neutral-50 transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64"
        )}>
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex items-center justify-between px-4">
              {!collapsed && (
                <h1 className="text-xl font-bold text-neutral-900">Admin Panel</h1>
              )}
              <Button
                variant="ghost"
                size="lg"
                onClick={toggleCollapse}
                className="h-8 w-8 p-0 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center overflow-hidden text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "bg-neutral-200 text-neutral-900" 
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                      collapsed ? "justify-center p-2" : "px-2 py-2"
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 flex-shrink-0",
                      !collapsed && "mr-3"
                    )} />
                    {!collapsed && item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-neutral-200 p-4">
            <div className={cn(
              "flex items-center justify-between w-full",
              collapsed ? "flex-col gap-2" : ""
            )}>
              <div className="flex items-center">
                <User className={cn(
                  "h-8 w-8 text-neutral-500",
                  collapsed ? "mx-auto" : ""
                )} />
                {!collapsed && (
                  <div className="ml-3">
                    {isLoading ? (
                      <>
                        <Skeleton className="h-4 w-24 mb-1 bg-neutral-200" />
                        <Skeleton className="h-3 w-32 bg-neutral-200" />
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-neutral-900">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-neutral-500 truncate max-w-[180px]">
                          {user?.email || ""}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  "text-red-500 hover:text-red-900",
                  collapsed ? "h-8 w-8 p-0" : ""
                )}
                disabled={isLoading}
                title={collapsed ? "Sign out" : undefined}
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span className="sr-only">Sign out</span>}
              </Button>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleSignOut}
          title="Sign Out"
          description="Are you sure you want to sign out?"
          confirmText="Sign Out"
          cancelText="Cancel"
          variant="destructive"
        />
    </>
  )
}