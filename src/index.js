import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Feed from './components/Feed'

import './index.css'
import './App.css'

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cj9ocji231arr0124471yj13z'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route path='/' component={Feed} />
      </BrowserRouter>
    </ApolloProvider>
  )
}
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />, document.querySelector('#root'))
//registerServiceWorker();
