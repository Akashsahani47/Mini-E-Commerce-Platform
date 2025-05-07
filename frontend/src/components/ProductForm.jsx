import { useState } from 'react';
import axios from 'axios';

export default function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageurl: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.price.trim()) {
      alert('Product Name and Price are required.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/products/add', formData);
      onProductAdded();
      setFormData({ name: '', price: '', description: '', imageurl: '' });
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to submit product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto p-4 border rounded shadow" onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name *"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price *"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded h-24"
      />
      <input
        name="imageurl"
        type="url"
        value={formData.imageurl}
        onChange={handleChange}
        placeholder="Image URL (optional)"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Product'}
      </button>
    </form>
  );
}
