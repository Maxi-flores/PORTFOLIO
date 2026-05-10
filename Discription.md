=== Current (mono)repo: 

* Powerframe:  "App Hub" 

Main home page for all apps which we have currently Vercel deployed within DNS routing list: 

- Bms.powerframe.online:  

Business Manager System dashboard template https://github.com/Maxi-flores/Powerframe-BMS-V1 

- Crm.powerframe.online: 

Customer Relation Management dashboard template https://github.com/Maxi-flores/Powerframe-CRM 

- Tpr.powerframe.online: 

Time Planner Roadmap dashboard template https://github.com/Maxi-flores/TimePlanner  

- Gms.powerframe.online: 

We will migrate Game Manager System from it ancestor BMS Business Management System, and clone it into our Unity TRT project monorepo. 

Next potential focus For Powerframe will be:  

Domain-agnostic system web/app/game platform  

- #All powerframe apps: 

Currently having .online extension will need to be changed to .dev 

- Trt.Powerframe.online: 

BMS clone at turbo mono repo intergration with Firebase > Business Manager System dashboard template https://github.com/Maxi-flores/Powerframe-BMS-V1 

- WAI.Powerframe.online: 

Becomes an Powerstarter function as coded page feed for an project expert role and showcase  

 

* Sapient KB: Shape connected folder tree: 

2D/3D KnowledgeBass Tree Engine connected for all user dashboards/game/feed/external system detail 

- Skb.Powerframe.online:  

Becomes a plugin feature for designated integrational Powerframe platform   

(KnowledgeBase) - "4D logic Brain/Tree" = https://github.com/Maxi-flores/Sapient 

 

* Powerstarter: Game community and user feed/Growth Journal: 

Auto presentation for game feed as automated projection of all details on display, a spot to show all project data in one place. 

- Powerstarter.online: (soon will be Powerstarter.dev) 

User Web/App project dev game Feed/Pages/Hub > https://github.com/Maxi-flores/PowerStarter 

  

* TheRocketTree (TRT): "Unity3D interface loader" 

- App.TheRocketTree.io - IOS / Android 

TheRocketTree-App = Current main monorepo > https://github.com/Maxi-flores/TheRocketTree-App 

- Web.TheRocketTree.io 

TheRocketTree-Web = Webpage for App engagement/Add links > https://github.com/Maxi-flores/TheRocketTree-Web 

- TheRocketTree.exe 

TheRocketTreeUnity = 3D Unity game engine repo > https://github.com/Maxi-flores/TheRocketTreeUnity 

   

=== Summary current local overview: (not final version) 

* Powerframe Dashboard v1 — Project Summary: 

  

  Powerframe is a domain-agnostic system web application—a React-based dashboard 

  for managing projects, tasks, plans, and organizational workflow. 

                                                                                                     

* Powerframe-hub — Project Summary: 

  

  This is a multi-application system for user imput connectors varies per function: 

  Core Features:  - Authentication (Firebase-based login/password reset) 

  - CRM Dashboard — manage customer data 

  - BMS Dashboard — Web user dashboard interface   

  - TPR Dashboard — Personal project dashboard for Time and roadmap planner   

  - GMS Dashboard — Phone game dashboard interface    

  

  

* Tech Stack: 

  

  - Frontend: React 18, React Router, Vite 

  - Backend: Firebase (auth, Firestore, storage) 

  - Styling: Tailwind CSS + Framer Motion (animations) 

  - Theme system with dark/light mode support 

  - Notification system for user feedback 

  

  Protected routes ensure only authenticated users access the dashboard. Recent commits show work 

  on UI improvements, auth updates, and notifications. 

  

* Sapient-KB v1 — Project Summary: 

  

 A multi-layered "3D File tree" system that connects all project notes/game imput into a 4D interactive knowledge tree visualized in the browser, and creates detailed concept for improvements. 

  Core Function: 

 - Semantic Intelligence Layer 

