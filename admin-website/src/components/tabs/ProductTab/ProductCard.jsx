import React from 'react';
import { Button } from "@mui/material";

const ProductCard = ({ product, onEdit, onDelete }) => {
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

        {/* Action buttons */}
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={() => onEdit(product)}
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  export default ProductCard;
  