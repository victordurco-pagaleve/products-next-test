"use client"

import { Product } from "@/lib/types/product"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "./card"
import { Button } from "./button"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      key={product.id}
      className="overflow-hidden hover:shadow-lg transition-shadow"
    >
    <div className="aspect-square relative bg-muted">
      {product.images[0] && (
        <img
          src={product.images[0]}
          width={400}
          height={400}
          alt={product.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x400?text=No+Image"
          }}
        />
      )}
    </div>

    <CardHeader>
      <CardTitle className="text-lg line-clamp-2">
        {product.title}
      </CardTitle>

      <CardDescription className="line-clamp-2">
        {product.description}
      </CardDescription>
    </CardHeader>

    <CardFooter className="justify-between">
      <span className="text-2xl font-bold text-primary">
        ${product.price}
      </span>
      <Button variant="outline" className="cursor-pointer">
        Detalhes
      </Button>
    </CardFooter>
  </Card>
  )
}