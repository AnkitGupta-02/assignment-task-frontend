import React, { useCallback, useEffect, useState } from "react";
import ServiceCard from "./Cards/ServiceCard";
import { getService } from "../../apis/getData-api";
import socket from "../../socket";

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

    // Listen for real-time updates from WebSocket
    socket.on("refreshData", (data) => {
      // console.log(data);
      // fetchData(); // Refresh data when an update occurs

      console.log("Received data update:", data);
      // Update your UI accordingly
      setData(data); // Or fetch new data here
    });

    return () => {
      socket.off("refreshData"); // Cleanup on unmount
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
