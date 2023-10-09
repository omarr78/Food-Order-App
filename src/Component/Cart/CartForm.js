
import { useContext, useState } from 'react';
import useInput from '../../hooks/use-input';

import classes from './CartForm.module.css';
import CartContext from '../../store/CartContext';

const CartForm = (props) => {


    const [showForm, setShowForm] = useState(true);
    const ctx = useContext(CartContext);
    // console.log(ctx.items);

    const hideFormHandler = () => {
        setShowForm(false);
    }

    const {
        hasError: nameHasError,
        enteredValue: enteredNameValue,
        validateEnteredValue: validateNameInput,
        inputchangeHandler: nameChangeHandler,
        inputBlurHandler: nameOnBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');


    const {
        hasError: streetHasError,
        enteredValue: enteredStreetValue,
        validateEnteredValue: validateStreetValue,
        inputchangeHandler: streetChangeHandler,
        inputBlurHandler: streetOnBlurHandler,
        reset: resetStreetInput
    } = useInput(value => value.trim() !== '');


    const {
        hasError: codeHasError,
        enteredValue: enteredCodeValue,
        validateEnteredValue: validateCodeInput,
        inputchangeHandler: codeChangeHandler,
        inputBlurHandler: codeOnBlurHandler,
        reset: resetCodeInput
    } = useInput(value => value.trim().length === 5);

    const {
        hasError: cityHasError,
        enteredValue: enteredCityValue,
        validateEnteredValue: validateCityValue,
        inputchangeHandler: cityChangeHandler,
        inputBlurHandler: cityOnBlurHandler,
        reset: resetCityInput
    } = useInput(value => value.trim() !== '');

    const formValidity = validateNameInput && validateStreetValue
        && validateCodeInput && validateCityValue;

    const submitHandler = async event => {
        event.preventDefault();
        if (!formValidity) return;
        const user = {
            name: enteredNameValue,
            street: enteredStreetValue,
            postalCode: enteredCodeValue,
            city: enteredCityValue
        }
        const combinedData = {
            orderItems: ctx.items,
            user: user
        }
        const backendUrl = 'https://react-project-f975d-default-rtdb.firebaseio.com/orders.json';

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(combinedData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            resetNameInput();
            resetStreetInput();
            resetCodeInput();
            resetCityInput();
            ctx.default();
            props.hideTotalAmount();
            hideFormHandler();
        } catch (error) {
            console.error(error.message);
        }

    }
    if(!showForm)
    {
        return (
            <p>the order has been sent successfully</p>
        )
    }

    return (

        <form className={classes.form} onSubmit={submitHandler}>

            <div className={`${classes.control} ${nameHasError ? classes.invalid : ''}`}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    value={enteredNameValue}
                    onChange={nameChangeHandler}
                    onBlur={nameOnBlurHandler}
                />
                {nameHasError && <p className="error-text">Please Enter a Valid Name</p>}
            </div>


            <div className={`${classes.control} ${streetHasError ? classes.invalid : ''}`}>
                <label htmlFor='street'>Street</label>
                <input
                    type='text'
                    id='street'
                    value={enteredStreetValue}
                    onChange={streetChangeHandler}
                    onBlur={streetOnBlurHandler}
                />
                {streetHasError && <p className="error-text">Please Enter a Valid Street</p>}
            </div>


            <div className={`${classes.control} ${codeHasError ? classes.invalid : ''}`}>
                <label htmlFor='code'>Postal Code</label>
                <input
                    type='text'
                    id='code'
                    value={enteredCodeValue}
                    onChange={codeChangeHandler}
                    onBlur={codeOnBlurHandler}
                />
                {codeHasError && <p className="error-text">Please Enter a Valid PostalCode (5 character long)</p>}
            </div>

            <div className={`${classes.control} ${cityHasError ? classes.invalid : ''}`}>
                <label htmlFor='city'>City</label>
                <input
                    type='text'
                    id='city'
                    value={enteredCityValue}
                    onChange={cityChangeHandler}
                    onBlur={cityOnBlurHandler}
                />
                {cityHasError && <p className="error-text">Please Enter a Valid City</p>}
            </div>



            <div className={classes.actions}>
                <button onClick={props.hide} type='button'>Cancel</button>
                <button className={classes.submit}>confirm</button>
            </div>
        </form>
    );
};

export default CartForm;
