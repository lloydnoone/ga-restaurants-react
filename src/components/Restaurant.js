import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Restaurant extends React.Component {
  constructor() {
    super()

    this.state = {
      restData: null,
      reviewData: null
    }
    this.headers = { headers: { 'user-key': process.env.ZOMATO_TOKEN } }
  }

  componentDidMount() {
    const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.props.match.params.id}`
    axios.get(url, this.headers)
      .then(res => this.setState({ restData: res.data }))
      .catch(err => console.log(err.message))

    const revUrl = `https://developers.zomato.com/api/v2.1/reviews?res_id=${this.props.match.params.id}&start=0&count=10`
    axios.get(revUrl, this.headers)
      .then(rev => this.setState({ reviewData: rev.data }))
      .catch(err => console.log(err.message))
  }

  render() {
    if (!this.state.restData || !this.state.reviewData) return null
    const { thumb, name, featured_image,
      location: { locality, address }, establishment,
      user_rating: { aggregate_rating, rating_text, rating_color },
      all_reviews: { reviews },
      all_reviews_count, phone_numbers, cuisines, average_cost_for_two, currency, url, timings, highlights,
      menu_url, photos
    } = this.state.restData
    const { user_reviews } = this.state.reviewData
    return (
      this.state.restData &&
      <main className='restaurant-show'>
        <Link to='/' className='logo'>Nomato</Link>
        <img src={featured_image} />
        <div className='panel-wrapper restDetails'>
          <div className='restMainInfo'>
            <h2>{name}</h2>
            <p>{locality} - {establishment[0]}</p>
            <div className='rating'>
              <div style={{ backgroundColor: `#${rating_color}` }}>{aggregate_rating}<span>/5</span></div>
              <p>{rating_text}</p>
              <p>{all_reviews_count} votes</p>
            </div>
          </div>
          <div>
            <h4>Phone number</h4>
            <p>{phone_numbers}</p>
            <h4>Cuisines </h4>
            <p>{cuisines}</p>
            <h4>Average Cost</h4>
            <p>{currency}{average_cost_for_two} for two people (approx.)</p>
            <p>Cash and cards accepted </p>
            <h4>Website</h4>
            <a href={url}>View Website</a>
          </div>
          <div>
            <h4>Opening Hours</h4>
            <p>{timings}</p>
            <h4>Address</h4>
            <p>{address}</p>
          </div>
          <div>
            <h4>More info</h4>
            <h4>highlights</h4>
            <ul>
              {highlights.map(hl => <li key={hl}>{hl}</li>)}
            </ul>
          </div>
        </div>
        <div className='panel-wrapper restDetails'>
          <div>
            <h4>Menu</h4>
            <a href={menu_url}>click for menu</a>
          </div>
        </div>
        <div className='panel-wrapper restPhotos'>
          <div>
            <h4>Photos</h4>
            {photos.map(photo => <img key={photo.photo.id} src={photo.photo.url} />)}
          </div>
        </div>
        <div>
          <h4>Reviews</h4>
          {user_reviews.filter(({ review }) => review.review_text.length).map(({ review }) => (
            <div key={review.id} className='panel-wrapper restReview'>
              <div className='reviewer-detail'>
                <img src={review.user.profile_image} />
                <h5>{review.user.name}</h5>
                <p>{review.review_time_friendly}</p>
              </div>
              <div className='rating'>
                <div style={{ backgroundColor: `#${review.rating_color}` }}>{review.rating}</div>
              </div>
              <p> {review.review_text} </p>
            </div>
          ))}
        </div>
      </main>
    )
  }
}