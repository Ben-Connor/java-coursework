import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define the types for the API response and the product data
interface Nutriments {
  'energy-kcal_100g'?: number;
  energy_100g?: number;
}

interface Product {
  code: string;
  product_name: string;
  ingredients_text: string;
  nutriments: Nutriments;
  image_url: string;
}

interface FoodData {
  products: Product[];
}

function FoodSearch() {
  // Use proper types for state variables
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Type for the input change event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Type for the form submit event
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Searching for:', searchQuery);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchQuery)}&search_simple=1&action=process&json=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: FoodData = await response.json();
      console.log('Raw API Response:', data); // Log the entire response to inspect the structure

      if (data && data.products && data.products.length > 0) {
        setFoodData(data);
        setError('');
      } else {
        setError('No products found for your search.');
        setFoodData(null);
      }
    } catch (error) {
      console.error('Error fetching food data:', error);
      setError('An error occurred while fetching data.');
      setFoodData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Food Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={handleInputChange}
          className="border p-2 mr-2 w-64"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p className="text-gray-500">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {foodData && foodData.products && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Results</h2>
          {foodData.products.map((product, index) => (
            <div key={product.code || index} className="mb-4 p-3 border rounded">
              <h3 className="font-bold">{product.product_name || 'Unnamed Product'}</h3>
              <p className="text-gray-700">{product.ingredients_text || 'Ingredients not available'}</p>
              <p className="text-gray-600">
                Calories: {product.nutriments?.['energy-kcal_100g'] || product.nutriments?.energy_100g || 'N/A'} kcal
              </p>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="mt-2 max-w-[200px] h-auto"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodSearch;

