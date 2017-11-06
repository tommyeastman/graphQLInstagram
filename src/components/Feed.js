import React, { Component } from 'react'
import logo from '../logo.svg'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = { content: '' }
  }

  onSubmit(event) {
    //prevent default form behavior
    // event.preventDefault()
    // this.props.mutate({
    //   variables: { content: this.state.content }
    // })
    console.log(this.state.content)
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
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($content: String) {
    addSong(content: $content) {
      id
      content
    }
  }
`

//export default graphql(mutation)(Feed)
export default Feed
