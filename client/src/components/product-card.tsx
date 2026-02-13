import { Link } from "wouter";
import type { Product } from "@/lib/products";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
  highlighted?: boolean;
}

export default function ProductCard({ product, index = 0, highlighted }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card
        className={`group relative overflow-visible border-0 bg-transparent ${
          highlighted ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
        }`}
        data-testid={`card-product-${product.id}`}
      >
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-muted cursor-pointer">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge variant="default" className="text-[10px]" data-testid={`badge-new-${product.id}`}>
                  New
                </Badge>
              )}
              {product.stock < 5 && (
                <Badge variant="destructive" className="text-[10px]" data-testid={`badge-low-stock-${product.id}`}>
                  Only {product.stock} left
                </Badge>
              )}
            </div>

            {highlighted && (
              <div className="absolute top-2 right-2">
                <Badge className="text-[10px] gap-1" data-testid={`badge-sophia-${product.id}`}>
                  <Sparkles className="w-3 h-3" />
                  Sophia Recommends
                </Badge>
              </div>
            )}

            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                data-testid={`button-quick-add-${product.id}`}
              >
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Link>

        <div className="mt-3 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-sm font-medium text-foreground leading-tight cursor-pointer" data-testid={`text-product-name-${product.id}`}>
                {product.name}
              </h3>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground capitalize">{product.subcategory}</p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-foreground" data-testid={`text-product-price-${product.id}`}>
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-xs text-muted-foreground">{product.rating}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
