import React, { useState, useEffect } from "react";

const EditResearchForm = ({ research, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    year:"",
    type:"",
    description: "",
    doi: "",
  });

  // Load research data when component mounts or research changes
  useEffect(() => {
    if (research) {
      setFormData(research);
    }
  }, [research]);

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

  // If no research data is provided, show a message
  if (!research) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <p className="text-red-500">No research data provided for editing.</p>
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
        <h2 className="text-2xl font-bold text-gray-800">Edit Research</h2>
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
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleMainChange}
              required
              placeholder="e.g.,Research Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Year *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleMainChange}
              required
              placeholder="e.g.,2024"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div><div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Type *
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleMainChange}
              required
              placeholder="e.g.,Research Type"
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
              placeholder="Describe your research..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Doi *
            </label>
            <input
              type="url"
              name="doi"
              value={formData.doi}
              onChange={handleMainChange}
              required
              placeholder="e.g.,https://doi.org/..."
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
            Update Research
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditResearchForm;
