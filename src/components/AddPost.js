import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import fetchSongsQuery from '../queries/fetchSongs'

/**
 * AddSong component
 * Form to add a song.
 * Type the song title and press enter.
 * User is navigated back to SongList.
 */

class AddSong extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  /**
   * Prevent form from automatically submitting itself to backend server (HTML forms do this by default)
   * Run AddSong mutation (.mutate() prop) with the song title.
   * Run fetchSongs query to make sure newly added song appears in the song list.
   * Navigate user to SongList page.
   * @param {event} HTML form submit event
   */
  onSubmit(event) {
    //prevent default form behavior
    event.preventDefault()
    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: fetchSongsQuery }]
      })
      .then(() => hashHistory.push('/'))
  }

  /**
   * HTML form which sets the title state to the form input value as typed
   */
  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`

export default graphql(mutation)(AddSong)
