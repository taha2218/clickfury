
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'
import { Fragment, useContext } from 'react';
import {Outlet} from 'react-router-dom';
import { UserContext } from '../../../contexts/user.context';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../../contexts/cart.context';
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user/user.selector';

const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser)

    const {isCartOpen, setIsCartOpen} = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink className='nav-link' to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser?(
                            <NavLink as='span' onClick={signOutHandler} >SIGN OUT</ NavLink>
                        ):(
                            <NavLink className='nav-link' to='/auth'>
                        SIGN IN
                    </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {
                    isCartOpen && <CartDropdown/>
                }
            </ NavigationContainer>
            <Outlet />
        </Fragment>
    );

}

export default Navigation;