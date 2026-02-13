# The Shopkeeper - AI-Powered Fashion E-Commerce

## Overview
"The Shopkeeper" is an AI-powered fashion e-commerce platform featuring Sophia, an intelligent personal stylist chatbot. Built for the Softronix 4.0 hackathon by Team AgentX. Design inspired by the Lyria editorial aesthetic (https://lyria-temlis.webflow.io/home/home-v1). Current theme: Eclipsis "Conversational Luxury" with midnight/velvet purple aesthetic.

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
    home.tsx           - Editorial landing page with parallax hero, marquee, scroll reveals
    shop.tsx           - Product grid with scroll animations, filters
    product-detail.tsx - Cinematic product page with editorial labels
    not-found.tsx      - 404 page
  components/
    header.tsx         - Transparent-to-glass header with editorial nav styling
    product-card.tsx   - Product card with hover lift & zoom animations
    cart-drawer.tsx    - Slide-out shopping cart
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
- **Theme**: Eclipsis "Conversational Luxury" - midnight/velvet purple aesthetic
- **Primary**: Sophia-glow purple (HSL 247 75% 64%, #6c5ce7)
- **Secondary**: Confidence-gold (HSL 43 100% 70%, #ffd166) for haggle mode
- **Background**: Midnight (#0a0a12), Velvet cards (#1a0a2e)
- **Fonts**: DM Sans (body/sans), Space Grotesk (headings/serif), JetBrains Mono (mono)
- **Dark mode default**: Yes
- **Color approach**: Deep midnight backgrounds with purple personality, gold accents for deals/haggle
- **Typography**: Editorial headings (Space Grotesk, tight leading, letter-spacing -0.02em), uppercase subheadings (DM Sans, tracking 0.2em)
- **Animations**: Scroll-triggered reveals, parallax hero, marquee tickers, pulse-glow (Sophia alive), hover lift on cards with purple fabric-shadow

## Key CSS Classes
- `.editorial-heading` - Space Grotesk font, tight line-height, negative letter-spacing
- `.editorial-subheading` - DM Sans, uppercase, wide letter-spacing, small size
- `.glass-panel` - Backdrop blur with saturation
- `.glass-panel-purple` - Purple-tinted glassmorphism (24px blur, hsl 263 30% 9% / 0.7)
- `.sophia-glow` - Subtle purple box-shadow (Sophia elements)
- `.sophia-glow-strong` - Intense purple glow
- `.gold-glow` - Gold box-shadow for haggle/deal elements
- `.fabric-shadow` - Purple fabric-drape shadow on product hover
- `.midnight-gradient` - Diagonal gradient from midnight to velvet purple
- `.text-reveal-line` - Overflow hidden container for text reveal animations
- `.marquee-track` - Flex container for infinite scrolling marquee

## Animation System
- `animate-marquee` / `animate-marquee-slow` - Horizontal infinite scroll
- `animate-fade-up` - Fade in from below
- `animate-slide-up` - Slide up with spring easing
- `animate-line-reveal` - Width from 0 to 100%
- `animate-pulse-glow` - 3s infinite pulse for Sophia "alive" indicator
- `animate-float-up` - 0.4s ease-out float entrance
- `animate-shimmer` - 2s background position shift
- `ScrollReveal` component - Scroll-triggered fade-up (used throughout all pages)
- `TextRevealLine` component - Word-by-word text reveal on scroll (hero section)
- Parallax hero image via `useScroll` / `useTransform`
- Transparent-to-glass-purple header transition on scroll

## Key Features
1. Full-viewport parallax hero with staggered text reveal animation
2. Horizontal marquee tickers (Lyria-style)
3. Scroll-triggered section reveals throughout all pages
4. Editorial Sophia CTA section with mock chat preview
5. Quote/testimonial section with editorial typography
6. Dramatic category cards with animated gold line reveals
7. Shop page with scroll-animated product grid and filters
8. Product detail with cinematic entry animations and editorial labels
9. Slide-out cart drawer with quantity management
10. Sophia AI chat panel with product recommendations and haggle mode
11. Transparent-to-glass header (transparent on home, glass on scroll)
12. Dark/light theme toggle
13. Responsive design (mobile-first)

## Recent Changes
- 2026-02-13: Eclipsis retheme - switched from Lyria warm-gold to midnight/velvet purple "Conversational Luxury" aesthetic. New CSS utilities (glass-panel-purple, sophia-glow, fabric-shadow, midnight-gradient, gold-glow). New animations (pulse-glow, float-up, shimmer). All pages restyled with purple glassmorphism header, fabric-shadow product hovers, Sophia personality glow effects.
- 2026-02-13: Lyria-inspired editorial redesign - parallax hero, staggered text reveals, marquee tickers, scroll-triggered animations, transparent-to-glass header, editorial typography throughout all pages
- 2026-02-13: Initial build - full frontend with 18 fashion products, all pages, Sophia chat
