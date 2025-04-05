"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  FileUp,
  Filter,
  Loader2,
  MoreHorizontal,
  RefreshCw,
  Search,
  Users,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"

// Types for our data
interface Registration {
  id: string
  user_id: string
  current_step: number
  form_data: {
    personalInfo?: {
      fullName?: string
      email?: string
      phone?: string
      country?: string
      city?: string
      nationality?: string
      gender?: string
      birthDate?: string
      idNumber?: string
      idExpiryDate?: string
      supportedTeam?: {
        supports: boolean
        teamName: string
      }
    }
    tickets?: {
      needed: boolean
      category: string
      matches?: {
        groupStage?: boolean
        roundOf16?: boolean
        quarterFinal?: boolean
        semiFinal?: boolean
        final?: boolean
      }
    }
    payment?: {
      method: string
      installments: string
      termsAccepted: boolean
      card?: {
        number: string
        expiry: string
        cvv: string
      }
    }
    stayOrganization?: {
      travel?: {
        departureCity?: string
        otherCity?: string
        stayCity?: string[]
        arrivalDate?: string
        departureDate?: string
        transport?: {
          needed: boolean
          flightTicket: boolean
          localTransport: boolean
        }
      }
      accommodation?: {
        needed: boolean
        type: string
        otherType: string
      }
      additionalServices?: {
        meals: boolean
        tourism: boolean
        simCard: boolean
        other: string
      }
      administrativeAssistance?: {
        visaAssistance: boolean
        passportRenewal: boolean
        travelInsurance: boolean
        other: string
      }
    }
    additionalServices?: {
      tourism?: {
        wanted: boolean
        package: string
      }
      communication?: {
        wifi: boolean
        simCard: boolean
      }
      transportation?: {
        needed: boolean
        type: string
      }
      other?: {
        description: string
      }
    }
    accompanyingPersons?: Array<{
      fullName: string
      age: string
      relationship: string
      needsVisa: boolean
    }>
  }
  created_at: string
  updated_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [stepFilter, setStepFilter] = useState<string>("all")

