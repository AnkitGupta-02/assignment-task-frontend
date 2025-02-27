import React, { useState } from 'react';

const CreateServiceForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    sub_services: [
      {
        name: "",
        description: "",
        technologies: [],
      }
    ]
  });

  // Handle main form field changes
  const handleMainChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle sub-service changes
  const handleSubServiceChange = (index, field, value) => {
    const updatedSubServices = [...formData.sub_services];
    updatedSubServices[index] = {
      ...updatedSubServices[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      sub_services: updatedSubServices
    });
  };

  // Handle technology changes
  const handleTechChange = (serviceIndex, techString) => {
    const techArray = techString.split(',').map(tech => tech.trim()).filter(tech => tech !== '');
    const updatedSubServices = [...formData.sub_services];
    updatedSubServices[serviceIndex] = {
      ...updatedSubServices[serviceIndex],
      technologies: techArray
    };
    
    setFormData({
      ...formData,
      sub_services: updatedSubServices
    });
  };

  // Add new sub-service
  const addSubService = () => {
    setFormData({
      ...formData,
      sub_services: [
        ...formData.sub_services,
        {
          name: "",
          technologies: [],
          description: ""
        }
      ]
    });
  };

  // Remove a sub-service
  const removeSubService = (index) => {
    const updatedSubServices = formData.sub_services.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sub_services: updatedSubServices
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New Service</h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category Name *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleMainChange}
              required
              placeholder="e.g., Web Development Services"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleMainChange}
              required
              placeholder="Describe your service category..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        {/* Sub-services section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Sub Services</h3>
            <button
              type="button"
              onClick={addSubService}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Service
            </button>
          </div>
          
          {formData.sub_services.map((service, index) => (
            <div key={index} className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-800">Service #{index + 1}</h4>
                {formData.sub_services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubService(index)}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => handleSubServiceChange(index, 'name', e.target.value)}
                    required
                    placeholder="e.g., Frontend Development"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={service?.technologies?.length ? service.technologies.join(', ') : ''}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    placeholder="e.g., React, Angular, Vue.js"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Service Description *
                  </label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleSubServiceChange(index, 'description', e.target.value)}
                    required
                    placeholder="Describe this specific service..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Submit button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateServiceForm;