
import {useState} from 'react';

const useInput = (validation) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [inputIsTouched, setInputIsTouched] = useState(false);


    const validateEnteredValue = validation(enteredValue);

    const hasError = inputIsTouched && !validateEnteredValue;


    const inputchangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setInputIsTouched(true);
    }
    const reset =  ()=> {
        setEnteredValue('');
        setInputIsTouched(false);
    }
    return{
        hasError,
        enteredValue,
        validateEnteredValue,
        inputchangeHandler,
        inputBlurHandler,
        reset
    }
}
export default useInput;