  // Mock fetch function - replace with your actual API call
  const fetchRegistrations = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch data from Supabase
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      // Ensure the data matches the Registration interface
      setRegistrations(data as Registration[])
      setFilteredRegistrations(data as Registration[])
    } catch (err) {
      console.error("Error fetching registrations:", err)
      setError("Failed to fetch registration data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])

  // Filter registrations based on search term and step filter
  useEffect(() => {
    let filtered = [...registrations]

    // Apply step filter
    if (stepFilter !== "all") {
      const stepNumber = Number.parseInt(stepFilter)
      filtered = filtered.filter((reg) => reg.current_step === stepNumber)
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((reg) => {
        const fullName = reg.form_data.personalInfo?.fullName?.toLowerCase() || ""
        const email = reg.form_data.personalInfo?.email?.toLowerCase() || ""
        const userId = reg.user_id.toLowerCase()

        return fullName.includes(term) || email.includes(term) || userId.includes(term)
      })
    }

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        let aValue, bValue

        if (sortConfig.key === "fullName") {
          aValue = a.form_data.personalInfo?.fullName || ""
          bValue = b.form_data.personalInfo?.fullName || ""
        } else if (sortConfig.key === "email") {
          aValue = a.form_data.personalInfo?.email || ""
          bValue = b.form_data.personalInfo?.email || ""
        } else if (sortConfig.key === "created_at") {
          aValue = new Date(a.created_at).getTime()
          bValue = new Date(b.created_at).getTime()
        } else if (sortConfig.key === "current_step") {
          aValue = a.current_step
          bValue = b.current_step
        } else {
          aValue = a[sortConfig.key as keyof Registration]
          bValue = b[sortConfig.key as keyof Registration]
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredRegistrations(filtered)
  }, [registrations, searchTerm, sortConfig, stepFilter])

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
  }

  // Toggle row expansion
  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null)
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (file.type !== "application/json") {
      setUploadError("Please upload a JSON file")
      return
    }

    setUploadedFile(file)
  }

  // Process uploaded file
  const processUploadedFile = () => {
    if (!uploadedFile) {
      setUploadError("No file selected")
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string)

        // Here you would typically send this data to your API
        // For demo purposes, we'll just add it to our local state
        const newRegistration: Registration = {
          id: `temp-${Date.now()}`,
          user_id: `temp-user-${Date.now()}`,
          current_step: 1,
          form_data: jsonData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        setRegistrations((prev) => [...prev, newRegistration])
        setUploadDialogOpen(false)
        setUploadedFile(null)
      } catch (err) {
        console.error("Error parsing JSON:", err)
        setUploadError("Invalid JSON format")
      }
    }

    reader.readAsText(uploadedFile)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm")
    } catch (e) {
      return dateString
    }
  }

  // Get registration status badge
  const getStatusBadge = (step: number) => {
    if (step >= 7) {
      return <Badge className="bg-green-500">Completed</Badge>
    } else if (step >= 4) {
      return <Badge className="bg-amber-500">In Progress</Badge>
    } else {
      return <Badge className="bg-blue-500">Started</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Dashboard Administrateur
          </h1>
          <p className="text-muted-foreground">Gérez et visualisez les données d&apos;inscription des utilisateurs</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={fetchRegistrations} disabled={loading} className="flex items-center gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Actualiser
          </Button>

          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <FileUp className="h-4 w-4" />
                Importer JSON
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importer des données JSON</DialogTitle>
                <DialogDescription>
                  Téléchargez un fichier JSON contenant les données d&apos;inscription d&apos;un utilisateur.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="json-file">Fichier JSON</Label>
                  <Input id="json-file" type="file" accept=".json" onChange={handleFileUpload} />
                  {uploadedFile && (
                    <p className="text-sm text-muted-foreground">Fichier sélectionné: {uploadedFile.name}</p>
                  )}
                  {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={processUploadedFile} disabled={!uploadedFile}>
                  Importer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Inscriptions des Utilisateurs</CardTitle>
          <CardDescription>{filteredRegistrations.length} inscription(s) trouvée(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom, email ou ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={stepFilter} onValueChange={setStepFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par étape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les étapes</SelectItem>
                  {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                    <SelectItem key={step} value={step.toString()}>
                      Étape {step}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Chargement des données...</p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucune inscription trouvée.</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="w-[80px]">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("id")}>
                        ID
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("fullName")}>
                        Nom
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("email")}>
                        Email
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleSort("current_step")}
                      >
                        Étape
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("created_at")}>
                        Date de création
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <React.Fragment key={registration.id}>
                      <TableRow>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => toggleRowExpansion(registration.id)}>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${expandedRows[registration.id] ? "rotate-180" : ""}`}
                            />
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{registration.id}</TableCell>
                        <TableCell>{registration.form_data.personalInfo?.fullName || "N/A"}</TableCell>
                        <TableCell>{registration.form_data.personalInfo?.email || "N/A"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={(registration.current_step / 7) * 100} className="h-2 w-16" />
                            <span>{registration.current_step}/7</span>
                            {getStatusBadge(registration.current_step)}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(registration.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                              <DropdownMenuItem>Modifier</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>

                      {expandedRows[registration.id] && (
                        <TableRow>
                          <TableCell colSpan={7} className="p-0 border-t-0">
                            <div className="p-4 bg-muted/30">
                              <Tabs defaultValue="personal" className="w-full">
                                <TabsList className="mb-4">
                                  <TabsTrigger value="personal">Informations Personnelles</TabsTrigger>
                                  <TabsTrigger value="tickets">Billets</TabsTrigger>
                                  <TabsTrigger value="travel">Voyage & Hébergement</TabsTrigger>
                                  <TabsTrigger value="companions">Accompagnateurs</TabsTrigger>
                                  <TabsTrigger value="json">JSON Complet</TabsTrigger>
                                </TabsList>

                                <TabsContent value="personal" className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {registration.form_data.personalInfo && (
                                      <>
                                        <Card>
                                          <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">
                                              Informations de Contact
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Nom:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.fullName || "N/A"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Email:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.email || "N/A"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Téléphone:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.phone || "N/A"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Genre:</span>
                                              <span className="font-medium capitalize">
                                                {registration.form_data.personalInfo.gender || "N/A"}
                                              </span>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Localisation</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Pays:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.country || "N/A"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Ville:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.city || "N/A"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Nationalité:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.nationality || "N/A"}
                                              </span>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Identification</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Numéro d&apos;ID:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.idNumber || "N/A"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Date de naissance:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.birthDate
                                                  ? formatDate(registration.form_data.personalInfo.birthDate)
                                                  : "N/A"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Date d&apos;expiration ID:</span>
                                              <span className="font-medium">
                                                {registration.form_data.personalInfo.idExpiryDate
                                                  ? formatDate(registration.form_data.personalInfo.idExpiryDate)
                                                  : "N/A"}
                                              </span>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </>
                                    )}
                                  </div>
                                </TabsContent>

                                <TabsContent value="tickets" className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {registration.form_data.tickets && (
                                      <>
                                        <Card>
                                          <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">
                                              Informations sur les Billets
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Billets nécessaires:</span>
                                              <span className="font-medium">
                                                {registration.form_data.tickets.needed ? "Oui" : "Non"}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Catégorie:</span>
                                              <span className="font-medium uppercase">
                                                {registration.form_data.tickets.category || "N/A"}
                                              </span>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        {registration.form_data.tickets.matches && (
                                          <Card>
                                            <CardHeader className="pb-2">
                                              <CardTitle className="text-sm font-medium">Matchs Sélectionnés</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Phase de groupes:</span>
                                                <span className="font-medium">
                                                  {registration.form_data.tickets.matches.groupStage ? "Oui" : "Non"}
                                                </span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Huitièmes de finale:</span>
                                                <span className="font-medium">
                                                  {registration.form_data.tickets.matches.roundOf16 ? "Oui" : "Non"}
                                                </span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Quarts de finale:</span>
                                                <span className="font-medium">
                                                  {registration.form_data.tickets.matches.quarterFinal ? "Oui" : "Non"}
                                                </span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Demi-finales:</span>
                                                <span className="font-medium">
                                                  {registration.form_data.tickets.matches.semiFinal ? "Oui" : "Non"}
                                                </span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Finale:</span>
                                                <span className="font-medium">
                                                  {registration.form_data.tickets.matches.final ? "Oui" : "Non"}
                                                </span>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        )}

                                        {registration.form_data.payment && (
                                          <Card>
                                            <CardHeader className="pb-2">
                                              <CardTitle className="text-sm font-medium">
                                                Informations de Paiement
                                              </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Méthode:</span>
                                                <span className="font-medium capitalize">
                                                  {registration.form_data.payment.method || "N/A"}
                                                </span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Versements:</span>
                                                <span className="font-medium">
                                                  {registration.form_data.payment.installments || "N/A"}
                                                </span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Conditions acceptées:</span>
                                                <span className="font-medium">
                                                  {registration.form_data.payment.termsAccepted ? "Oui" : "Non"}
                                                </span>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </TabsContent>

                                <TabsContent value="travel" className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {registration.form_data.stayOrganization?.accommodation && (
                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-sm font-medium">Hébergement</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Hébergement nécessaire:</span>
                                            <span className="font-medium">
                                              {registration.form_data.stayOrganization.accommodation.needed
                                                ? "Oui"
                                                : "Non"}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Type:</span>
                                            <span className="font-medium capitalize">
                                              {registration.form_data.stayOrganization.accommodation.type || "N/A"}
                                            </span>
                                          </div>
                                          {registration.form_data.stayOrganization.accommodation.otherType && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Autre type:</span>
                                              <span className="font-medium">
                                                {registration.form_data.stayOrganization.accommodation.otherType}
                                              </span>
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>
                                    )}

                                    {registration.form_data.stayOrganization?.travel && (
                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-sm font-medium">Voyage</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Ville de départ:</span>
                                            <span className="font-medium">
                                              {registration.form_data.stayOrganization.travel.departureCity || "N/A"}
                                            </span>
                                          </div>
                                          {registration.form_data.stayOrganization.travel.otherCity && (
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Autre ville:</span>
                                              <span className="font-medium">
                                                {registration.form_data.stayOrganization.travel.otherCity}
                                              </span>
                                            </div>
                                          )}
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Date d&apos;arrivée:</span>
                                            <span className="font-medium">
                                              {registration.form_data.stayOrganization.travel.arrivalDate
                                                ? formatDate(registration.form_data.stayOrganization.travel.arrivalDate)
                                                : "N/A"}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Date de départ:</span>
                                            <span className="font-medium">
                                              {registration.form_data.stayOrganization.travel.departureDate
                                                ? formatDate(
                                                    registration.form_data.stayOrganization.travel.departureDate,
                                                  )
                                                : "N/A"}
                                            </span>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    )}

                                    {registration.form_data.stayOrganization?.additionalServices && (
                                      <Card>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-sm font-medium">Services Additionnels</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center gap-2">
                                              <Badge
                                                variant={
                                                  registration.form_data.stayOrganization.additionalServices.meals
                                                    ? "default"
                                                    : "outline"
                                                }
                                              >
                                                Repas
                                              </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Badge
                                                variant={
                                                  registration.form_data.stayOrganization.additionalServices.tourism
                                                    ? "default"
                                                    : "outline"
                                                }
                                              >
                                                Tourisme
                                              </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Badge
                                                variant={
                                                  registration.form_data.stayOrganization.additionalServices.simCard
                                                    ? "default"
                                                    : "outline"
                                                }
                                              >
                                                Carte SIM
                                              </Badge>
                                            </div>
                                            {registration.form_data.stayOrganization.additionalServices.other && (
                                              <div className="col-span-2 mt-2">
                                                <span className="text-muted-foreground">Autre:</span>
                                                <p className="text-sm">
                                                  {registration.form_data.stayOrganization.additionalServices.other}
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    )}
                                  </div>
                                </TabsContent>

                                <TabsContent value="companions" className="space-y-4">
                                  {registration.form_data.accompanyingPersons &&
                                  registration.form_data.accompanyingPersons.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {registration.form_data.accompanyingPersons.map((person, index) => (
                                        <Card key={index}>
                                          <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">
                                              Accompagnateur {index + 1}: {person.fullName}
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Âge:</span>
                                              <span className="font-medium">{person.age}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Relation:</span>
                                              <span className="font-medium">{person.relationship}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Besoin de visa:</span>
                                              <span className="font-medium">{person.needsVisa ? "Oui" : "Non"}</span>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-center py-4">
                                      <p className="text-muted-foreground">Aucun accompagnateur enregistré.</p>
                                    </div>
                                  )}
                                </TabsContent>

                                <TabsContent value="json">
                                  <Card>
                                    <CardContent className="pt-6">
                                      <Collapsible>
                                        <CollapsibleTrigger asChild>
                                          <Button variant="outline" className="flex items-center gap-2 mb-2">
                                            <ChevronDown className="h-4 w-4" />
                                            Afficher le JSON complet
                                          </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                          <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">
                                            {JSON.stringify(registration.form_data, null, 2)}
                                          </pre>
                                        </CollapsibleContent>
                                      </Collapsible>
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Affichage de {filteredRegistrations.length} sur {registrations.length} inscriptions
          </div>
          {/* Pagination could be added here */}
        </CardFooter>
      </Card>
    </div>
  )
}

