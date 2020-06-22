import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'https://min-shop.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
})

export default withApollo(apolloClient)
