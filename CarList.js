import React, { useEffect, useState } from 'react';
import { fetchCars } from 'http://127.0.0.1:8000/api/cars';
import {} from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars = async () => {
            const carsData = await fetchCars();
            setCars(carsData);
        };
        getCars();
    }, []);

    return (
        <div>
            <h2>Available Cars</h2>
            <ul>
                {cars.map(car => (
                    <li key={car.id}>
                        <Link to={`/cars/${car.id}`}>{car.make} {car.model}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;