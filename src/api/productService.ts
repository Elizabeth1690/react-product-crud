import { Product } from "../types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  return data.map((item: any) => ({
    id: item.id,
    codigo: item.id,
    nombre: item.title,
    descripcion: item.description,
    cantidad: Math.floor(Math.random() * 100) + 1,
    creacion: new Date().toISOString(),
  }));
};
