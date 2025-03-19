import type React from "react";
import { useState } from "react";
import type { Product } from "../types/product";
import Swal from "sweetalert2";

interface ProductFormProps {
  product?: Product;
  onSave: (product: Product) => void;
  onClose: () => void;
  existingProducts: Product[];
}

const defaultProduct: Product = {
  id: 0,
  codigo: 0,
  nombre: "",
  descripcion: "",
  cantidad: 0,
  creacion: new Date().toISOString(),
};

const showErrorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "¡Error!",
    html: `
      <p>${message}</p>
      <button id="goToForm" class="swal2-confirm swal2-styled">Ir al formulario</button>
    `,
    showConfirmButton: false,
    didOpen: () => {
      document.getElementById("goToForm")?.addEventListener("click", () => {
        document
          .getElementById("miFormulario")
          ?.scrollIntoView({ behavior: "smooth" });
        Swal.close();
      });
    },
  });
};

const validateProduct = (product: Product, existingProducts: Product[]) => {
  if (
    !product.codigo ||
    !product.nombre.trim() ||
    !product.descripcion.trim() ||
    product.cantidad === null ||
    product.cantidad === undefined
  ) {
    return "Todos los campos son obligatorios.";
  }

  if (isNaN(product.codigo) || product.codigo <= 0) {
    return "El código debe ser un número positivo.";
  }

  if (
    existingProducts.some(
      (p) => p.codigo === product.codigo && p.id !== product.id
    )
  ) {
    return "El código ingresado ya existe.";
  }

  if (!Number.isInteger(product.cantidad) || product.cantidad < 0) {
    return "La cantidad debe ser un número entero mayor o igual a 0.";
  }

  return null;
};

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onClose,
  existingProducts,
}) => {
  const [formData, setFormData] = useState<Product>(product ?? defaultProduct);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "nombre" && /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(value)) {
      showErrorAlert(
        "El nombre solo puede contener letras, espacios y tildes."
      );
      return;
    }

    if (name === "descripcion" && /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,\.]/.test(value)) {
      showErrorAlert(
        "La descripción solo puede contener letras, espacios, tildes, comas y puntos."
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "codigo" || name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validationError = validateProduct(formData, existingProducts);
      if (validationError) {
        showErrorAlert(validationError);
        return;
      }

      onSave(formData);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        html: `
          <p>${
            product
              ? "Producto actualizado correctamente"
              : "Producto creado correctamente"
          }</p>
          <button id="stayOnPage" class="swal2-confirm swal2-styled">Seguir en Productos</button>
        `,
        showConfirmButton: false,
        didOpen: () => {
          document
            .getElementById("stayOnPage")
            ?.addEventListener("click", () => {
              Swal.close();
            });
        },
      });
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      showErrorAlert("Ocurrió un error inesperado. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <form id="miFormulario" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código
              </label>
              <input
                type="number"
                name="codigo"
                value={formData.codigo || ""}
                onChange={handleChange}
                placeholder="Ingrese el código"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ingrese la descripción"
                rows={3}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad
              </label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad || ""}
                onChange={handleChange}
                placeholder="Ingrese la cantidad"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {product ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
