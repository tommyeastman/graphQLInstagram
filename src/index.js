import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import logo from './logo.svg'
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
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>Yoooooo</p>
      </div>
    </ApolloProvider>
  )
}
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />, document.querySelector('#root'))
//registerServiceWorker();
