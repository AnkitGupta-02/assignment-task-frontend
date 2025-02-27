import React, { useCallback, useEffect, useState } from "react";
import ServiceCard from "./Cards/ServiceCard";
import { getService } from "../../apis/getData-api";
import io from "socket.io-client";
const socket = io("http://localhost:8000"); // Connect to backend

const ServicesTab = () => {
  const [data, setData] = useState([]);
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

   // Listen for real-time updates
   useEffect(() => {
    socket.on("service-updated", (updatedService) => {
      setData((prevServices) => {
        const existingServiceIndex = prevServices.findIndex(
          (s) => s._id === updatedService._id
        );
        if (existingServiceIndex !== -1) {
          // Update existing service
          const updatedServices = [...prevServices];
          updatedServices[existingServiceIndex] = updatedService;
          return updatedServices;
        } else {
          // Add new service
          return [...prevServices, updatedService];
        }
      });
    });

    socket.on("service-deleted", (deletedServiceId) => {
      setData((prevServices) =>
        prevServices.filter((s) => s._id !== deletedServiceId)
      );
    });

    return () => {
      socket.off("service-updated");
      socket.off("service-deleted");
    };
  }, []);


  return (
    <div className="container p-6 mx-auto">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      )}
      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;
