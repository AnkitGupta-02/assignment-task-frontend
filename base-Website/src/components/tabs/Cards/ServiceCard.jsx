import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-md">
      <h2 className="mb-3 text-xl font-bold text-gray-800">
        {service.category}
      </h2>
      <p className="mb-4 text-gray-600">{service.description}</p>

      {/* Sub-services summary */}
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">Sub Services</h3>
        <ul className="pl-5 space-y-1 list-disc">
          {service.sub_services.map((subService, index) => (
            <li key={index} className="text-gray-700">
              <div>{subService.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;
