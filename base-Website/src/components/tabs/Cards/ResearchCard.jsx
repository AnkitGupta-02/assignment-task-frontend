import React from 'react';
import { Button } from "@mui/material";

const ResearchCard = ({ research}) => {
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
      </div>
    );
  };

  export default ResearchCard;