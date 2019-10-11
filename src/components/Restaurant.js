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
    const { thumb, name, featured_image,
      location: { locality, address }, establishment,
      user_rating: { aggregate_rating, rating_text, rating_color },
      all_reviews_count, phone_numbers, cuisines, average_cost_for_two, currency, url, timings, highlights
    } = this.state.restData
    return (
      this.state.restData &&
      <>
        <div>
          <img src={ featured_image } />
          <h1>{name}</h1>
          <h2>{locality} {establishment[0]}</h2>
          <aside>
            {aggregate_rating}
            {rating_text}
            {rating_color}
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
          <h4>highlights</h4>
          <ul>
            {highlights.map(hl => ( <li>hl</li> ))}
          </ul>
        </div>
        <div>
          <h4>Menu</h4>
          <img />
        </div>
      </>
    )
  }
}