import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem , updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();


  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    // Iterate through each item in the cart
    cart.forEach(item => {
      // Parse the cost from string (e.g., "$15" -> 15)
      const numericCost = parseFloat(item.cost.replace('$', ''));
      // Multiply cost by quantity and add to total amount
      totalAmount += numericCost * item.quantity;
    });
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
        onContinueShopping(e); // Ensure it triggers the parent's function to hide the cart
      }
    };

    
  



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity + 1 // Increment the quantity by 1
      }))
    };
   const handleDecrement = (item) => {
        if (item.quantity > 1) {
          // Decrement the quantity by 1
          dispatch(updateQuantity({ 
            name: item.name, 
            quantity: item.quantity - 1 
          }))
        } else {
          // If the quantity is 1 or less, remove the item from the cart
          dispatch(removeItem(item));
        }
    
      };

  

  

  const handleRemove = (item) => {
        dispatch(removeItem(item)); // Remove item from the cart
      };
  

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace('$', '')); // Convert the string cost to a numeric value
  return numericCost * item.quantity;}
   // Multiply cost by quantity


  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };



  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}> Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  
  );
 

};


export default CartItem;