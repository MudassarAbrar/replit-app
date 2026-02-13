import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product-card";
import { getFeaturedProducts, getNewArrivals, products } from "@/lib/products";
import { ArrowRight, Sparkles, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface HomeProps {
  onChatOpen: () => void;
}

export default function Home({ onChatOpen }: HomeProps) {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] flex items-end overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img
            src="/images/hero-main.png"
            alt="Fashion editorial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 text-xs" data-testid="badge-hero-tag">
              AI-Powered Shopping
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight" data-testid="text-hero-title">
              Don't just shop.
              <br />
              <span className="text-primary">Get styled.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-lg leading-relaxed">
              Meet Sophia, your AI personal stylist. Describe what you need in
              plain language and watch as your perfect wardrobe comes together.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link href="/shop">
                <Button className="gap-2" data-testid="button-shop-now">
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="gap-2 bg-white/5 border-white/20 text-white backdrop-blur-sm"
                onClick={onChatOpen}
                data-testid="button-talk-sophia"
              >
                <Sparkles className="w-4 h-4" />
                Talk to Sophia
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
              { icon: Shield, title: "Secure Checkout", desc: "100% protected payment" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" data-testid="section-featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Curated for you</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-featured-title">
                Featured Pieces
              </h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="text-sm text-muted-foreground gap-1" data-testid="link-view-all-featured">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 overflow-hidden" data-testid="section-sophia-cta">
        <div className="absolute inset-0">
          <img
            src="/images/hero-collection.png"
            alt="Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Meet Sophia</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Your AI personal stylist, available 24/7
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Describe your ideal look, negotiate prices, get outfit
              recommendations, and shop entirely through conversation. Sophia
              understands style, occasion, and budget.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Semantic Search",
                "Haggle Mode",
                "Outfit Builder",
                "Voice Shopping",
              ].map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="bg-white/10 text-white/80 border-white/10"
                >
                  {feature}
                </Badge>
              ))}
            </div>
            <Button className="mt-8 gap-2" onClick={onChatOpen} data-testid="button-sophia-cta">
              <Sparkles className="w-4 h-4" />
              Start a Conversation
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20" data-testid="section-new-arrivals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Just dropped</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-new-arrivals-title">
                New Arrivals
              </h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="text-sm text-muted-foreground gap-1" data-testid="link-view-all-new">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card" data-testid="section-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Browse by</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Shop Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Clothing", count: products.filter((p) => p.category === "clothing").length, href: "/shop?category=clothing", image: "/images/products/cashmere-turtleneck.png" },
              { name: "Footwear", count: products.filter((p) => p.category === "footwear").length, href: "/shop?category=footwear", image: "/images/products/chelsea-boots.png" },
              { name: "Accessories", count: products.filter((p) => p.category === "accessories").length, href: "/shop?category=accessories", image: "/images/products/leather-watch.png" },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative aspect-[4/3] rounded-md overflow-hidden cursor-pointer group"
                  data-testid={`card-category-${cat.name.toLowerCase()}`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif text-xl font-bold text-white">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-white/60">{cat.count} items</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-serif text-lg font-bold text-foreground mb-4">
                The Shopkeeper
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered fashion, curated by Sophia.
              </p>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-foreground mb-3">Shop</h5>
              <ul className="space-y-2">
                {["Clothing", "Footwear", "Accessories", "New Arrivals"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground cursor-pointer" data-testid={`link-footer-${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-foreground mb-3">Help</h5>
              <ul className="space-y-2">
                {["FAQs", "Shipping", "Returns", "Contact"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-foreground mb-3">Company</h5>
              <ul className="space-y-2">
                {["About", "Careers", "Press", "Terms"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              Built with AI by Team AgentX for Softronix 4.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
