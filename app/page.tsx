import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, MapPin, Calendar, Trophy, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="w-full absolute top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <span className="font-bold text-white text-xl">CAN 2025</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-white/90 hover:text-white transition-colors">
                À propos
              </Link>
              <Link href="/schedule" className="text-white/90 hover:text-white transition-colors">
                Calendrier
              </Link>
              <Link href="/teams" className="text-white/90 hover:text-white transition-colors">
                Équipes
              </Link>
              <Link href="/venues" className="text-white/90 hover:text-white transition-colors">
                Stades
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link href="/login">Se connecter</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white border-none"
              >
                <Link href="/pre-register">S&apos;inscrire</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000')] bg-cover bg-center">
        <div className="min-h-screen bg-gradient-to-b from-black/70 to-black/50 flex flex-col items-center justify-center px-4 pt-16">
          <div className="max-w-4xl text-center relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-red-600 to-green-600 p-px rounded-full">
                  <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full">
                    <Trophy className="h-14 w-14 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="text-white/90 font-medium">Maroc</span>
                <span className="mx-2 text-white/30">|</span>
                <Calendar className="h-5 w-5 text-green-500" />
                <span className="text-white/90 font-medium">2025</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80 mb-6 drop-shadow-md">
              Coupe d&apos;Afrique des Nations 2025
            </h1>

            <div className="flex justify-center mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-white font-semibold mb-10 max-w-3xl mx-auto leading-relaxed tracking-wide font-serif">
              <span className="bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent drop-shadow-sm">
                Faites partie de l&apos;histoire au Maroc. Inscrivez-vous maintenant pour la plus grande célébration du
                football en Afrique.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold border-none shadow-lg px-8 py-6 text-lg rounded-full"
              >
                <Link href="/pre-register" className="flex items-center gap-2">
                  Inscrivez-vous <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold border-none shadow-lg px-8 py-6 text-lg rounded-full"
              >
                <Link href="/login" className="flex items-center gap-2">
                  Connectez-vous <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white border-white/20 hover:border-white/30 font-semibold px-8 py-6 text-lg rounded-full"
              >
                <Link href="/about">Plus d&apos;informations</Link>
              </Button>
            </div>
          </div>

          {/* Floating elements for visual interest */}
          <div className="absolute top-1/4 left-10 hidden lg:block">
            <div className="animate-pulse">
              <Star className="h-6 w-6 text-yellow-400 opacity-60" />
            </div>
          </div>
          <div className="absolute bottom-1/4 right-10 hidden lg:block">
            <div className="animate-pulse delay-300">
              <Star className="h-8 w-8 text-yellow-400 opacity-60" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <span className="text-white/70 text-sm">© 2025 CAN Maroc. Tous droits réservés.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">
                Conditions
              </Link>
              <Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

