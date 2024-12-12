const { Order, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const stripe = require('stripe')('sk_test_51QUIFx008X5NkGfJiejDvZSeurXnjALpkIfVTs5FQdve10Fob6FQkLz4Viut8GQUxdZsZJhtfAt9hcXKDdmPtZzx00GbuM0VbI'); // Your secret Stripe key

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {

                const user = await User.findById(context.user._id);

                return user;
            }
            throw AuthenticationError('You must be logged in');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {

                const user = await User.findById(context.user._id);
                return user.orders.id(_id);
            }
            throw AuthenticationError('You must be logged in');

        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },


        addOrder: async (parent, { products, paymentIntentId }, context) => {
            if (context.user) {
                // Create the order
                const order = new Order({ products, paymentIntentId });

                // Add the order to the user's orders array
                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                // Check the payment status of the paymentIntentId
                const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
                if (paymentIntent.status === 'succeeded') {
                    order.paymentStatus = 'Paid';
                    await order.save();
                } else { throw new Error('Payment not successful'); }
                 
                return order;
            }
            throw new AuthenticationError('You must be logged in');
        },

        // Mutation to create a payment intent
        createPaymentIntent: async (parent, { amount }, context) => {
            try {
                // Ensure user is authenticated
                if (!context.user) {
                    throw new AuthenticationError('You must be logged in to make a payment');
                }

                // Create the payment intent with Stripe
                const paymentIntent = await stripe.paymentIntents.create({
                    amount, // Amount in cents
                    currency: 'usd',
                    metadata: { userId: context.user._id },
                });

                // Return the client secret needed for frontend to confirm payment
                return { clientSecret: paymentIntent.client_secret };
            } catch (err) {
                console.error(err);
                throw new Error('Payment intent creation failed');
            }
        },

        updateUser: async (parent, args, context) => { 
            if (context.user) { 
                return await User.findByIdAndUpdate(context.user._id, args, { new: true }); 
            } 
            throw new AuthenticationError('You must be logged in');
         }, 
         
         login: async (parent, { email, password }) => { 
            const user = await User.findOne({ email }); 
            if (!user) {
                 throw new AuthenticationError('Invalid email or password');
                 } 
                 const correctPw = await user.isCorrectPassword(password); 
                 if (!correctPw) {
                     throw new AuthenticationError('Invalid email or password');
                 } 
                 const token = signToken(user); 
                 return { token, user };
                }, 
            },
        };

module.exports = resolvers;