– Resolves queries across three knowledge domains using 4D coordinate maths 

 - Volumetric Knowledge Model – Represents ideas as nodes in 4D space with semantic distance and topology edges 

 - React Three Fiber 3D Visualization – Real-time interactive tree canvas with domain-specific 

    branching and cross-domain semantic connections (can be more shapes but the base will start from roottree) 

 - Integration Hub – Bridges GMS, 2D growth timeline, and Unity 3D scene payload generation 

 - AI suggestions and improving layer model 

  

* PowerStarter v1 — Project Summary : 

  

  is a React + TypeScript + Vite web application for a portfolio/services website 

  with the following features: 

  

  Core Structure:                                                                                    

  - Multi-page app built with React Router (Home, About, Services, Portfolio, Learn Hub, Contact) 

  - Context-based state management (Theme, Toast notifications, Progress tracking)  - Styled with Tailwind CSS + custom CSS modules                                                    

  - Animations via Framer Motion 

 

  Key Pages: 

  - Home - Landing page 

  - Services - Service offerings 

  - Portfolio - Project showcase with individual project detail pages 

  - Learn Hub - Educational content/modules with module detail pages 

  - Contact - Contact form 

  - About - Company/person information 

  

  The app uses modern React patterns (hooks, context) and includes TypeScript for type safety. It 

  appears to be a professional portfolio/agency website template or starter project with both 

  client-facing content (portfolio, services) and educational content (Learn Hub). 

  

  

* TheRocketTree-App Monorepo v1 — Project Summary: 

  

  Purpose: A full-stack, modular system for processing and visualizing external system state snapshot data with real-time achievement detection. 

  

  Architecture: Turborepo-based monorepo with 4 applications + shared libraries: 

  

  Core Apps: 

  - @trt/powerstarter (Next.js on port 3001) — RootJournal feed app displaying system state 

  transformed into real-time achievement milestones 

  - @trt/app (Next.js) — Main dashboard application 

  - @trt/powerframe — UI framework & component library 

  - @trt/unity-adapter — Integration layer for Unity WebGL engine 

  

  Shared Packages: 

  - @trt/db — Prisma ORM managing system state, projects, transactions 

  - @trt/logic — Achievement detection & feed transformation pipeline 

  - @trt/contracts — Zod validation schemas 

  - @trt/core — Firebase integration (auth, Firestore) 

  - @trt/ui — React component library 

  

  Key Features: 

  - Real-time external system state snapshot ingestion & processing 

  - Achievement detection system (Common/Rare/Legendary tiers) 

  - Prisma-based data persistence 

  - Firebase authentication & storage 

  - Monorepo build orchestration via Turbo pnpm 

  

  Tech Stack: Next.js 15, React 19, TypeScript, Prisma, Firebase, Turbo 

  

  

* TheRocketTree-Web v1 — Project Summary: 

  

    This is TheRocketTree.io — a marketing website for 3D game app and productivity project build tool for new web framework. It's built with modern web technologies featuring: 

  

  Key Sections: 

  - Hero Section — Eye-catching intro with call-to-action buttons 

  - Services — Six core offerings (Web Development –game generated feed, Mobile Apps -supported, Cloud – user data stored, UI/UX responsive and advanced design, 

  Digital Marketing, Connections for 3th party integrations) 

  - Features — TheRocketTree (game for anyone who wants to maintain anything at right pace, and plant the right seeds to grow!) 

  - Game is not unleashed yet — will be soon and keep informed by email 

  - Footer — Links and social media / make account link and pre-save the date 

  

  Technical Details: 

  - Pure HTML/CSS/JavaScript (no frameworks or build tools) 

  - Dark theme with cyan-purple gradient color scheme 

  - Fully responsive design (mobile, tablet, desktop) 

  - Smooth animations, parallax effects, intersection observers 

  - Self-contained in a single index.html file (~1,500 lines) 

  

  The project is clean production-ready code with no external dependencies beyond Font Awesome 

  icons and Google Fonts. 

  

  

* TheRocketTree-Unity v1 — Project Summary: 

