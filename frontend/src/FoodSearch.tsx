import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define the types for the USDA API response and the product data
interface Nutrient {
  nutrientName: string;
  value: number;
  unitName: string;
}

interface Product {
  fdcId: number;
  description: string;
  brandOwner: string;
  foodCategory: string;
  nutrients: Nutrient[];
  foodNutrients: Nutrient[];
  imageUrl: string;
}

interface USDAResponse {
  foods: Product[];
}

function FoodSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foodData, setFoodData] = useState<USDAResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiKey = 'DEMO_KEY'; // Replace with your USDA API key
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: USDAResponse = await response.json();
      console.log('Raw USDA API Response:', data); // Log the entire response to inspect the structure

      if (data && data.foods && data.foods.length > 0) {
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

      {foodData && foodData.foods && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Results</h2>
          {foodData.foods.map((product) => (
            <div key={product.fdcId} className="mb-4 p-3 border rounded">
              <h3 className="font-bold">{product.description || 'Unnamed Product'}</h3>
              <p className="text-gray-700">{product.brandOwner || 'Brand not available'}</p>
              <p className="text-gray-700">{product.foodCategory || 'Category not available'}</p>

              {/* Nutritional information */}
              {product.foodNutrients.map((nutrient, index) => (
                <p key={index} className="text-gray-600">
                  {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                </p>
              ))}

              {/* Display image if available */}
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.description}
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
