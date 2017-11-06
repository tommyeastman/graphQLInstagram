import React, { Component } from 'react'
import logo from '../logo.svg'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

/**
 * Feed Component
 * - Displays descriptions of all posts
 * - User can create a new post in the form
 * - User can delete post by clicking trash icon
 * Post requires imageUrl and description. Both are handled through state.
 * Use static imageUrl and take description from form input.
 * 
 */

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = { desc: '', image: 'http://oi47.tinypic.com/i6bmf9.jpg' }
  }

  onPostSubmit(event) {
    event.preventDefault()
    this.props.createPost({
      variables: { desc: this.state.desc, image: this.state.image },
      refetchQueries: [{ query: fetchPosts }]
    })
    this.setState({ desc: '' })
  }

  deletePost(id) {
    this.props.deletePost({
      variables: { id },
      refetchQueries: [{ query: fetchPosts }]
    })
  }

  renderPosts() {
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

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
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

/**
 * Mutations
 */
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
/**
 * Queries
 */
const fetchPosts = gql`
  {
    allPosts {
      id
      description
      imageUrl
    }
  }
`

//Compose function allows multiple mutations per component.
//Need to name mutations, these names are passed as props
export default compose(
  graphql(createPost, { name: 'createPost' }),
  graphql(deletePost, { name: 'deletePost' }),
  graphql(fetchPosts)
)(Feed)
