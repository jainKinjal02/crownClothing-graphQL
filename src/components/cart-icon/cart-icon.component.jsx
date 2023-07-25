
import { useDispatch , useSelector } from 'react-redux';
import {selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen} from '../../store/cart/cart.action';
//import './cart-icon.styles.jsx';
import { ShoppingIcon, CartIconContainer , ItemCount } from './cart-icon.styles';

const CartIcon = ()=>{
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const toggleIscartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIscartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;