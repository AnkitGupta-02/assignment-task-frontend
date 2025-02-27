import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CreateProductForm from "./CreateProductForm";
import EditProductForm from "./EditProductForm";
import {
  deleteProduct,
  getProduct,
  createProduct,
  updateProduct,
} from "../../../apis/Products-api";

const ProductManager = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await getProduct();
      setData(list);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle editing a product
  const handleEdit = (product) => {
    console.log(product)
    setCurrentProduct(product);
    setIsFormVisible(true);
  };

  // Handle creating a new product
  const handleCreate = () => {
    setCurrentProduct(null);
    setIsFormVisible(true);
  };

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Determine if this is an update or create operation
      if (currentProduct) {
       
        await updateProduct(currentProduct._id, formData );
      } else {
        await createProduct(formData);
      }

      // Refresh the data after successful operation
      await fetchData();

      // Close the form after successful submission
      setIsFormVisible(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    setIsLoading(true);
    try {
      await deleteProduct(productId);
      // Refresh the data after successful deletion
      await fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container p-6 mx-auto">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Products Management
        </h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Product
        </button>
      </div>

      {/* products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product._id)}
          />
        ))}
      </div>

      {/* Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl max-h-screen p-6 overflow-y-auto bg-white rounded-lg">
            {currentProduct ? (
              <EditProductForm
              product={currentProduct}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormVisible(false);
                  setCurrentProduct(null);
                }}
              />
            ) : (
              <CreateProductForm
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormVisible(false);
                  setCurrentProduct(null);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;