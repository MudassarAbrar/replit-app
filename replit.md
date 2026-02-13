# The Shopkeeper - AI-Powered Fashion E-Commerce

## Overview
"The Shopkeeper" is an AI-powered fashion e-commerce platform featuring Sophia, an intelligent personal stylist chatbot. Built for the Softronix 4.0 hackathon by Team AgentX.

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Express (minimal - user's real backend is in Supabase)
- **Routing**: wouter
- **State Management**: Local React state + custom cart store
- **AI Chat**: Client-side Sophia chat with keyword-based responses (ready for Gemini/OpenAI integration)

## Project Structure
```
client/src/
  App.tsx              - Main app with routing, cart drawer, chat panel state
  pages/
    home.tsx           - Landing page with hero, featured products, categories
    shop.tsx           - Product grid with filters (category, price, sort)
    product-detail.tsx - Full product page with size/color selection
    not-found.tsx      - 404 page
  components/
    header.tsx         - Fixed navigation header with theme toggle, cart, chat buttons
    product-card.tsx   - Reusable product card component
    cart-drawer.tsx     - Slide-out shopping cart
    chat-panel.tsx     - Sophia AI chat slide-out panel
    ui/                - shadcn/ui components
  lib/
    products.ts        - Product data model, catalog, and filter/search utilities
    cart-store.ts      - Global cart state management
    theme-provider.tsx - Dark/light theme toggle
    queryClient.ts     - TanStack Query client
    utils.ts           - Utility functions

client/public/images/
  hero-main.png        - Hero banner image
  hero-collection.png  - Collection showcase banner
  products/            - 18 product images (fashion photography style)

server/
  routes.ts            - Minimal health check endpoint
  storage.ts           - In-memory storage (placeholder)
  index.ts             - Express server entry point
```

## Design System
- **Theme**: Luxury fashion - warm gold primary (HSL 38 75% 55%), dark backgrounds
- **Fonts**: Plus Jakarta Sans (sans), Playfair Display (serif), JetBrains Mono (mono)
- **Dark mode default**: Yes
- **Color approach**: Warm tones with gold accents

## Key Features
1. Landing page with dramatic hero section and featured products
2. Shop page with category/price/sort filtering
3. Product detail page with size/color picker and add-to-cart
4. Slide-out cart drawer with quantity management
5. Sophia AI chat panel with product recommendations and discount negotiation
6. Dark/light theme toggle
7. Responsive design (mobile-first)

## Recent Changes
- 2026-02-13: Initial build - full frontend with 18 fashion products, all pages, Sophia chat
