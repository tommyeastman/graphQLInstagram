import React, { Component } from 'react'
import logo from '../logo.svg'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = { desc: '', image: 'http://oi47.tinypic.com/i6bmf9.jpg' }
  }

  onPostSubmit(event) {
    //prevent default form behavior
    event.preventDefault()
    this.props.createPost({
      variables: { desc: this.state.desc, image: this.state.image },
      refetchQueries: [{ query: fetchPosts }]
    })
    this.setState({ desc: '' })
  }

  renderPosts() {
    //console.log(this.props.data)
    return this.props.data.allPosts.map(post => {
      return (
        <li key={post.id} className='collection-item'>
          {post.description}
          <i
            className='material-icons'
            onClick={() => this.deletePost(post.id)}
          >
            delete
          </i>
        </li>
      )
    })
  }

  deletePost(id) {
    this.props.deletePost({
      variables: { id },
      refetchQueries: [{ query: fetchPosts }]
    })
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Feed</h1>
        </header>
        <div className='container'>
          <p className='App-intro'>This is the feed</p>
          <div>
            <ul className='collection'>{this.renderPosts()}</ul>
          </div>
          <h3>Create a new post</h3>
          <form onSubmit={this.onPostSubmit.bind(this)}>
            <label>Post Content:</label>
            <input
              value={this.state.desc}
              onChange={event => this.setState({ desc: event.target.value })}
            />
          </form>
        </div>
      </div>
    )
  }
}

const createPost = gql`
  mutation createPost($desc: String!, $image: String!) {
    createPost(description: $desc, imageUrl: $image) {
      id
      description
      imageUrl
    }
  }
`
const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const fetchPosts = gql`
  {
    allPosts {
      id
      description
      imageUrl
    }
  }
`
export default compose(
  graphql(createPost, { name: 'createPost' }),
  graphql(deletePost, { name: 'deletePost' }),
  graphql(fetchPosts)
)(Feed)
