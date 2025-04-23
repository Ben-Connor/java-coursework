import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Nutrient {
  name: string;
  value: number | string;
  unit: string;
}

interface Product {
  code: string;
  product_name: string;
  brands: string;
  categories: string;
  nutrients: Nutrient[];
  image_url: string;
}

function BarcodeSearch() {
  const [barcode, setBarcode] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedFoods, setSelectedFoods] = useState<Product[]>([]);
  const [showNutrients, setShowNutrients] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!barcode.trim()) {
      setError('Please enter a barcode.');
      return;
    }

    setLoading(true);
    setError('');
    setProduct(null);

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();

      if (data.status === 1 && data.product) {
        const p = data.product;
        const nutrients: Nutrient[] = Object.entries(p.nutriments || {}).map(([key, val]: [string, any]) => ({
          name: key,
          value: val,
          unit: typeof val === 'number' ? 'g' : '',
        }));
        setProduct({
          code: p.code,
          product_name: p.product_name || 'Unnamed Product',
          brands: p.brands || 'Unknown Brand',
          categories: p.categories || 'Unknown Category',
          image_url: p.image_url || '',
          nutrients,
        });
      } else {
        setError('Product not found.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFood = () => {
    if (product && !selectedFoods.find((item) => item.code === product.code)) {
      setSelectedFoods((prev) => [...prev, product]);
    }
  };

  const handleDeselectFood = (code: string) => {
    setSelectedFoods((prev) => prev.filter((item) => item.code !== code));
  };

  return (
    <div className="relative flex flex-col h-full">
      {/* Selected Foods Panel */}
      <div className="fixed top-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-200 z-10">
        <h2 className="text-xl font-semibold mb-3 sticky top-0 bg-white py-2">Selected Foods</h2>
        {selectedFoods.length > 0 ? (
          selectedFoods.map((food) => (
            <div key={food.code} className="mb-3 p-3 border rounded flex justify-between items-center bg-gray-50">
              <div className="overflow-hidden">
                <h3 className="font-bold text-sm truncate">{food.product_name}</h3>
                <p className="text-gray-700 text-xs truncate">{food.brands}</p>
              </div>
              <button
                onClick={() => handleDeselectFood(food.code)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2"
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
      <div className="w-full pr-96">
        <h1 className="text-2xl font-bold mb-4">Food Barcode Lookup</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            placeholder="Enter barcode number..."
            value={barcode}
            onChange={handleInputChange}
            className="border p-2 mr-2 w-64"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </form>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {product && (
          <div className="p-4 border rounded mb-4">
            <h2 className="text-xl font-semibold">{product.product_name}</h2>
            <p>{product.brands}</p>
            <p>{product.categories}</p>

            <button
              onClick={handleSelectFood}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Select
            </button>

            <button
              onClick={() => setShowNutrients((prev) => !prev)}
              className="bg-gray-300 text-black px-4 py-2 mt-2 ml-2 rounded"
            >
              {showNutrients ? 'Hide Nutrients' : 'Show Nutrients'}
            </button>

            {showNutrients && (
              <div className="mt-3">
                {product.nutrients.map((n, i) => (
                  <p key={i}>
                    {n.name}: {n.value} {n.unit}
                  </p>
                ))}
              </div>
            )}

            {product.image_url && (
              <img src={product.image_url} alt={product.product_name} className="mt-2 max-w-full h-auto" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BarcodeSearch;
