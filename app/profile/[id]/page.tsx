"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useProfiles } from "@/hooks/use-profiles"
import { useFavorites } from "@/hooks/use-favorites"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileMap } from "@/components/profile-map"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Heart,
  MapPin,
  Mail,
  Phone,
  Globe,
  User,
  Calendar,
  Briefcase,
  GraduationCap,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function ProfileDetailPage({ params }) {
  const router = useRouter()
  const { profiles } = useProfiles()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const foundProfile = profiles.find((p) => p.id.toString() === params.id)
    if (foundProfile) {
      setProfile(foundProfile)
    } else {
      router.push("/")
    }
  }, [params.id, profiles, router])

  if (!profile) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profiles
          </Link>
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button
            variant={isFavorite(profile.id) ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => toggleFavorite(profile.id)}
          >
            <Heart className={`h-4 w-4 ${isFavorite(profile.id) ? "fill-current" : ""}`} />
            {isFavorite(profile.id) ? "Favorited" : "Add to Favorites"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-xl">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1 text-primary" />
                  <span>{profile.location}</span>
                </div>
                <Badge variant="outline" className="bg-primary/5">
                  Professional
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">
                      {profile.name.toLowerCase().replace(" ", ".")}@example.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">
                      +1 (555) {Math.floor(100 + Math.random() * 900)}-{Math.floor(1000 + Math.random() * 9000)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Globe className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <div className="font-medium">Website</div>
                    <a href="#" className="text-primary hover:underline">
                      website.com/{profile.name.toLowerCase().replace(" ", "")}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground">{profile.address}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="about" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                About
              </TabsTrigger>
              <TabsTrigger value="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Experience
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About {profile.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{profile.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div className="text-sm">
                        <div className="font-medium">Member Since</div>
                        <div className="text-muted-foreground">
                          {new Date(Date.now() - Math.random() * 31536000000).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div className="text-sm">
                        <div className="font-medium">Education</div>
                        <div className="text-muted-foreground">
                          {
                            ["Stanford University", "MIT", "Harvard University", "UC Berkeley"][
                              Math.floor(Math.random() * 4)
                            ]
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Leadership",
                      "Communication",
                      "Problem Solving",
                      "Teamwork",
                      "Creativity",
                      "Adaptability",
                      "Time Management",
                      "Critical Thinking",
                    ].map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location Information</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ProfileMap profile={profile} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative pl-8 pb-6 border-l border-muted">
                      <div className="absolute w-4 h-4 rounded-full bg-primary left-[-8px] top-0"></div>
                      <h3 className="font-medium">
                        Senior{" "}
                        {profile.location === "San Francisco"
                          ? "Software Engineer"
                          : profile.location === "New York"
                            ? "Marketing Specialist"
                            : "Product Manager"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {["Google", "Apple", "Microsoft", "Amazon", "Meta"][Math.floor(Math.random() * 5)]} · Full-time
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">Jan 2020 - Present · {profile.location}</p>
                      <p className="text-sm">
                        Led cross-functional teams to deliver high-impact projects and initiatives.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-6 border-l border-muted">
                      <div className="absolute w-4 h-4 rounded-full bg-muted left-[-8px] top-0"></div>
                      <h3 className="font-medium">
                        {profile.location === "San Francisco"
                          ? "Software Engineer"
                          : profile.location === "New York"
                            ? "Marketing Analyst"
                            : "Product Owner"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {["Airbnb", "Uber", "Twitter", "LinkedIn", "Salesforce"][Math.floor(Math.random() * 5)]} ·
                        Full-time
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">Mar 2017 - Dec 2019 · {profile.location}</p>
                      <p className="text-sm">Developed innovative solutions to complex business problems.</p>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute w-4 h-4 rounded-full bg-muted left-[-8px] top-0"></div>
                      <h3 className="font-medium">
                        {profile.location === "San Francisco"
                          ? "Junior Developer"
                          : profile.location === "New York"
                            ? "Marketing Assistant"
                            : "Associate Product Manager"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {["Dropbox", "Slack", "Stripe", "Square", "Shopify"][Math.floor(Math.random() * 5)]} · Full-time
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">Jun 2015 - Feb 2017 · {profile.location}</p>
                      <p className="text-sm">
                        Collaborated with stakeholders to define requirements and deliver solutions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative pl-8 pb-6 border-l border-muted">
                      <div className="absolute w-4 h-4 rounded-full bg-primary left-[-8px] top-0"></div>
                      <h3 className="font-medium">
                        Master's Degree,{" "}
                        {profile.location === "San Francisco"
                          ? "Computer Science"
                          : profile.location === "New York"
                            ? "Marketing"
                            : "Business Administration"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {
                          ["Stanford University", "MIT", "Harvard University", "UC Berkeley"][
                            Math.floor(Math.random() * 4)
                          ]
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">2013 - 2015</p>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute w-4 h-4 rounded-full bg-muted left-[-8px] top-0"></div>
                      <h3 className="font-medium">
                        Bachelor's Degree,{" "}
                        {profile.location === "San Francisco"
                          ? "Computer Engineering"
                          : profile.location === "New York"
                            ? "Communications"
                            : "Economics"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {
                          ["UCLA", "University of Michigan", "NYU", "University of Washington"][
                            Math.floor(Math.random() * 4)
                          ]
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">2009 - 2013</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

