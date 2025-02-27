import React, { useCallback, useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import CreateServiceForm from "./CreateServiceForm";
import EditServiceForm from "./EditServiceForm";
import {
  deleteService,
  getService,
  createService,
  updateService,
} from "../../../apis/Services-api";

const ServicesManager = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await getService();
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

  // Handle editing a service
  const handleEdit = (service) => {
    setCurrentService(service);
    setIsFormVisible(true);
  };

  // Handle creating a new service
  const handleCreate = () => {
    setCurrentService(null);
    setIsFormVisible(true);
  };

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Determine if this is an update or create operation
      if (currentService) {
       
        await updateService(currentService._id, formData );
      } else {
        await createService(formData);
      }

      // Refresh the data after successful operation
      await fetchData();

      // Close the form after successful submission
      setIsFormVisible(false);
      setCurrentService(null);
    } catch (error) {
      console.error("Error saving service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle service deletion
  const handleDelete = async (serviceId) => {
    setIsLoading(true);
    try {
      await deleteService(serviceId);
      // Refresh the data after successful deletion
      await fetchData();
    } catch (error) {
      console.error("Error deleting service:", error);
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
          Services Management
        </h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            onEdit={() => handleEdit(service)}
            onDelete={() => handleDelete(service._id)}
          />
        ))}
      </div>

      {/* Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl max-h-screen p-6 overflow-y-auto bg-white rounded-lg">
            {currentService ? (
              <EditServiceForm
                service={currentService}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormVisible(false);
                  setCurrentService(null);
                }}
              />
            ) : (
              <CreateServiceForm
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormVisible(false);
                  setCurrentService(null);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
