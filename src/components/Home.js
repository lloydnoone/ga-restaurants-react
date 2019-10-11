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
      selectedCuisines: [],
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
    const city = `entity_id=${this.state.selectedCity}&entity_type=city`
    const cuisines = `cuisines=${this.state.selectedCuisines.join(',')}`
    const url = `https://developers.zomato.com/api/v2.1/search?${city}&q=${this.state.searchTerm}&${cuisines}`
    console.log(url)
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
    let selectedCuisines
    if (this.state.selectedCuisines.includes(id)) {
      selectedCuisines = this.state.selectedCuisines.filter(cui => cui !== id)
    } else {
      selectedCuisines = [...this.state.selectedCuisines, id]
    }
    this.setState({ selectedCuisines })
  }

  render() {
    const { citySuggestions, cuisineSuggestions, restaurantSuggestions, selectedCity, selectedCuisines } = this.state
    return (
      <>
        <header>
          <Link to='/' className='logo'>Nomato</Link>
          <div className='search-bar'>
            <SearchForm className='searchCities' name='searchCities' onChange={this.onChange} onSubmit={this.submitCities} />
            <SearchForm name='searchTerm' onChange={this.onChange} onSubmit={this.submitSearch} />

            <div className='flex-wrapper city-list'>
              {citySuggestions && citySuggestions.map(loc => (
                <Item className={`item ${selectedCity === loc.id ? 'active' : ''}`} key={loc.id} {...loc} onClick={this.selectCity} />
                ))
              }
            </div>
          </div>
        </header>
        <main>
          {cuisineSuggestions &&
            <div className='flex-wrapper'>
              {cuisineSuggestions.map(({ cuisine: { cuisine_id, cuisine_name } }) => (
                <Item className={`item ${selectedCuisines.includes(cuisine_id) ? 'active' : ''}`} key={cuisine_id} id={cuisine_id} name={cuisine_name} onClick={this.selectCuisine} />
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
        </main>
      </>
    )
  }
}