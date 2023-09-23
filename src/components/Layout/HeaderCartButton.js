import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context';
import { useContext, useEffect, useState } from 'react';

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext)

  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
  const {items} = ctx
  const btnClasses = `${classes.button} ${isButtonHighlighted ? classes.bump : ''}`;
  useEffect(() => {
    if(items.length === 0) {
      return
    }
    setIsButtonHighlighted(true)
    const timer = setTimeout(() => {
      setIsButtonHighlighted(false);
    }, 300)

    return () => {
      clearTimeout(timer);
    }
  }, [items])

  const numberOfCartItems = ctx.items.reduce((currNumber, item) => {
    return currNumber + item.amount
  }, 0)
  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;