import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList({ refreshFlag }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:3000/api/products/all');
      setProducts(res.data);
    };
    fetchProducts();
  }, [refreshFlag]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">My Products</h1>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full md:w-1/2 mx-auto block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 mb-6"
      />

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div
              key={p.id}
              className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
            >
              {p.imageurl ? (
                <img
                  src={p.imageurl}
                  alt={p.name}
                  className="h-48 w-full object-cover rounded mb-4"
                />
              ) : (
                <div className="h-48 w-full flex items-center justify-center bg-gray-100 rounded mb-4 text-gray-400">
                  No Image
                </div>
              )}

              <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">{p.name}</h2>
              <p className="text-blue-600 font-bold text-md mb-2">₹ {p.price}</p>
              <p className="text-gray-600 text-sm flex-grow">{p.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
