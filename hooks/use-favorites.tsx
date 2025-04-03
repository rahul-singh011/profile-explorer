"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create context
const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("profileFavorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e)
      }
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("profileFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Add a profile to favorites
  const addFavorite = (profileId) => {
    if (!favorites.includes(profileId)) {
      setFavorites([...favorites, profileId])
    }
  }

  // Remove a profile from favorites
  const removeFavorite = (profileId) => {
    setFavorites(favorites.filter((id) => id !== profileId))
  }

  // Toggle a profile's favorite status
  const toggleFavorite = (profileId) => {
    if (favorites.includes(profileId)) {
      removeFavorite(profileId)
    } else {
      addFavorite(profileId)
    }
  }

  // Check if a profile is favorited
  const isFavorite = (profileId) => {
    return favorites.includes(profileId)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

