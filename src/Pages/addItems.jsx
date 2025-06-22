import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const itemTypes = ["Shirt", "Pant", "Shoes", "Sports Gear", "Other"];
const API_URL = import.meta.env.VITE_API_URL;
export default function AddItem() {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Form state to hold item details
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null,
    additionalImages: [],
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage") {
      handleImageUpload(e);
    } else if (name === "additionalImages") {
      setForm({ ...form, additionalImages: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const fileTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (file) {
      // Validate file type
      if (!fileTypes.includes(file.type)) {
        setError("Only JPG, PNG, and GIF files are allowed.");
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        setError("File size should not exceed 2 MB.");
        return;
      }

      // Reset error
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedForm = { ...form, [event.target.name]: reader.result };
        setForm(updatedForm);
        console.log("output:", updatedForm); // Correct place to log updated state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.disabled = "true";
    e.target.style.cursor = "not-allowed";
    axios
      .post(API_URL, {
        form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Item added successfully:", response.data);
      })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3000); // Reset success message after 3 seconds
        setForm({
          name: "",
          type: "",
          description: "",
          coverImage: null,
          additionalImages: [],
        });
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  return (
    <div className="flex text-black items-center justify-center bg-gradient-to-br from-blue-100 to-slate-500">
      <div className="w-full max-w-xl bg-gray-50 rounded-xl shadow-lg p-8 m-3">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Add Item
        </h2>
        {success && (
          <div className="mb-4 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded text-center">
            Item successfully added
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full px-3 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select type</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Describe the item"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Cover Image
            </label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              required
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Additional Images
            </label>
            <input
              type="file"
              name="additionalImages"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-1 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition duration-200"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
