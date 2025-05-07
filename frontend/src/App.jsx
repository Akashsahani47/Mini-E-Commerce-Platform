import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [tab, setTab] = useState('submit');
  const [refreshFlag, setRefreshFlag] = useState(0);

  const activeTabClasses = "bg-blue-600 text-white";
  const inactiveTabClasses = "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Mini E-Commerce Platform</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab('submit')}
          className={`px-6 py-2 rounded-lg transition duration-200 shadow-sm ${tab === 'submit' ? activeTabClasses : inactiveTabClasses}`}
        >
          Product Submission
        </button>
        <button
          onClick={() => setTab('list')}
          className={`px-6 py-2 rounded-lg transition duration-200 shadow-sm ${tab === 'list' ? activeTabClasses : inactiveTabClasses}`}
        >
          My Products
        </button>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-6">
        {tab === 'submit' ? (
          <ProductForm onProductAdded={() => setRefreshFlag(r => r + 1)} />
        ) : (
          <ProductList refreshFlag={refreshFlag} />
        )}
      </div>
    </div>
  );
}

export default App;