Core Purpose: A Unity game project centered on tree variants with configurable game modes, 

presets, and Firebase networking. 

Main Systems:   

Game Mode Manager 

Lifecycle controller that applies different game modes and manages scene state > All user actions kept track as milestone within the PMS first project ecosystem is free and can participate as personal growth path which will be able to merch into different phases based on the project main branch.  

Tree System 

Spawns tree variants from a catalog with growth and material controllers  

Preset System  

Manages preset catalogs for tree variants, camera angles, and lighting configurations  

Firebase Network  

external system Firebase client for cloud connectivity and authentication  

Editor Tools  

Scene builder utility to scaffold MainScene with all required GameObjects  

 

* Architecture: Follows a MonoBehaviour-based design with ScriptableObject catalogs for data, 

including state snapshot logging and debug UI. Organized into Core, Systems, Tree, Network, and 

State Snapshot subsystems. 

  

  * ConceptSHOP 

Main focus on the cloud sharing system inside a shared platform product hub. Whichs opens all type of markets and inventory genre into investment routing, Seller connections, Routing status, logiscal planning and dispatch. Payment may be automatically routed through a banking app generated for automated 

  

=== Core Application functionality: 

  

#Powerframe-GMS > Dashboard  

  

  * Manage projects, tasks, and operational workflows 

  * Visualize system-level system state 

  * Provide control interface for business processes 

  * Integrates with @trt/db for structured data 

  

#Powerframe-Hub > Web/Apps 

  

  * CRM (Customer management system) > Sales tracking and deal pipelines 

  * GMS (Game Management System) > Activity monitoring and reporting 

  * TPS (Time Planner Roadmap) > Firebase-powered authentication and storage  

  * SKB (Sapient Knowledgebase) > Maps knowledge into structured 4D relationships 

  * WAI (Whoami - Portfolio) Accumulates all results from complete Powerframe user data into a project page 

    

#PowerStarter-Hub > Feed/Web platform 

 

  * Displays real-time achievement feed 

  * Transforms state snapshot into meaningful milestones 

  * Provides user feedback loop (growth journal) 

  * Acts as primary interaction interface 

  * Generates insights from TRT game app data  

  * Bridges logic outputs into higher-level meaning  

  

#TheRocketTree-App 

  

  * Processes all user data within custom game dashboard interface > shared Powerframe base platform 

  * Executes transformation pipelines into endpoint Powerframe-apps 

  * Maintains shared packages and architecture and a dual platform operational game structure 

  

#TheRocketTree-Web 

  

  * Presents brand, services, and game overview 

  * Drives user acquisition and engagement 

  * Links into applications ecosystem 

  

* TheRocketTree-Unity 

  

  * Renders interactive 3D environment 

  * Receives and displays project state 

  * Sends gameplay/activity to GMS – will bridge to whole connectivity platform 

  * Syncs with backend via API bridge  

  

#ConceptSHOP 

   

  * Flagship investment platform  

  * Multi-tenant investment platform 

  * Connectors with Shopify and AWS 

  * Shared on distributers inventory stock list 

  * Can function with Powerframe Application & user environment  

  

=== Whole Application governance plan to perfection: 
 

Other side plans to work and proceed on further: 

> Have to plan our whole developer planning in TPR, at meanwhile fix the cloud functions for all the local (deployed) repo's. 

> 3D web Builder at Mucho3D.dev (MCP bridged and Claude or token less ai model).  

Status = Deployed but not fully set operational 

> Dual grid DNS for a slight different core practice based at Flink3D.nl (Contact and ai agent autonomous work planner and back office for a pre-functionality) 

> Will expand both 3D businesses into a different function later 

> Officially launching at licensed tax level with our main DNS mother business page WOMmedia.nl 

> And we have two more niche web shops including Bikerinstinct.com and Dealinstinct.com. Both have to become operational in our licensed environment 

> This Portfolio ideally needs to come out from all game input and bidirectional framework project page 

> We have to look in Polyrepo for optional future microservice integration 
