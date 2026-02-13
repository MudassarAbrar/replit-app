import { Link, useLocation } from "wouter";
import { ShoppingBag, MessageCircle, Sun, Moon, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { useCart } from "@/lib/cart-store";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onCartOpen: () => void;
  onChatOpen: () => void;
}

export default function Header({ onCartOpen, onChatOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=clothing", label: "Clothing" },
    { href: "/shop?category=footwear", label: "Footwear" },
    { href: "/shop?category=accessories", label: "Accessories" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" data-testid="link-home">
            <span className="font-serif text-xl font-bold tracking-wide text-foreground">
              THE SHOPKEEPER
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={onChatOpen}
              data-testid="button-chat-toggle"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={onCartOpen}
              className="relative"
              data-testid="button-cart-toggle"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center" data-testid="text-cart-count">
                  {itemCount}
                </span>
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      location === link.href
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
