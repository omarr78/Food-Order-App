

import classes from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealIteam';
import { useEffect, useState } from 'react';


// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];



const AvailableMeals = () => {

    const [DUMMY_MEALS, setDUMMY_MEALS] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('https://react-project-f975d-default-rtdb.firebaseio.com/DUMMY_MEALS.json');

                if (!response.ok) {
                    throw new Error('Request failed!');
                }
                const data = await response.json();
                setDUMMY_MEALS(data);
                setIsLoading(false);

            } catch (error) {
                console.log('Error fetching data: ', error);
                setIsLoading(false);
                setError(error.message);
            }
        }
        fetchData();
    }, [])

    if(isLoading)
    {
        return <section className={classes.mealsLoading}>
            <p>Loading...</p>
        </section>
    }
    if(error){
        return <section className={classes.mealsError}>
            <p>{error}</p>
        </section>
    }
    const mealList = DUMMY_MEALS.map(element => (
        <MealItem
            id={element.id}
            key={element.id}
            name={element.name}
            description={element.description}
            price={element.price}
        />
    ));
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>

    )
}
export default AvailableMeals;