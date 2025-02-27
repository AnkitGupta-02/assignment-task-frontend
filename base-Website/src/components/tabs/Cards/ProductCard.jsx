import React from 'react';
import { Button } from "@mui/material";

const ProductCard = ({ product}) => {
    return (
      <div className="p-6 border border-gray-200 rounded-lg shadow-md">
        <h2 className="mb-3 text-xl font-bold text-gray-800">{product.name}</h2>
        <p className="mb-4 text-gray-600">{product.description}</p>
         {/* Link */}
         <div className="mb-4">
        <Button
          variant="contained"
          color="secondary"
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </Button>
      </div>
      </div>
    );
  };

  export default ProductCard;