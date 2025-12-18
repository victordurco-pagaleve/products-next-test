import { productsService } from "@/lib/services/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/product-image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

export default async function ProductDetailsPage({
  params,
  searchParams,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-destructive/10 rounded-lg">
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Produto não encontrado
          </h2>
          <p className="text-muted-foreground mb-4">
            ID do produto não foi fornecido.
          </p>
          <Link href="/products/client-side">
            <Button>Voltar para produtos</Button>
          </Link>
        </div>
      </div>
    );
  }

  let product;
  let error = null;

  try {
    product = await productsService.getById(Number(id));
  } catch (err) {
    error = err instanceof Error ? err.message : "Erro ao carregar produto";
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-destructive/10 rounded-lg">
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Erro ao carregar produto
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/products/client-side"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para produtos
        </Link>

        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                  {product.images[0] && (
                    <ProductImage
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      fallback="https://placehold.co/600x600?text=No+Image"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(1, 5).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square relative bg-muted rounded-lg overflow-hidden"
                      >
                        <ProductImage
                          src={image}
                          alt={`${product.title} - ${index + 2}`}
                          className="w-full h-full object-cover"
                          fallback="https://placehold.co/150x150?text=No+Image"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-3">{product.category.name}</Badge>
                  <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                  <p className="text-5xl font-bold text-primary mb-6">
                    ${product.price}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="border-t pt-6 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>ID do Produto:</span>
                    <span className="font-medium text-foreground">
                      {product.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Categoria:</span>
                    <span className="font-medium text-foreground">
                      {product.category.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Criado em:</span>
                    <span className="font-medium text-foreground">
                      {new Date(product.creationAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Atualizado em:</span>
                    <span className="font-medium text-foreground">
                      {new Date(product.updatedAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
