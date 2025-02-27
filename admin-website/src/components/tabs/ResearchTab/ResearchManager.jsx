import React, { useCallback, useEffect, useState } from "react";
import ResearchCard from "./ResearchCard";
import CreateResearchForm from "./CreateResearchForm";
import EditResearchForm from "./EditResearchForm";
import {
  deleteResearch,
  getResearch,
  createResearch,
  updateResearch,
} from "../../../apis/Research-api";

const ResearchManager = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentResearch, setCurrentResearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await getResearch();
      setData(list);
    } catch (error) {
      console.error("Error fetching research:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle editing a research
  const handleEdit = (research) => {
    setCurrentResearch(research);
    setIsFormVisible(true);
  };

  // Handle creating a new research
  const handleCreate = () => {
    setCurrentResearch(null);
    setIsFormVisible(true);
  };

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Determine if this is an update or create operation
      if (currentResearch) {
       
        await updateResearch(currentResearch._id, formData );
      } else {
        await createResearch(formData);
      }

      // Refresh the data after successful operation
      await fetchData();

      // Close the form after successful submission
      setIsFormVisible(false);
      setCurrentResearch(null);
    } catch (error) {
      console.error("Error saving research:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle research deletion
  const handleDelete = async (researchId) => {
    setIsLoading(true);
    try {
      await deleteResearch(researchId);
      // Refresh the data after successful deletion
      await fetchData();
    } catch (error) {
      console.error("Error deleting research:", error);
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
          Research Management
        </h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Research
        </button>
      </div>

      {/* Research Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((research, index) => (
          <ResearchCard
            key={index}
            research={research}
            onEdit={() => handleEdit(research)}
            onDelete={() => handleDelete(research._id)}
          />
        ))}
      </div>

      {/* Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl max-h-screen p-6 overflow-y-auto bg-white rounded-lg">
            {currentResearch ? (
              <EditResearchForm
              research={currentResearch}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormVisible(false);
                  setCurrentResearch(null);
                }}
              />
            ) : (
              <CreateResearchForm
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormVisible(false);
                  setCurrentResearch(null);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchManager;
