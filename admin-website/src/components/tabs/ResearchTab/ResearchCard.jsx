import React from 'react';
import { Button } from "@mui/material";

const ResearchCard = ({ research, onEdit, onDelete }) => {
    return (
      <div className="p-6 border border-gray-200 rounded-lg shadow-md">
        <h2 className="mb-3 text-xl font-bold text-gray-800">{research.title}</h2>
        <p className="mb-4 text-sm text-gray-600">{research.year} - {research.type}</p>
        <p className="mb-4 text-gray-600">{research.description}</p>
        
        {/* Link */}
        <div className="mb-4">
        <Button
          variant="contained"
          color="secondary"
          href={research.doi}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </Button>
      </div>
        
        {/* Action buttons */}
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={() => onEdit(research)}
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(research._id)}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  export default ResearchCard;
  