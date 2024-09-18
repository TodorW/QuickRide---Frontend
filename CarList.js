// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import { fetchCars } from 'http://127.0.0.1:8000/api/cars';
import {} from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [sortType, setSortType] = useState('none');

    useEffect(() => {
        const getCars = async () => {
            const carsData = await fetchCars();
            setCars(carsData);
            setFilteredCars(carsData);
        };
        getCars();
    }, []);

    // Handle filtering
    useEffect(() => {
        let filtered = cars;

        // Filter by search term (brand, model)
        if (searchTerm) {
            filtered = filtered.filter(car =>
                car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by type
        if (filterType !== 'all') {
            filtered = filtered.filter(car => car.type === filterType);
        }

        // Sort by selected criteria
        if (sortType === 'priceAsc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortType === 'priceDesc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredCars(filtered);
    }, [searchTerm, filterType, sortType, cars]);

    return (
        <div>
            <h2>Available Cars</h2>

            {/* Filter and Sort Section */}
            <div>
                <input
                    type="text"
                    placeholder="Search by brand or model"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                    <option value="all">All Types</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="hatchback">Hatchback</option>
                    {/* Dodati druge tipove  */}
                </select>
                <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
                    <option value="none">Sort by</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    {/* Dodati jos drugih opcija*/}
                </select>
            </div>

            {/* Cars List */}
            <ul>
                {filteredCars.map(car => (
                    <li key={car.id} style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <Link to={`/cars/${car.id}`}>
                            <div>
                                <img src={car.imageUrl} alt={`${car.make} ${car.model}`} style={{ width: '200px', height: '150px', objectFit: 'cover' }} />
                                <h3>{car.make} {car.model}</h3>
                                <p>Type: {car.type}</p>
                                <p>Price per day: ${car.price}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;