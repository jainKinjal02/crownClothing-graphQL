import { Outlet} from "react-router-dom";
import { Fragment } from "react";
import { useSelector,useDispatch } from 'react-redux';
//import './navigation.styles.jsx';
import { NavigationContainer,NavLinks,NavLink ,LogoContainer} from './navigation.styles';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {selectIsCartOpen} from '../../store/cart/cart.selector';

import { selectCurrentUser } from "../../store/user/user.selector";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutStart } from "../../store/user/user.action";

const Navigation = ()=>{
   const dispatch = useDispatch();
   const currentUser = useSelector(selectCurrentUser)

    const isCartOpen = useSelector(selectIsCartOpen);
  const signOutUser = () => dispatch(signOutStart());
    //console.log(currentUser);
    return (
      <Fragment>
          <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo"/>
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span'  onClick={signOutUser}>SIGN OUT</NavLink> )
                        : (<NavLink  to='/auth'>
                        SIGN IN
                    </NavLink>)
                   
                }
                 <CartIcon />
            </NavLinks>
              {isCartOpen && <CartDropdown/>}
          </NavigationContainer>
          <Outlet />
      </Fragment>
    )
  }

export default Navigation;