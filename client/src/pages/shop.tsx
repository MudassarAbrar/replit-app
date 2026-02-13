import { useState, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import ProductCard from "@/components/product-card";
import { products, filterProducts } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Shop() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialCategory = params.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filteredProducts = useMemo(() => {
    let result = filterProducts({
      category: category || undefined,
      sortBy: sortBy || undefined,
      minPrice: priceRange === "under50" ? 0 : priceRange === "50to100" ? 50 : priceRange === "100to200" ? 100 : priceRange === "over200" ? 200 : undefined,
      maxPrice: priceRange === "under50" ? 50 : priceRange === "50to100" ? 100 : priceRange === "100to200" ? 200 : undefined,
    });

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    return result;
  }, [category, sortBy, priceRange, searchQuery]);

  const activeFilters = [
    category && { key: "category", label: category, clear: () => setCategory("") },
    sortBy && { key: "sort", label: sortBy.replace("_", " "), clear: () => setSortBy("") },
    priceRange && { key: "price", label: priceRange.replace("to", "-").replace("under", "<$").replace("over", ">$"), clear: () => setPriceRange("") },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground" data-testid="text-shop-title">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-9"
              data-testid="input-search-products"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={category || "all"} onValueChange={(v) => setCategory(v === "all" ? "" : v)}>
              <SelectTrigger className="w-[140px]" data-testid="select-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="footwear">Footwear</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy || "default"} onValueChange={(v) => setSortBy(v === "default" ? "" : v)}>
              <SelectTrigger className="w-[150px]" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange || "any"} onValueChange={(v) => setPriceRange(v === "any" ? "" : v)}>
              <SelectTrigger className="w-[140px]" data-testid="select-price">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="under50">Under $50</SelectItem>
                <SelectItem value="50to100">$50 - $100</SelectItem>
                <SelectItem value="100to200">$100 - $200</SelectItem>
                <SelectItem value="over200">Over $200</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-muted-foreground">Active:</span>
            {activeFilters.map((f) => (
              <Badge
                key={f.key}
                variant="secondary"
                className="gap-1 text-xs cursor-pointer capitalize"
                onClick={f.clear}
                data-testid={`badge-filter-${f.key}`}
              >
                {f.label}
                <X className="w-3 h-3" />
              </Badge>
            ))}
            <button
              onClick={() => {
                setCategory("");
                setSortBy("");
                setPriceRange("");
                setSearchQuery("");
              }}
              className="text-xs text-primary ml-1"
              data-testid="button-clear-filters"
            >
              Clear all
            </button>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-foreground mb-1" data-testid="text-no-results">No products found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
