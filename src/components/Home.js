import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Item from './Item'
import SearchForm from './SearchForm'
import RestaurantList from './RestaurantList'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      searchCities: '',
      citySuggestions: null,
      selectedCity: '',
      cuisineSuggestions: null,
      selectedCuisine: '',
      searchTerm: '',
      restaurantSuggestions: null,
      selectedRestauarant: ''
    }

    this.header = { headers: { 'user-key': process.env.ZOMATO_TOKEN } }

    this.onChange = this.onChange.bind(this)
    this.selectCity = this.selectCity.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.selectCuisine = this.selectCuisine.bind(this)
    this.submitCities = this.submitCities.bind(this)
  }

  onChange({ target: { name, value } }) {
    console.log(name)

    this.setState({ [name]: value })
  }

  submitCities(e) {
    e.preventDefault()
    axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${this.state.searchCities}`, this.header)
      .then(res => this.setState({ citySuggestions: res.data.location_suggestions }))
      .catch(err => console.log(err))
  }

  submitSearch(e) {
    e.preventDefault()
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.selectedCity}&entity_type=city&q=${this.state.searchTerm}&cuisines=${this.state.selectedCuisine}`
    axios.get(url, this.header)
      .then(res => this.setState({ restaurantSuggestions: res.data.restaurants }))
      .catch(err => console.log(err))
  }

  selectCity(id) {
    this.setState({ selectedCity: id })
    this.getCuisine(id)
  }

  getCuisine(id) {
    axios.get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${id}`, this.header)
      .then(res => this.setState({ cuisineSuggestions: res.data.cuisines }))
      .catch(err => console.log(err))
  }

  selectCuisine(id) {
    this.setState({ selectedCuisine: id })
  }

  render() {
    const { citySuggestions, cuisineSuggestions, restaurantSuggestions } = this.state
    return (
      <>
        <header>
          <Link to='/'>
            <div className='logo'>Nomato</div>
          </Link>
          <div className='search-bar'>
            <SearchForm name='searchCities' onChange={this.onChange} onSubmit={this.submitCities} />
            <SearchForm name='searchTerm' onChange={this.onChange} onSubmit={this.submitSearch} />
          </div>
        </header>

        {citySuggestions &&
          <div className='flex-wrapper'>
            {citySuggestions.map(loc => (
              <Item className='item' key={loc.id} { ...loc } onClick={this.selectCity} />
            ))}
          </div>
        }

        {cuisineSuggestions &&
          <div className='flex-wrapper'>
            {cuisineSuggestions.map(({ cuisine: { cuisine_id, cuisine_name } }) => (
              <Item className='item' key={cuisine_id} id={cuisine_id} name={cuisine_name} onClick={this.selectCuisine} />
            ))}
          </div>
        }

        {restaurantSuggestions &&
          <section>
            <ul className='restaurant-wrapper'>
              {restaurantSuggestions.map(({ restaurant }) => (
                <RestaurantList key={restaurant.id} { ...restaurant }/>
              ))}
            </ul>
          </section>
        }
      </>
    )
  }
}