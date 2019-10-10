import React from 'react'
import axios from 'axios'

class Restaurant extends React.Component {
  constructor() {
    super()

    this.state = {
      url: 'https://developers.zomato.com/api/v2.1/restaurant?res_id=6113798)',
      headers: ''
    }
  }

  componentDidMount() {
    const restId = this.props.match.params.id
    axios.get(this.state.url, this.state.headers) 
  }

  render() {
    return (
      <h1>Restaurant Page</h1>
    )
  }
}