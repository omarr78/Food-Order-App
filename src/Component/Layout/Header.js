
import classes from './Header.module.css';
import image from '../../Assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <>
            <div className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick = {props.onShowCart}/>
            </div>
            <div className={classes.image}>
                <img src = {image} alt ="img"/>
            </div>
        </>
    )
}
export default Header;