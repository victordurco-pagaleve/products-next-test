"use client"

import { Product } from "@/lib/types/product"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export default function ProductCard({ product }: { product: Product }) {
  const slug = createSlug(product.title)

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
      <Link href={`/products/${slug}?id=${product.id}`}>
        <Button variant="outline" className="cursor-pointer">
          Detalhes
        </Button>
      </Link>
    </CardFooter>
  </Card>
  )
}