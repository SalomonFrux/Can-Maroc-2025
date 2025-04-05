```mermaid
flowchart TD
    %% Flux principal utilisateur
    A["Création demande livraison"] --> B["Saisie informations"]
    B --> |"Adresses + infos colis"| C["Paiement sécurisé"]
    
    %% Recherche livreur
    C --> D["Recherche livreur"]
    D --> E{"Livreur trouvé?"}
    E --> |"Non"| D
    
    %% Processus livraison
    E --> |"Oui"| F["Prise en charge colis"]
    F --> G["Livraison en cours"]
    
    %% Suivi et notifications
    G --> |"Notifications"| H["Suivi temps réel"]
    H --> I["Livraison terminée"]
    
    %% Finalisation
    I --> J["Confirmation livraison"]
    J --> K["Évaluation service"]
    
    %% États particuliers
    G --> |"Problème"| L["Gestion cas particuliers"]
    L --> |"Absent"| M["Reprogrammation"]
    L --> |"Annulation"| N["Remboursement"]
    
    %% Communication
    subgraph Communication
        P["Chat intégré"] <--> Q["Notifications"]
    end
    
    %% Interface admin
    subgraph Administration
        R["Supervision"] --> S["Gestion litiges"]
        S --> T["Analyse performance"]
    end