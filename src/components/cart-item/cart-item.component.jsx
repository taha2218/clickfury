import './cart-item.styles.scss';

const CartItem = ({item}) => {

    const {name, quantity} = item;

    return(
        <div className='cart-item-container'>
            < img src={item.imageUrl} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${item.price} </span>
            </div>
        </div>
    );

}

export default CartItem;