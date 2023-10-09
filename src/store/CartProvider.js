
import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const CartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updateTotalAmount = state.totalAmount + action.items.price * action.items.amount;

        const isfound = state.items.findIndex((item) => item.id === action.items.id);
        let updateItems;
        if (isfound !== -1) {
            const existingCartItem = state.items[isfound];
            const updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount += action.items.amount
            }
            updateItems = [...state.items];
            updateItems[isfound] = updateItem;
        }
        else {
            updateItems = state.items.concat(action.items);
        }
        return {
            items: updateItems,
            totalAmount: updateTotalAmount
        }
    }
    if(action.type === 'REMOVE')
    {
        const isFound = state.items.findIndex((item) => item.id === action.id);
        const updateTotalAmount = Math.abs(state.totalAmount - state.items[isFound].price);
        
        const theAmount = state.items[isFound].amount;
        let updateItems;
        if(theAmount === 1)
        {
            updateItems = state.items.filter(item => item.id !== action.id);
        }else{
            updateItems = state.items.map( item => ({
                ...item, 
                amount : item.id === action.id ? theAmount-1 : item.amount 
              }));
              
        }


               return {
            items: updateItems,
            totalAmount: updateTotalAmount
        }
    }
    return defaultCartState;
}

const CartProvider = (props) => {

    const [CartState, dispatchCartAction] = useReducer(CartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', items: item });
    };

    const removeItemFromHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id : id });
    };
    const DeleteAllHandler = () => {
        dispatchCartAction({type : 'EMPTY'});
    }

    const cartContext = {
        items: CartState.items,
        totalAmount: CartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromHandler,
        default :DeleteAllHandler 
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}
export default CartProvider;