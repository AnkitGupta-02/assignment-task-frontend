import React, { useCallback, useEffect, useState } from "react";
import { getProduct } from "../../apis/getData-api";
import ProductCard from "./Cards/ProductCard";

function ProductTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const list = await getProduct();
    setIsLoading(false);
    setData(list);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  return (
    <div className="container p-6 mx-auto">
    {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )}
    {/* Product Grid */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  </div>
  );
}
export default ProductTab;