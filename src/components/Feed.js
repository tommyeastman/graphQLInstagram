import React, { Component } from 'react'
import logo from '../logo.svg'

class Feed extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Feed</h1>
        </header>
        <p className='App-intro'>This is the feed</p>
      </div>
    )
  }
}

export default Feed
