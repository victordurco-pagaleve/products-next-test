"use server"

import { productsService } from "../services/products"
import { Product } from "../types/product"

export async function getProductsAction(): Promise<{
  success: boolean
  data?: Product[]
  error?: string
}> {
  try {
    const products = await productsService.getAll()
    return {
      success: true,
      data: products,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao carregar produtos",
    }
  }
}
