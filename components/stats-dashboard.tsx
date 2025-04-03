"use client"

import { useProfiles } from "@/hooks/use-profiles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, MapPin, TrendingUp, Activity } from "lucide-react"

export function StatsDashboard() {
  const { profiles } = useProfiles()

  // Count profiles by location
  const locationCounts = profiles.reduce((acc, profile) => {
    acc[profile.location] = (acc[profile.location] || 0) + 1
    return acc
  }, {})

  const locationData = Object.entries(locationCounts).map(([name, value]) => ({
    name,
    value,
  }))

  // Generate random activity data for demonstration
  const activityData = [
    { name: "Mon", value: Math.floor(Math.random() * 50) + 10 },
    { name: "Tue", value: Math.floor(Math.random() * 50) + 10 },
    { name: "Wed", value: Math.floor(Math.random() * 50) + 20 },
    { name: "Thu", value: Math.floor(Math.random() * 50) + 15 },
    { name: "Fri", value: Math.floor(Math.random() * 50) + 25 },
    { name: "Sat", value: Math.floor(Math.random() * 50) + 30 },
    { name: "Sun", value: Math.floor(Math.random() * 50) + 20 },
  ]

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Total Profiles
          </CardTitle>
          <CardDescription>Active profiles in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{profiles.length}</div>
          <div className="text-xs text-muted-foreground mt-1">
            <span className="text-emerald-500 font-medium">↑ 12%</span> from last month
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Unique Locations
          </CardTitle>
          <CardDescription>Cities represented</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{Object.keys(locationCounts).length}</div>
          <div className="text-xs text-muted-foreground mt-1">
            <span className="text-emerald-500 font-medium">↑ 3</span> new locations added
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Profile Distribution
          </CardTitle>
          <CardDescription>Profiles by location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Weekly Activity
          </CardTitle>
          <CardDescription>Profile views over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

