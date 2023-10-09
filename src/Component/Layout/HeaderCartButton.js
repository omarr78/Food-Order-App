

import classes from './HeaderCartButton.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/CartContext';


const HeaderCartButton = (props) => {

    const ctx = useContext(CartContext);
    const [isShaked,setIsShaked] = useState(false);
    const numberOfCartItems = ctx.items.reduce((curnumber,item)=>{
        return curnumber+item.amount;
    },0);

    const {items} = ctx;
    const btnClasses = `${classes.button} ${ isShaked ? classes.bump : ''}`

    useEffect(()=>{
        if(items.length === 0)return;
        setIsShaked(true);

        const timer = setTimeout(()=>{
            setIsShaked(false);
        },300);

        return () =>{
            clearTimeout(timer);
        };
    },[items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span><FontAwesomeIcon icon={faShoppingCart} /></span>
            <p className={classes.hide}>Your Cart</p>
            <p className={classes.cnt}>{numberOfCartItems}</p>
        </button>
    )
}
export default HeaderCartButton;