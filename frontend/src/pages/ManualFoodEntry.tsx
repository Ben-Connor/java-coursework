import React, { useState } from 'react';

const ManualFoodEntry: React.FC = () => {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [vitamins, setVitamins] = useState<
        { name: string; amount: string; unit: string }[]
    >([]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const foodData = {
            name: foodName,
            calories: parseFloat(calories),
            protein: parseFloat(protein),
            carbs: parseFloat(carbs),
            fat: parseFloat(fat),
            vitamins: vitamins.map((vit) => ({
                ...vit,
                amount: parseFloat(vit.amount),
            })),
        };
        console.log('Food Data Submitted:', foodData);
        setSubmitted(true);
    };

    const handleAddVitamin = () => {
        setVitamins([...vitamins, { name: '', amount: '', unit: 'mg' }]);
    };

    const handleVitaminChange = (
        index: number,
        field: keyof (typeof vitamins)[0],
        value: string,
    ) => {
        const updatedVitamins = vitamins.map((vit, i) =>
            i === index ? { ...vit, [field]: value } : vit,
        );
        setVitamins(updatedVitamins);
    };

    return (
        <div>
            <h2>Manual Food Entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="foodName">Fod Name:</label>
                    <input
                        id="foodName"
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="calories">Calories:</label>
                    <input
                        id="calories"
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="protein">Protein (g):</label>
                    <input
                        id="protein"
                        type="number"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="carbs">Carbs (g):</label>
                    <input
                        id="carbs"
                        type="number"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fat">Fat (g):</label>
                    <input
                        id="fat"
                        type="number"
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                        required
                    />
                </div>
                <h3>Vitamins & Micronutrients</h3>
                {vitamins.map((vit, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Vitamin Name"
                            value={vit.name}
                            onChange={(e) =>
                                handleVitaminChange(
                                    index,
                                    'name',
                                    e.target.value,
                                )
                            }
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={vit.amount}
                            onChange={(e) =>
                                handleVitaminChange(
                                    index,
                                    'amount',
                                    e.target.value,
                                )
                            }
                            required
                        />
                        <select
                            value={vit.unit}
                            onChange={(e) =>
                                handleVitaminChange(
                                    index,
                                    'unit',
                                    e.target.value,
                                )
                            }
                        >
                            <option value="mg">mg</option>
                            <option value="mcg">mcg</option>
                            <option value="g">g</option>
                        </select>
                    </div>
                ))}
                <button type="button" onClick={handleAddVitamin}>
                    Add Vitamin
                </button>
                <button type="submit">Submit</button>
            </form>
            {submitted && <p>Food entry submitted successfully!</p>}
        </div>
    );
};

export default ManualFoodEntry;
