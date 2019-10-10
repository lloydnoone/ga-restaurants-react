import React from 'react'
import axios from 'axios'
console.log('restaurant running')

export default class Restaurant extends React.Component {
  constructor() {
    super()

    this.state = {
      restData: null
    }
    this.headers = { headers: { 'user-key': process.env.ZOMATO_TOKEN } }
  }

  componentDidMount() {
    console.log('rest page mounted.')
    const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.props.match.params.id}`
    axios.get(url, this.headers)
      .then(res => this.setState({ restData: res.data }))
      .catch(err => console.log(err.message))
  }

  render() {
    if (!this.state.restData) return null
    const { thumb, name,
      location: { locality, address }, establishment,
      user_rating: { aggregate_rating, rating_text },
      all_reviews_count, phone_numbers, cuisines, average_cost_for_two, currency, url, timings
    } = this.state.restData
    return (
      this.state.restData &&
      <>
        <div>
          <img src={thumb} />
          <h1>{name}</h1>
          <h2>{locality} {establishment[0]}</h2>
          <aside>
            {aggregate_rating}
            {rating_text}
            based on {all_reviews_count} votes
          </aside>
        </div>
        <div>
          <h4> Phone number {phone_numbers}</h4>
          <h4> Cuisines {cuisines}</h4>
          <h4> {currency}{average_cost_for_two} for two people (approx.)</h4>
          <h4> {average_cost_for_two} for two people (approx.)</h4>
          <h4><a href={url}>Website</a></h4>
          <h4>Opening Hours {timings}</h4>
          <h4>Address {address}</h4>
          <h4>Address {address}</h4>
          <h4>More info</h4>
          <ul>
            <li> No takeaway</li>
            <li> Full bar available</li>
            <li> Indoor Seating</li>
            <li> Pre-theatre menu</li>
            <li> Luxury Dining</li>
            <li> Wifi</li>
            <li> Group Meal</li>
          </ul>
        </div>
      </>
    )
  }
}