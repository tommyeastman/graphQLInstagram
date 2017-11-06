import React, { Component } from 'react'
import logo from '../logo.svg'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = { desc: '', image: 'http://oi47.tinypic.com/i6bmf9.jpg' }
  }

  onSubmit(event) {
    //prevent default form behavior
    event.preventDefault()
    this.props.mutate({
      variables: { desc: this.state.desc, image: this.state.image }
    })
    this.setState({ desc: '' })
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Feed</h1>
        </header>
        <p className='App-intro'>This is the feed</p>
        <h3>Create a new post</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Post Content:</label>
          <input
            value={this.state.desc}
            onChange={event => this.setState({ desc: event.target.value })}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation createPost($desc: String!, $image: String!) {
    createPost(description: $desc, imageUrl: $image) {
      id
    }
  }
`

export default graphql(mutation)(Feed)
