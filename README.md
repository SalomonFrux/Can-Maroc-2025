# SALOMOM CAN 2025

A modern web application built with **Next.js**, **Supabase**, and **shadcn/ui** for managing user registrations, authentication, and admin dashboards. This project is designed to be fully featured and production-ready.

## Features

- **User Authentication**: Secure login and registration using Supabase.
- **Admin Dashboard**: Manage user registrations, view details, and filter data.
- **Responsive UI**: Built with **shadcn/ui** and **Tailwind CSS** for a beautiful and responsive design.
- **Real-Time Data**: Fetch and display data from Supabase in real-time.
- **Custom Hooks**: Reusable hooks for toast notifications and authentication.
- **Form Management**: Multi-step registration forms with validation.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, Lucide React
- **Backend**: Supabase (Authentication, Database, Storage)
- **State Management**: React hooks
- **Styling**: Tailwind CSS, shadcn/ui components

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SALOMOM_CAN2025.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SALOMOM_CAN2025
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

### User Registration
1. Navigate to the registration page.
2. Fill out the multi-step form.
3. Submit the form to create a new user.

### Admin Dashboard
1. Log in as an admin.
2. View and manage user registrations.
3. Filter and sort registrations by step, name, or email.

### Authentication
- **Login**: Use Google or email/password to log in.
- **Logout**: Click the logout button in the account page.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Next.js**: For the powerful React framework.
- **Supabase**: For the backend services.
- **shadcn/ui**: For the beautiful and reusable UI components.
- **Tailwind CSS**: For the utility-first CSS framework.

---

For more details, check out the [Supabase documentation](https://supabase.com/docs) and [Next.js documentation](https://nextjs.org/docs).



```
SALOMOM_CAN2025
├─ .bolt
│  ├─ config.json
│  ├─ ignore
│  └─ prompt
├─ .eslintrc.json
├─ app
│  ├─ about
│  │  └─ page.tsx
│  ├─ account
│  │  └─ page.tsx
│  ├─ admin
│  │  ├─ dashboard
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ auth
│  │  └─ callback
│  │     ├─ page.tsx
│  │     └─ route.ts
│  ├─ confirmation
│  │  └─ page.tsx
│  ├─ css
│  │  └─ ConfirmationPage.module.css
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ login
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ pre-register
│  │  └─ page.tsx
│  └─ register
│     ├─ page.tsx
│     └─ schema.ts
├─ components
│  ├─ admin
│  │  └─ UsersFromDB.tsx
│  ├─ auth
│  │  ├─ AuthForm.tsx
│  │  └─ SessionChecker.tsx
│  ├─ registration
│  │  ├─ accompanying-persons.tsx
│  │  ├─ additional-services.tsx
│  │  ├─ AuthProviderButtons.tsx
│  │  ├─ AuthStep.tsx
│  │  ├─ payment.tsx
│  │  ├─ personal-info.tsx
│  │  ├─ stay-organization.tsx
│  │  ├─ steps.tsx
│  │  ├─ tickets.tsx
│  │  └─ validation.tsx
│  └─ ui
│     ├─ accordion.tsx
│     ├─ alert-dialog.tsx
│     ├─ alert.tsx
│     ├─ aspect-ratio.tsx
│     ├─ avatar.tsx
│     ├─ badge.tsx
│     ├─ breadcrumb.tsx
│     ├─ button.tsx
│     ├─ calendar.tsx
│     ├─ card.tsx
│     ├─ carousel.tsx
│     ├─ chart.tsx
│     ├─ checkbox.tsx
│     ├─ collapsible.tsx
│     ├─ command.tsx
│     ├─ context-menu.tsx
│     ├─ dialog.tsx
│     ├─ drawer.tsx
│     ├─ dropdown-menu.tsx
│     ├─ form.tsx
│     ├─ hover-card.tsx
│     ├─ input-otp.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ menubar.tsx
│     ├─ navigation-menu.tsx
│     ├─ pagination.tsx
│     ├─ popover.tsx
│     ├─ progress.tsx
│     ├─ radio-group.tsx
│     ├─ resizable.tsx
│     ├─ scroll-area.tsx
│     ├─ select.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ skeleton.tsx
│     ├─ slider.tsx
│     ├─ sonner.tsx
│     ├─ switch.tsx
│     ├─ table.tsx
│     ├─ tabs.tsx
│     ├─ textarea.tsx
│     ├─ toast.tsx
│     ├─ toaster.tsx
│     ├─ toggle-group.tsx
│     ├─ toggle.tsx
│     └─ tooltip.tsx
├─ components.json
├─ context_diagram.md
├─ hooks
│  └─ use-toast.ts
├─ lib
│  ├─ supabase-server.ts
│  ├─ supabase.ts
│  └─ utils.ts
├─ mermaid.mmd
├─ middleware.ts
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ supabase
│  ├─ .temp
│  │  └─ cli-latest
│  ├─ config.toml
│  └─ functions
│     ├─ check_existing_email
│     │  ├─ .npmrc
│     │  ├─ deno.json
│     │  └─ index.ts
│     └─ _shared
│        └─ cors.ts
├─ tailwind.config.ts
└─ tsconfig.json

```