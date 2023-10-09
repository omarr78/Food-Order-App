import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/CartContext';
import { useContext, useState } from 'react';
import CartForm from './CartForm';



const Cart = (props) => {
    const [showTotalAmount, setShowTotalAmount] = useState(true);
    const [show, setShow] = useState(false);
    const ctx = useContext(CartContext);
    const hasItems = ctx.items.length > 0;
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

    const showFormHandler = () => {
        setShow(true);
    }
    const hideHandler = ()=>{
        setShowTotalAmount(false);
    }

    const CartRemoveHandler = (id) => {
        ctx.removeItem(id);
    }
    const cartAddHandler = (item) => {
        ctx.addItem({ ...item, amount: 1 });
    }
    return (

        <Modal onClick={props.onHideCart}>
            <ul className={classes.list}>
                {ctx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                        onRemove={CartRemoveHandler.bind(null, item.id)}
                        onAdd={cartAddHandler.bind(null, item)}
                    />
                ))}
            </ul>
            {showTotalAmount &&
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
            }
            {show ? <CartForm hide={props.onHideCart} hideTotalAmount ={hideHandler} /> :
                <div className={classes.actions}>
                    <button onClick={props.onHideCart} className={classes['button--alt']}>close</button>
                    {hasItems && !show && <button onClick={showFormHandler} className={classes.button}>Order</button>}
                </div>
            }
        </Modal >
    )
}
export default Cart;