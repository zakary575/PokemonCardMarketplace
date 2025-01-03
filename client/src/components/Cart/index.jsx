import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_51QUIFx008X5NkGfJLJaKGzoJf1gEadGwt3uOlWXvLQnU7CnBOltWmEba7fEFxRxPRir5WzX7lGbwkjdPrIuSGhm9004taikSBt');

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {

        getCheckout({
            variables: {
                products: [...state.cart],
            },
        });
    }

    if (!state.cartOpen) {
        return (
            <div className="cart-closed btn border-info pull-right bg-dark" onClick={toggleCart}>
                <span role="img" aria-label="trash" className="bg-dark">
                    🛒
                </span>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="close btn btn-danger" onClick={toggleCart}>
                X
            </div>
            <h4 className="card-title">Shopping Cart</h4>
            {state.cart.length ? (
                <div>
                    {state.cart.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}

                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>

                        {Auth.loggedIn() ? (
                            <button onClick={submitCheckout}>Checkout</button>
                        ) : (
                            <span>(log in to check out)</span>
                        )}
                    </div>
                </div>
            ) : (
                <h5 className="card-title">
                    your cart is empty
                </h5>
            )}
        </div>
    );
};

export default Cart;
