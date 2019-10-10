import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Item from './Item'
import SearchForm from './SearchForm'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      locationSuggestions: null,
      searchCities: '',
      selectedCity: '',
      searchTerm: '',
      cuisineSuggestions: null,
      selectedCuisine: '',
      restaurantSuggestions: '',
      selectedRestauarant: ''
    }

    this.header = { headers: { 'user-key': process.env.ZOMATO_TOKEN } }

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onSubmitSearch = this.onSubmitSearch.bind(this)
    this.selectCuisine = this.selectCuisine.bind(this)
    this.onSubmitCities = this.onSubmitCities.bind(this)
  }

  getCuisine(id) {
    axios.get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${id}`, this.header)
      .then(res => this.setState({ cuisineSuggestions: res.data.cuisines }))
      .catch(err => console.log(err))
  }

  selectCuisine(id) {
    this.setState({ selectedCuisine: id })
  }

  onClick(id) {
    this.setState({ selectedCity: id })
    this.getCuisine(id)
  }

  onChange({ target: { name, value } }) {
    console.log(name)

    this.setState({ [name]: value })
  }

  onSubmitCities(e) {
    e.preventDefault()
    axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${this.state.searchCities}`, this.header)
      .then(res => this.setState({ locationSuggestions: res.data.location_suggestions }))
      .catch(err => console.log(err))
  }

  onSubmitSearch(e) {
    e.preventDefault()
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.selectedCity}&entity_type=city&q=${this.state.searchTerm}&cuisines=${this.state.selectedCuisine}`
    axios.get(url, this.header)
      .then(res => this.setState({ restaurantSuggestions: res.data.restaurants }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <header>
          <Link to='/'>
            <div className='logo'>Nomato</div>
          </Link>
          <div className='search-bar'>
            <SearchForm name='searchCities' onChange={this.onChange} onSubmit={this.onSubmitCities} />
            <SearchForm name='searchTerm' onChange={this.onChange} onSubmit={this.onSubmitSearch} />
          </div>
        </header>

        {this.state.locationSuggestions &&
          <div className='flex-wrapper'>
            {this.state.locationSuggestions.map(loc => (
              <Item className='item' key={loc.id} id={loc.id} name={loc.name} onClick={this.onClick} />
            ))}
          </div>
        }

        {this.state.cuisineSuggestions &&
          <div className='flex-wrapper'>
            {this.state.cuisineSuggestions.map(({ cuisine: { cuisine_id, cuisine_name } }) => (
              <Item className='item' key={cuisine_id} id={cuisine_id} name={cuisine_name} onClick={this.selectCuisine} />
            ))}
          </div>
        }
        {this.state.restaurantSuggestions &&
          <ul className='restaurant-wrapper'>
          {this.state.restaurantSuggestions.map(({ restaurant: { name, id, location, thumb, cuisines, average_cost_for_two, currency, timings, user_rating } }) => (
              <Link to={`restaurants/${id}`} key={id}>
                <li className='restaurant'>
                  <img src={thumb} />
                  <div>
                    <h4>{name}</h4>
                    <p>{location.locality}</p>
                  <div className='rating-wrapper'>
                    <div className='rating' style={{ backgroundColor: `#${user_rating.rating_color}` }}>{user_rating.aggregate_rating}</div>
                    <span>{user_rating.votes} votes</span>
                  </div>
                  </div>
                  <div>
                    <p><span className='details'>Cuisines:</span><span>{cuisines}</span></p>
                    <p><span className='details'>Cost for Two:</span>{currency}{average_cost_for_two}</p>
                    <p><span className='details'>Hours:</span>{timings}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        }
      </>
    )
  }
}