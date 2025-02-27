import React, { useState, useEffect } from "react";

const EditProductForm = ({ product, onSubmit, onCancel }) => {
  
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    link:""
  });

  // Load product data when component mounts or product changes
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  // Handle main form field changes
  const handleMainChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // If no product data is provided, show a message
  if (!product) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <p className="text-red-500">No product data provided for editing.</p>
        <button
          onClick={onCancel}
          className="px-4 py-2 mt-4 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden ID field for updates */}
        <input type="hidden" name="id" value={formData.id || ""} />

        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              name="category"
              value={formData.name}
              onChange={handleMainChange}
              required
              placeholder="e.g.,Product"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleMainChange}
              required
              placeholder="Describe your product..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Link *
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleMainChange}
              required
              placeholder="e.g.,Product Link"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
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
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
