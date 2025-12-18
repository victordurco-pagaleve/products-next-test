import axios from "axios";
import { Product } from "../types/product";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  timeout: 10000,
});

export const productsService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<Product> {
    const response = await api.get<Product>(`/products/slug/${slug}`);
    return response.data;
  },
};
