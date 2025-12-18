"use client";

import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/lib/services/products";
import { Product } from "@/lib/types/product";
import ProductCard from "@/components/ui/product-card";

export default function ClientSideProductsPage() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => productsService.getAll(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-destructive/10 rounded-lg">
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Erro ao carregar produtos
          </h2>
          <p className="text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Ocorreu um erro ao buscar os produtos. Tente novamente."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Listagem de Produtos (Client-Side)</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
                product={product}
            />
          ))}
        </div>

        {products && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nenhum produto encontrado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
