//app\account\page.tsx
"use client"
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai'; // Import Ant Design Icons
import { MdHome, MdInfoOutline, MdLogout } from 'react-icons/md'
import { faHome, faInfoCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  User,
  Mail,
  Ticket,
  CreditCard,
  Hotel,
  Car,
  Users,
  Calendar,
  MapPin,
  CheckCircle,
  ArrowRight,
  Edit,
  Download,
  Trophy,
  Clock,
  AlertCircle,
} from "lucide-react"

export default function AccountPage() {
  const { toast } = useToast();
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };




  useEffect(() => {
    const fetchAccountData = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.user) {
          router.push('/login')
          return
        }

        const { data, error } = await supabase
          .from('registrations')
          .select('*') // Select all columns now to easily check current_step
          .eq('user_id', session.user.id)
          .single()

        if (error) {
          console.error('Error fetching user data:', error)
          setError(error.message)
        }

        setUserData(data)

        // Redirect to registration only if not finished
        if (data?.current_step < 7) {
          router.push(`/register?step=${data.current_step}`)
        }
      } catch (error: any) {
        console.error('Authentication or fetch error:', error)
        setError(error.message || 'An unexpected error occurred')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchAccountData()
  }, [router])

  // const handleLogout = async () => {
  //   await supabase.auth.signOut()
  //   router.push('/login')
  // }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
        variant: "info",
      })
      router.push('/login')
    } else {
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive",
      })
      console.error('Error signing out:', error)
    }
  }








  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  // Calculate progress percentage
  const progressPercentage = userData ? (userData.current_step / 7) * 100 : 0

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-full max-w-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-32 mr-2" />
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>Erreur lors du chargement des données du compte: {error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/login")}>Retourner à la page de connexion</Button>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Aucune donnée trouvée</AlertTitle>
          <AlertDescription>
            Aucune donnée de compte n&apos;a été trouvée. Veuillez vous inscrire pour commencer.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/register")}>Commencer l&apos;inscription</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex flex-col md:flex-row ">
      {/* Main Content */}
      <div className=" w-full md:w-64 flex-1 container mx-auto py-10 px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-8 w-8 text-yellow-400" />
          <h1 className="text-3xl font-bold">Votre Portail CAN 2025</h1>
        </div>

        {userData?.current_step < 7 ? (
          <div className="space-y-8">
            <Card className="border-none shadow-lg bg-gradient-to-br from-red-50 to-green-50 dark:from-red-950/20 dark:to-green-950/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Progression de l&apos;Inscription
                </CardTitle>
                <CardDescription>
                  Vous êtes actuellement à l&apos;étape {userData.current_step} sur 7 du processus d&apos;inscription.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span className="font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-gray-200" />

                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Début</span>
                    <span>Étape {userData.current_step}</span>
                    <span>Terminé</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => router.push(`/register?step=${userData.current_step}`)}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                >
                  Continuer l&apos;Inscription <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button onClick={() => router.push("/register?step=1")} variant="outline" className="w-full sm:w-auto">
                  <Edit className="mr-2 h-4 w-4" /> Modifier les Informations
                </Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                <TabsTrigger value="personal">Personnel</TabsTrigger>
                <TabsTrigger value="tickets">Billets</TabsTrigger>
                <TabsTrigger value="accommodation">Hébergement</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 min-h-[400px] ">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-red-500" />
                      Informations Personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                      {userData?.form_data?.personalInfo?.fullName && (
                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm text-muted-foreground">Nom Complet</div>
                            <div className="font-medium">{userData.form_data.personalInfo.fullName}</div>
                          </div>
                        </div>
                      )}

                      {userData?.form_data?.personalInfo?.email && (
                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm text-muted-foreground">Email</div>
                            <div className="font-medium">{userData.form_data.personalInfo.email}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {userData?.form_data?.companions && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-orange-500" />
                        Accompagnateurs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {userData?.form_data?.companions?.names &&
                          userData.form_data.companions.names.map((name: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                              <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 h-8 w-8 rounded-full flex items-center justify-center">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{name}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span>{userData.form_data.companions.ages[index]} ans</span>
                                  <span>•</span>
                                  <span>{userData.form_data.companions.relationships[index]}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="tickets" className="space-y-4 min-h-[400px]">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Ticket className="h-5 w-5 text-green-500" />
                      Billets et Paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userData?.form_data?.tickets?.category && (
                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                          <Ticket className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm text-muted-foreground">Catégorie de Billet</div>
                            <div className="font-medium">
                              {userData.form_data.tickets.category}
                              {userData?.form_data?.tickets?.quantity && (
                                <Badge variant="outline" className="ml-2">
                                  {userData.form_data.tickets.quantity}{" "}
                                  {userData.form_data.tickets.quantity > 1 ? "billets" : "billet"}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {userData?.form_data?.payment?.method && (
                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm text-muted-foreground">Méthode de Paiement</div>
                            <div className="font-medium">
                              {userData.form_data.payment.method}
                              {userData?.form_data?.payment?.amount && (
                                <span className="ml-2 text-green-600 font-semibold">
                                  {userData.form_data.payment.amount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accommodation" className="space-y-4 min-h-[400px]">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Hotel className="h-5 w-5 text-purple-500" />
                      Hébergement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {userData?.form_data?.accommodation?.hotel && (
                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                          <Hotel className="h-5 w-5 text-purple-500 mt-1" />
                          <div className="space-y-3 flex-1">
                            <div>
                              <div className="font-medium text-lg">{userData.form_data.accommodation.hotel}</div>
                              {userData?.form_data?.accommodation?.roomType && (
                                <div className="text-sm text-muted-foreground">
                                  {userData.form_data.accommodation.roomType}
                                </div>
                              )}
                            </div>

                            {(userData?.form_data?.accommodation?.checkIn ||
                              userData?.form_data?.accommodation?.checkOut) && (
                                <div className="flex items-center gap-2 text-sm bg-background p-2 rounded border">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <span className="font-medium">
                                      {formatDate(userData?.form_data?.accommodation?.checkIn)}
                                    </span>
                                    <span className="mx-2">→</span>
                                    <span className="font-medium">
                                      {formatDate(userData?.form_data?.accommodation?.checkOut)}
                                    </span>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transport" className="space-y-4 min-h-[400px]">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Car className="h-5 w-5 text-blue-500" />
                      Transport
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {userData?.form_data?.transportation?.vehicleType && (
                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                          <Car className="h-5 w-5 text-blue-500 mt-1" />
                          <div className="space-y-3 flex-1">
                            <div>
                              <div className="font-medium text-lg">{userData.form_data.transportation.vehicleType}</div>

                              {userData?.form_data?.transportation?.dropOffLocation && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  {userData.form_data.transportation.dropOffLocation}
                                </div>
                              )}
                            </div>

                            {(userData?.form_data?.transportation?.pickupDate ||
                              userData?.form_data?.transportation?.dropOffDate) && (
                                <div className="flex items-center gap-2 text-sm bg-background p-2 rounded border">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <span className="font-medium">
                                      {formatDate(userData?.form_data?.transportation?.pickupDate)}
                                    </span>
                                    <span className="mx-2">→</span>
                                    <span className="font-medium">
                                      {formatDate(userData?.form_data?.transportation?.dropOffDate)}
                                    </span>
                                  </div>
                                </div>
                              )}

                            {userData?.form_data?.transportation?.specialRequests && (
                              <div className="text-sm p-2 bg-background rounded border">
                                <div className="font-medium mb-1">Demandes spéciales:</div>
                                <div className="text-muted-foreground">
                                  {userData.form_data.transportation.specialRequests}
                                </div>
                              </div>
                            )}

                            {userData?.form_data?.transportation?.additionalServices && (
                              <div className="text-sm">
                                <div className="font-medium mb-1">Services additionnels:</div>
                                <Badge variant="secondary">{userData.form_data.transportation.additionalServices}</Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (






          <div className="min-h-screen py-8 bg-gray-50 ">

            {/* [B] - Main Card Container - Added max-width and centered */}
            <div className="container mx-auto px-4 max-w-4xl"> {/* New container wrapper */}
              <Card
                className="border border-gray-300 shadow-md overflow-hidden flex flex-col h-full bg-gray-100 dark:bg-gray-800"
              /* Updated background to a softer gray and added a visible border and shadow */
              >

                {/* [C] - Green Header Bar - No changes needed */}
                <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>

                {/* [D] - Card Content Wrapper - Added flex layout */}
                <div className="flex flex-col flex-grow p-6"> {/* Added padding and flex */}
                  <CardHeader className="pb-4">
                    {/* [E] - Header Content - No changes needed */}
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          Inscription Complétée
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                          Merci, vous avez terminé votre enregistrement pour la CAN 2025
                        </CardDescription>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                      </div>
                    </div>
                  </CardHeader>

                  {/* [F] - Main Content Area - Restructured for proper height */}
                  <CardContent className="flex-grow flex flex-col">
                    <Tabs defaultValue="summary" className="flex-grow flex flex-col">
                      <TabsList className="grid grid-cols-3 mb-4 ">
                        <TabsTrigger
                          value="summary"
                          className="bg-white text-black data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                        >
                          Résumé
                        </TabsTrigger>
                        <TabsTrigger value="tickets" className="bg-white text-black data-[state=active]:bg-orange-500 data-[state=active]:text-white" >Billets</TabsTrigger>
                        <TabsTrigger value="travel" className="bg-white text-black data-[state=active]:bg-orange-500 data-[state=active]:text-white">Voyage</TabsTrigger>
                      </TabsList>

                      {/* [G] - Tab Content Wrapper - Added flex-grow and overflow */}
                      <div className="flex-grow overflow-auto"> {/* Critical fix */}

                        {/* [H] - Summary Tab - Added proper height handling */}
                        <TabsContent value="summary" className="h-full">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                            {/* [I] - Field Items - No changes needed */}
                            {userData?.form_data?.personalInfo?.fullName && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Nom Complet</div>
                                  <div className="font-medium">{userData.form_data.personalInfo.fullName}</div>
                                </div>
                              </div>
                            )}
                            {/* ... other summary fields ... */}

                            {userData?.form_data?.personalInfo?.email && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Email</div>
                                  <div className="font-medium">{userData.form_data.personalInfo.email}</div>
                                </div>
                              </div>
                            )}
                            {userData?.form_data?.personalInfo?.phone && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Phone</div>
                                  <div className="font-medium">{userData.form_data.personalInfo.phone}</div>
                                </div>
                              </div>
                            )}

                            {userData?.form_data?.personalInfo?.country && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Pays</div>
                                  <div className="font-medium">{userData.form_data.personalInfo.country}</div>
                                </div>
                              </div>
                            )}

                            {userData?.form_data?.stayOrganization?.travelInsurance && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Pays</div>
                                  <div className="font-medium">{userData.form_data.stayOrganization.travelInsurance}</div>
                                </div>
                              </div>
                            )}
                            {userData?.form_data?.travel?.accompanyingPersons && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Services Additionnels</div>
                                  <div className="font-medium">{userData.form_data.travel.accompanyingPersons}</div>
                                </div>
                              </div>
                            )}
                            {userData?.form_data?.payment?.method && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Demandes Spéciales</div>
                                  <div className="font-medium">{userData.form_data.payment.method}</div>
                                </div>
                              </div>
                            )}




                          </div>

                        </TabsContent>

                        {/* [J] - Tickets Tab - Restructured height */}
                        <TabsContent value="tickets" className="h-full">
                          <Card className="border border-dashed h-full">
                            <CardContent className="h-full">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* ... ticket fields ... */}

                                {userData?.form_data?.tickets?.category && (
                                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                    <Ticket className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div className="text-sm text-muted-foreground">Catégorie de Billet</div>
                                      <div className="font-medium">{userData.form_data.tickets.category}</div>
                                    </div>
                                  </div>

                                )}

                                {userData?.form_data?.tickets?.final && (
                                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                    <Ticket className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div className="text-sm text-muted-foreground">Catégorie de Billet</div>
                                      <div className="font-medium">{userData.form_data.tickets.final}</div>
                                    </div>
                                  </div>

                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* [K] - Travel Tab - Height adjustment */}
                        <TabsContent value="travel" className="h-full">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                            {/* ... travel fields ... */}
                            {userData?.form_data?.travel?.departureDate && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Date de Départ</div>
                                  <div className="font-medium">{formatDate(userData.form_data.travel.departureDate)}</div>
                                </div>
                              </div>
                            )}
                            {userData?.form_data?.travel?.arrivalDate && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Date de Retour</div>
                                  <div className="font-medium">{formatDate(userData.form_data.travel.arrivalDate)}</div>
                                </div>
                              </div>
                            )}
                            {userData?.form_data?.travel?.departureLocation && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Lieu de Départ</div>
                                  <div className="font-medium">{userData.form_data.travel.departureLocation}</div>
                                </div>
                              </div>
                            )}
                            {userData?.form_data?.travel?.arrivalLocation && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Lieu d&apos;Arrivée</div>
                                  <div className="font-medium">{userData.form_data.travel.arrivalLocation}</div>
                                </div>
                              </div>
                            )}
                            {userData?.form_data?.travel?.specialRequests && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Demandes Spéciales</div>
                                  <div className="font-medium">{userData.form_data.travel.specialRequests}</div>
                                </div>
                              </div>
                            )}
                            {userData?.form_data?.travel?.additionalServices && (
                              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="text-sm text-muted-foreground">Services Additionnels</div>
                                  <div className="font-medium">{userData.form_data.travel.additionalServices}</div>
                                </div>
                              </div>
                            )}

                            {userData?.form_data?.accommodation?.roomType && (
                              <div className="p-3 bg-muted/50 rounded-md">
                                <div className="text-sm text-muted-foreground">Type de Chambre</div>
                                <div className="font-medium">{userData.form_data.accommodation.roomType}</div>
                              </div>
                            )}


                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </CardContent>

                  {/* [L] - Footer - No changes needed */}
                  <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
                      <Download className="mr-2 h-4 w-4" /> Télécharger la Confirmation
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Contacter le Support
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </div>
          </div>




        )}
      </div>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row  flex h-sceen">
        <div className="h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col py-10 shadow-lg  fixed right-0 top-0">
          <div className="px-6 pb-8 border-b border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-center">Menu</h2>
          </div>
          <nav className="flex-grow mt-6 flex flex-col justify-between">
            <div className="space-y-2 px-4">
              <button
                onClick={() => router.push('/')}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 rounded transition duration-300 ease-in-out"
              >
                <AiOutlineHome className="mr-3 text-lg text-gray-400" />
                <span className="text-gray-300">Accueil</span>
              </button>
              <button
                onClick={() => router.push('/about')}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 rounded transition duration-300 ease-in-out"
              >
                <AiOutlineInfoCircle className="mr-3 text-lg text-gray-400" />
                <span className="text-gray-300">À Propos</span>
              </button>
            </div>
            <div className="px-4 pb-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-red-600 rounded transition duration-300 ease-in-out"
              >
                <AiOutlineLogout className="mr-3 text-lg text-red-400" />
                <span>Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>


      </div>





      <>
      {/* Collapsed Sidebar Button */}
      <button 
        onClick={toggleSidebar}
        className="fixed right-4 top-4 z-50 p-2 bg-gray-800 rounded-md text-white md:hidden"
      >
        <AiOutlineMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row  flex h-sceen">
        <div className="h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col py-10 shadow-lg  fixed right-0 top-0">
          <div className="px-6 pb-8 border-b border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-center">Menu</h2>
          </div>
          <nav className="flex-grow mt-6 flex flex-col justify-between">
            <div className="space-y-2 px-4">
              <button
                onClick={() => router.push('/')}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 rounded transition duration-300 ease-in-out"
              >
                <AiOutlineHome className="mr-3 text-lg text-gray-400" />
                <span className="text-gray-300">Accueil</span>
              </button>
              <button
                onClick={() => router.push('/about')}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 rounded transition duration-300 ease-in-out"
              >
                <AiOutlineInfoCircle className="mr-3 text-lg text-gray-400" />
                <span className="text-gray-300">À Propos</span>
              </button>
            </div>
            <div className="px-4 pb-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-red-600 rounded transition duration-300 ease-in-out"
              >
                <AiOutlineLogout className="mr-3 text-lg text-red-400" />
                <span>Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>


      </div>

      {/* Overlay (for mobile) */}
  
    </>


    </div>
  )
}

