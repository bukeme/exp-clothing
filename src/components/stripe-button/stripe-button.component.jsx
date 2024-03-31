import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
	PaymentElement,
	Elements,
	useStripe,
	useElements
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (elements == null) return;

		const {error: submitError} = await elements.submit();
		if (submitError) {
			setErrorMessage(submitError.message);
			return;
		}

		const res = await fetch('http://localhost:3000/checkout/create-payment-intent', {
			method: 'POST'
		});

		const {client_secret: clientSecret} = await res.json();
		const {error} = await stripe.confirmPayment({
			elements,
			clientSecret,
			confrimParams: {
				return_url: 'http://localhost:3000/checkout'
			}
		});

		if (error) {
			setErrorMessage(error.message);
		} else {
			alert('Payment Successful')
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<button type='submit' disabled={!stripe || !elements}>
				Pay
			</button>
			{errorMessage && <div>{errorMessage}</div>}
		</form>
	);
};

export default CheckoutForm;