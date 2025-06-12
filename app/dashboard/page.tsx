"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Shield, Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"

export default function DashboardPage() {
  const [taskInput, setTaskInput] = useState("")
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "Admin User")

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      return response.json()
    },
  })

  const handleAddTask = async () => {
    try {
      console.log("Adding task:", taskInput)
      // await axios.post("/api/tasks", { task: taskInput })
      setTaskInput("")
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    )
  }

  const activeUsers = users.filter((u: any) => u.status === "active").length
  const inactiveUsers = users.filter((u: any) => u.status === "inactive").length
  const adminUsers = users.filter((u: any) => u.role === "admin").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {userName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Registered users in the system</p>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Currently active users</p>
          </CardContent>
        </Card>

        {/* Inactive Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveUsers}</div>
            <p className="text-xs text-muted-foreground">Inactive user accounts</p>
          </CardContent>
        </Card>

        {/* Admin Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
            <p className="text-xs text-muted-foreground">Users with admin privileges</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>Add and manage your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
            <Input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add new task"
              className="flex-1 h-12 px-4 text-base"
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 sm:w-auto w-full h-12"
            >
              Add Task
            </button>
          </div>

          {/* Task list */}
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-600">Example task item - Replace with your task list</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity and Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem color="green" title="New user registered" time="2 minutes ago" />
              <ActivityItem color="blue" title="User role updated" time="5 minutes ago" />
              <ActivityItem color="yellow" title="System maintenance completed" time="1 hour ago" />
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusRow label="Database" status="Healthy" color="green" />
            <StatusRow label="API Services" status="Operational" color="green" />
            <StatusRow label="Authentication" status="Active" color="green" />
            <StatusRow label="Storage" status="Warning" color="yellow" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ActivityItem({ color, title, time }: { color: string, title: string, time: string }) {
  return (
    <div className="flex items-center space-x-4">
      <div className={`w-2 h-2 bg-${color}-500 rounded-full`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}

function StatusRow({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <span className={`text-sm text-${color}-600`}>{status}</span>
    </div>
  )
}
