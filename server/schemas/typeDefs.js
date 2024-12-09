const typeDefs = `
  type Order {
    _id: ID
    purchaseDate: String
    cards: [String]!
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
    user: User
    order(_id: ID!): Order
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
