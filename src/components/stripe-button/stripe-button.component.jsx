import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100
	const publishableKey =
		'pk_test_51GyV3VD0RpoX6j0ObVH8SWJI5NpMliC8w9VuqgI9uBoxTK4Guqy7xiKoIxMfv6xoSyj5R22GQ4q4eodSze5s1So900zwoASGQU'
	const onToken = token => {
		console.log(token)
		alert('payment successful')
	}
	return (
		<StripeCheckout
			label='Pay Now'
			name='CROWN Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total price is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	)
}

export default StripeCheckoutButton
