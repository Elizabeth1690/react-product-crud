import type React from "react";

import type { Product } from "../types/product";
import Swal from "sweetalert2";

interface ProductItemProps {
  data: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás a punto de eliminar el producto "${data.nombre}". Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
      }
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 mb-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{data.nombre}</h3>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Código: {data.codigo}
        </span>
      </div>

      <p className="text-gray-600 mb-3">{data.descripcion}</p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <span className="font-medium mr-1">Cantidad:</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded">
            {data.cantidad}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-1">Creado:</span>
          <span>{new Date(data.creacion).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={onEdit}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
