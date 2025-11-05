mean-auth-app/                          # Root project folder
├── backend/                            # Node/Express API
│   ├── server.js                       # Main server file (Express app, DB connect, routes)
│   ├── .env                            # Environment vars (MONGO_URI, JWT_SECRET, PORT)
│   ├── package.json                    # NPM scripts (start, dev), dependencies
│   ├── package-lock.json               # Auto-generated (commit it)
│   ├── node_modules/                   # Auto-generated (don't commit; run `npm install`)
│   ├── models/                         # Mongoose schemas
│   │   └── User.js                     # User model (schema, bcrypt hooks)
│   └── routes/                         # Express routes
│       └── auth.js                     # Auth routes (register, login, profile with middleware)
└── frontend/                           # Angular app
    ├── src/                            # Angular source
    │   ├── app/                        # App modules/components
    │   │   ├── app.component.html      # Root template (nav + router-outlet)
    │   │   ├── app.component.ts        # Root component
    │   │   ├── app.component.css       # Root styles (nav)
    │   │   ├── app.module.ts           # Imports (HttpClient, Forms, components)
    │   │   ├── app-routing.module.ts   # Routes (login, register, profile)
    │   │   ├── login/                  # Login component
    │   │   │   ├── login.component.ts
    │   │   │   └── login.component.css # Inline styles (or .html if separate)
    │   │   ├── register/               # Register component
    │   │   │   ├── register.component.ts
    │   │   │   └── register.component.css
    │   │   ├── profile/                # Profile component
    │   │   │   ├── profile.component.ts
    │   │   │   └── profile.component.css
    │   │   └── services/               # Services
    │   │       └── auth.service.ts     # API calls (register, login, profile, JWT handling)
    │   ├── assets/                     # Static assets (images, etc.) - empty for now
    │   ├── environments/               # Env configs (environment.ts/prod)
    │   │   ├── environment.ts
    │   │   └── environment.prod.ts
    │   ├── index.html                  # Main HTML entry
    │   ├── main.ts                     # Bootstrap app
    │   ├── polyfills.ts                # Polyfills
    │   ├── styles.css                  # Global styles
    │   └── ... (other Angular boilerplate like angular.json, tsconfig.json)
    ├── angular.json                    # Angular CLI config (build, serve)
    ├── package.json                    # NPM deps (Angular, RxJS, etc.)
    ├── package-lock.json               # Auto-generated
    ├── tsconfig.json                   # TypeScript config
    └── node_modules/                   # Auto-generated (don't commit)