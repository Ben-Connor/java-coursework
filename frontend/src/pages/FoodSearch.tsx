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
  const [selectedFoods, setSelectedFoods] = useState<Product[]>([]);
  const [expandedFood, setExpandedFood] = useState<number | null>(null); // To track expanded food item

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

  // Handle selecting a food item
  const handleSelectFood = (product: Product) => {
    setSelectedFoods((prevSelected) => {
      // Check if the food is already selected, and if not, add it to the list
      if (prevSelected.find((food) => food.fdcId === product.fdcId)) {
        return prevSelected; // Don't add the food again
      }
      return [...prevSelected, product];
    });
  };

  // Handle deselecting a food item
  const handleDeselectFood = (fdcId: number) => {
    setSelectedFoods((prevSelected) => prevSelected.filter((food) => food.fdcId !== fdcId));
  };

  // Toggle nutrient details visibility
  const toggleNutrientDetails = (fdcId: number) => {
    setExpandedFood((prevExpandedFood) => (prevExpandedFood === fdcId ? null : fdcId));
  };

  return (
    <div className="relative flex flex-col h-full">
      {/* Fixed Selected Foods Panel at the top right */}
      <div className="fixed top-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-200 z-10">
        <h2 className="text-xl font-semibold mb-3 sticky top-0 bg-white py-2">Selected Foods</h2>
        {selectedFoods.length > 0 ? (
          selectedFoods.map((product) => (
            <div key={product.fdcId} className="mb-3 p-3 border rounded flex justify-between items-center bg-gray-50">
              <div className="overflow-hidden">
                <h3 className="font-bold text-sm truncate">{product.description}</h3>
                <p className="text-gray-700 text-xs truncate">{product.brandOwner || 'Brand not available'}</p>
              </div>
              <button
                onClick={() => handleDeselectFood(product.fdcId)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm flex-shrink-0 ml-2"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No foods selected.</p>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full pr-96"> {/* Add right padding to make room for the fixed panel */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodData.foods.map((product) => (
                <div key={product.fdcId} className="mb-4 p-3 border rounded">
                  <h3 className="font-bold">{product.description || 'Unnamed Product'}</h3>
                  <p className="text-gray-700">{product.brandOwner || 'Brand not available'}</p>
                  <p className="text-gray-700">{product.foodCategory || 'Category not available'}</p>

                  {/* Select/Deselect button */}
                  <button
                    onClick={() => handleSelectFood(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Select
                  </button>

                  {/* Nutritional info section with toggle */}
                  <button
                    onClick={() => toggleNutrientDetails(product.fdcId)}
                    className="bg-gray-300 text-black px-4 py-2 mt-3 rounded ml-2"
                  >
                    {expandedFood === product.fdcId ? 'Hide Nutritional Info' : 'Show Nutritional Info'}
                  </button>

                  {expandedFood === product.fdcId && (
                    <div className="mt-3">
                      {product.foodNutrients.map((nutrient, index) => (
                        <p key={index} className="text-gray-600">
                          {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Display image if available */}
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.description}
                      className="mt-2 max-w-full h-auto"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodSearch;