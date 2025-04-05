::: mermaid
%%{init: {'theme': 'base', 'themeVariables': { 
  'primaryColor': '#f0f9ff',
  'primaryBorderColor': '#0369a1',
  'primaryTextColor': '#075985',
  'lineColor': '#38bdf8',
  'tertiaryColor': '#e0f2fe',
  'tertiaryBorderColor': '#7dd3fc'
}}}%%
flowchart TD
    %% Styling Classes
    classDef userFlow fill:#bae6fd,stroke:#0369a1,stroke-width:2px,color:#0c4a6e
    classDef decision fill:#fef08a,stroke:#ca8a04,stroke-width:2px,color#713f12
    classDef special fill:#fecaca,stroke:#dc2626,stroke-width:2px
    classDef admin fill:#d8b4fe,stroke:#7e22ce,stroke-width:2px
    classDef coms fill:#a7f3d0,stroke:#059669,stroke-width:2px

    %% Main User Flow
    A([("✨ Création demande livraison")]):::userFlow --> B[/"Saisie informations\n(Adresse, colis, contact)"/]:::userFlow
    B --> C{"💳 Paiement sécurisé"}:::userFlow

    %% Courier Search
    C --> D[("🔍 Recherche livreur")]:::userFlow
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

    D --> E{"🚗 Livreur trouvé ?"}:::decision
    E -->|"Non ❌"| D
    E -->|"Oui ✅"| F[("📦 Prise en charge colis")]:::userFlowd

    %% Delivery Process
    F --> G[("🛵 Livraison en cours")]:::userFlow
    G --> H[("📍 Suivi temps réel")]:::userFlow
    H --> I[("✔ Livraison terminée")]:::userFlow

    %% Completion
    I --> J[("📩 Confirmation livraison")]:::userFlow
    J --> K[("⭐ Évaluation service")]:::userFlow

    %% Special Cases
    G -->|"Problème détecté"| L{"🛠 Gestion cas particuliers"}:::special
    L -->|"Absent"| M[("🗓 Reprogrammation")]:::special
    L -->|"Annulation"| N[("💸 Remboursement")]:::special

    %% Communication Subgraph
    subgraph COM["💬 Communication"]
        P["💬 Chat intégré"]:::coms
        Q["🔔 Notifications"]:::coms
        P <--> Q
    end

    %% Admin Subgraph
    subgraph ADMIN["👔 Administration"]
        R["📊 Supervision"]:::admin
        S["⚖ Gestion litiges"]:::admin
        T["📈 Analyse performance"]:::admin
        R --> S --> T
    end

    %% Style Links
    linkStyle 0,1,2,3,4,5,6,7,8,9,10,11,12 stroke:#38bdf8,stroke-width:2px
    linkStyle 13 stroke:#dc2626,stroke-width:2px
:::



::: mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
:::
