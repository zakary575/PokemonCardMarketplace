const typeDefs = `
  type Order {
    _id: ID
    purchaseDate: String
    cards: [??? pokemon api ???]
  }

  type User {
    _id: ID
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {

  }

  type Mutation {

  }
`;

module.exports = typeDefs;
