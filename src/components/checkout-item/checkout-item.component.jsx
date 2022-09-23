import "./checkout-item.styles.scss";
import { clearItemFromCart, addItemToCart, removeItemFromCart } from "../../store/cart/cart.action"; 
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ cartItem }) => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <div className="checkout-item-container">
        <div className="image-container">
            <img src={imageUrl} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={() => {return dispatch(removeItemFromCart( cartItems, cartItem))}}> &#10094; </div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => {return dispatch(addItemToCart( cartItems, cartItem))}}>&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={() => {
            dispatch(clearItemFromCart( cartItems ,cartItem))
        }} >&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
