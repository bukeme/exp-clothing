import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import {loadStripe} from '@stripe/stripe-js';
// import {Elements} from '@stripe/react-stripe-js';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
// import CheckoutForm from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';


const CheckoutPage = ({ cartItems, total }) => {
	// const stripePromise = loadStripe('pk_test_51LBLATK70Gp5d3uG0QH3fxkAmz9qVVPf1oEEju2js2JW3jFjIBwnZAu7PNOTApHo8qp2fJk3eycvyLEy2bcgnpoX00X1JcXLnq');
	// const options = {
	// 	mode: 'payment',
	// 	amount: total,
	// 	currency: 'usd'
	// };
	return (
		<div className='checkout-page'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>
				<div className='header-block'>
					<span>Description</span>
				</div>
				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Price</span>
				</div>
				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>

			{ cartItems.map(cartItem => (<CheckoutItem key={cartItem.id} cartItem={cartItem} />)) }
			<div className='total'>
				<span>TOTAL: ${ total }</span>
			</div>
			{/*<Elements stripe={stripePromise} options={options}>
				<CheckoutForm />
			</Elements>*/}
		</div>
)};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);