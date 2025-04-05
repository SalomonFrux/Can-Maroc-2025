import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa"; 
import { FaCheck } from "react-icons/fa";  // Font Awesome check icon
import { FaPlane } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";



export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute top-0 left-0 w-full h-32 bg-[#FF6600]/10"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm transition-all hover:shadow-md">
            <FaArrowLeft className="h-5 w-5 mr-2" />
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Vivez la CAN 2025 au Maroc
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une expérience inoubliable vous attend avec notre forfait complet
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF6600] to-[#009933] p-1">
            <div className="bg-white p-8 sm:p-12">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-full">
                  <div className="flex items-center justify-between flex-wrap gap-4 p-6 bg-gradient-to-r from-[#FF6600]/10 to-[#009933]/10 rounded-xl mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Coût Forfaitaire
                    </h2>
                    <p className="text-2xl font-bold text-[#FF6600]">
                      1.500.000 FCFA
                    </p>
                  </div>
                </div>

                <div className="col-span-full">
                  <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                    Nos Services
                  </h2>
                </div>

                {/* Service Cards */}
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#FF6600] p-3 rounded-lg">
                    <FaTrophy className="h-6 w-6 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Assistance administrative</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Demande de visa marocain</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Renouvellement de passeport</span>
                    </li>
                    <li className="flex items-center">
                    <FaCheck className="h-5 w-5 text-green-500" />
                      <span>Assurance voyage</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#009933] p-3 rounded-lg">
                      <FaPlane className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Transport</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Billet d&apos;avion aller-retour</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Déplacements sur place</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#FF6600] p-3 rounded-lg">
                      <FaHotel className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Hébergement</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Réservation d&apos;hôtel</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Location d&apos;appartements</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#009933] p-3 rounded-lg">
                      <FaTicketAlt className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Billetterie</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Tous les matchs souhaités</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Choix de catégorie</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#FF6600] p-3 rounded-lg">
                      <FaTrophy className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Pack Supporter</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Maillot officiel CAN 2025</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Goodies exclusifs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#009933] p-3 rounded-lg">
                      <FaCreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold ml-4">Paiement Flexible</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Multiples moyens de paiement</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheck  className="h-5 w-5 text-[#009933] mr-2" />
                      <span>Paiement en plusieurs fois</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 border-t border-gray-200 pt-8">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-[#FF6600]/10 rounded-full mb-4">
                    <FaEnvelope className="h-6 w-6 text-[#FF6600]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
                  <p className="text-gray-600 mb-8">
                    Besoin d&apos;informations supplémentaires ?<br />
                    Notre équipe est là pour vous accompagner
                  </p>
                  <a 
                    href="mailto:Contact@idealdestination.com" 
                    className="text-[#FF6600] hover:text-[#FF8533] font-semibold text-lg hover:underline"
                  >
                    Salomon.sea@sikso.com: 
                    C'est ma propiété intellectielle 
                  </a>
                </div>

                <div className="flex justify-center mt-12">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#FF6600] hover:bg-[#FF8533] text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/register">S&apos;inscrire maintenant</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}