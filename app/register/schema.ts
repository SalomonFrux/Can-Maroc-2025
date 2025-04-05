// app/register/schema.ts
import { z } from "zod";

export const formSchema = z.object({
  // Auth fields (added to your existing schema)
  // auth: z.object({
  //   email: z.string().email("Email invalide"),
  //   password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  //   confirmPassword: z.string().min(1, "La confirmation est requise")
  // }).refine(data => data.password === data.confirmPassword, {
  //   message: "Les mots de passe ne correspondent pas",
  //   path: ["confirmPassword"]
  // }),

 personalInfo: z.object({
    fullName: z.string().min(2, "Le nom complet est requis"),
    birthDate: z.date({
      required_error: "La date de naissance est requise",
    }),
    gender: z.enum(["male", "female"], {
      required_error: "Le genre est requis",
    }),
    nationality: z.string().min(2, "La nationalité est requise"),
    idNumber: z.string().min(2, "Le numéro de CNI/passeport est requis"),
    idExpiryDate: z.date({
      required_error: "La date d'expiration est requise",
    }),
    phone: z.string().min(8, "Le numéro de téléphone est requis"),
    email: z.string().email("Email invalide").optional(),
    city: z.string().min(2, "La ville est requise"),
    country: z.string().min(2, "Le pays est requis"),
    supportedTeam: z.object({
      supports: z.boolean(),
      teamName: z.string().optional(),
    }),
  }),
  stayOrganization: z.object({
    administrativeAssistance: z.object({
      visaAssistance: z.boolean().default(false),
      passportRenewal: z.boolean().default(false),
      travelInsurance: z.boolean().default(false),
      other: z.string().optional(),
    }),
    travel: z.object({
      departureCity: z.string().min(2, "La ville de départ est requise"),
      arrivalDate: z.date({
        required_error: "La date d'arrivée est requise",
      }),
      departureDate: z.date({
        required_error: "La date de départ est requise",
      }),
      stayCity: z.array(z.enum(["casablanca", "rabat", "marrakech", "other"])),
      otherCity: z.string().optional(),
      transport: z.object({
        needed: z.boolean(),
        flightTicket: z.boolean().optional(),
        localTransport: z.boolean().optional(),
      }),
    }),
    accommodation: z.object({
      needed: z.boolean(),
      type: z.enum(["hotel", "apartment", "shared", "other"]).optional(),
      otherType: z.string().optional(),
    }),
    additionalServices: z.object({
      meals: z.boolean().default(false),
      tourism: z.boolean().default(false),
      simCard: z.boolean().default(false),
      other: z.string().optional(),
    }),
  }),
  tickets: z.object({
    needed: z.boolean(),
    matches: z.object({
      groupStage: z.boolean().default(false),
      roundOf16: z.boolean().default(false),
      quarterFinal: z.boolean().default(false),
      semiFinal: z.boolean().default(false),
      final: z.boolean().default(false),
    }).optional(),
    category: z.enum(["cat1", "cat2", "vip"]).optional(),
  }).optional(),
  additionalServices: z.object({
    tourism: z.object({
      wanted: z.boolean().default(false),
      package: z.enum(["cultural", "desert", "coastal", "imperial"]).optional(),
    }),
    transportation: z.object({
      needed: z.boolean().default(false),
      type: z.enum(["private", "shared", "rental"]).optional(),
    }),
    communication: z.object({
      simCard: z.boolean().default(false),
      wifi: z.boolean().default(false),
    }),
    other: z.object({
      description: z.string().optional(),
    }),
  }).optional(),
  accompanyingPersons: z.array(
    z.object({
      fullName: z.string().min(2, "Le nom complet est requis"),
      age: z.string().min(1, "L'âge est requis"),
      relationship: z.string().min(2, "Le lien de parenté est requis"),
      needsVisa: z.boolean().default(false),
    })
  ).optional(),
  payment: z.object({
    method: z.enum(["card", "transfer", "mobile"]),
    card: z.object({
      number: z.string().optional(),
      expiry: z.string().optional(),
      cvv: z.string().optional(),
    }).optional(),
    installments: z.enum(["1", "2", "3"]),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions générales",
    }),
  }).optional(),
});


export type FormSchema = z.infer<typeof formSchema>;