import React, { Component } from 'react'
import logo from '../logo.svg'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Spinner from 'react-spinkit'

/**
 * Feed Component
 * - Displays descriptions of all posts
 * - User can create a new post in the form
 * - User can delete post by clicking trash icon
 * User edits post description in form, which updates the state live.
 * Once submitted, the createPost mutation is called to create the post.
 * If the delete icon is clicked, the deletePost mutation is called. 
 */

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = { desc: '', loading: false }
  }

  componentWillMount() {
    console.log('mounting :)')
  }

  onPostSubmit(event) {
    event.preventDefault()
    this.setState({ loading: true })
    this.props.createPost({
      variables: { desc: this.state.desc },
      refetchQueries: [{ query: fetchPosts }]
    })
    this.setState({ desc: '' })
  }

  deletePost(id) {
    console.log('deleted')
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
    if (this.props.data.loading || this.state.loading) {
      return <Spinner name='double-bounce' />
    }
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
        <div className='container'>
          <h3>Feed</h3>
          <div>
            <ul className='collection'>{this.renderPosts()}</ul>
          </div>
          <h4>Create a new post</h4>
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
  mutation createPost($desc: String!) {
    createPost(description: $desc) {
      id
      description
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
