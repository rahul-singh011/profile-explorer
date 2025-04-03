"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Sample profile data
const initialProfiles = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=200&width=200",
    description:
      "Software engineer with 5 years of experience in web development. Passionate about creating user-friendly interfaces and solving complex problems.",
    location: "San Francisco",
    address: "123 Tech Avenue, San Francisco, CA 94105",
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 2,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=200&width=200",
    description:
      "Marketing specialist with expertise in digital campaigns and brand strategy. Helped multiple startups establish their market presence.",
    location: "New York",
    address: "456 Madison Ave, New York, NY 10022",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 3,
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=200&width=200",
    description:
      "UX/UI designer focused on creating intuitive and accessible digital experiences. Advocate for user-centered design principles.",
    location: "Seattle",
    address: "789 Pine Street, Seattle, WA 98101",
    coordinates: { lat: 47.6062, lng: -122.3321 },
  },
  {
    id: 4,
    name: "Morgan Lee",
    avatar: "/placeholder.svg?height=200&width=200",
    description:
      "Data scientist specializing in machine learning and predictive analytics. Passionate about using data to drive business decisions.",
    location: "Boston",
    address: "101 Innovation Drive, Boston, MA 02210",
    coordinates: { lat: 42.3601, lng: -71.0589 },
  },
  {
    id: 5,
    name: "Casey Rivera",
    avatar: "/placeholder.svg?height=200&width=200",
    description:
      "Product manager with a background in both engineering and business. Skilled at bridging technical and business requirements.",
    location: "Austin",
    address: "202 Startup Blvd, Austin, TX 78701",
    coordinates: { lat: 30.2672, lng: -97.7431 },
  },
  {
    id: 6,
    name: "Jordan Patel",
    avatar: "/placeholder.svg?height=200&width=200",
    description:
      "Full-stack developer specializing in React and Node.js. Passionate about open source and building scalable applications.",
    location: "San Francisco",
    address: "303 Developer Lane, San Francisco, CA 94107",
    coordinates: { lat: 37.76, lng: -122.4 },
  },
]

// Create context
const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState([])

  // Load profiles on mount
  useEffect(() => {
    // In a real app, this would be an API call
    setProfiles(initialProfiles)
  }, [])

  // Add a new profile
  const addProfile = (profile) => {
    setProfiles([...profiles, { ...profile, id: Date.now() }])
  }

  // Update an existing profile
  const updateProfile = (updatedProfile) => {
    setProfiles(profiles.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile)))
  }

  // Delete a profile
  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id))
  }

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        addProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfiles() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfiles must be used within a ProfileProvider")
  }
  return context
}

