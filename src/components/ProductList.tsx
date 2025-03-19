import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";
import type { Product } from "../types/product";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [sortKey, setSortKey] = useState<keyof Product | "">("");
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortKey) return 0;
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  const handleOpenModal = (product?: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  const handleSaveProduct = (product: Product) => {
    if (product.id) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Crear Producto
        </button>

        <div className="relative">
          <select
            onChange={(e) => setSortKey(e.target.value as keyof Product)}
            className="appearance-none block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2.5 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Ordenar por...</option>
            <option value="nombre">Nombre</option>
            <option value="cantidad">Cantidad</option>
            <option value="codigo">Código</option>
            <option value="creacion">Fecha de Creación</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">
            No hay productos disponibles. Crea uno nuevo para comenzar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedProducts.map((product) => (
            <ProductItem
              key={product.id}
              data={product}
              onDelete={() => removeProduct(product.id)}
              onEdit={() => handleOpenModal(product)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseModal}
          existingProducts={products}
        />
      )}
    </div>
  );
};

export default ProductList;
