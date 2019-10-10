import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import './style.scss'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      locationSuggestions: null,
      searchCities: '',
      selectedCity: '',
      searchTerm: '',
      cuisineSuggestions: null,
      selectedCuisine: ''
    }

    this.header = { headers: { 'user-key': process.env.ZOMATO_TOKEN } }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.selectCuisine = this.selectCuisine.bind(this)
    this.onSearchCities = this.onSearchCities.bind(this)
    this.onSubmitCities = this.onSubmitCities.bind(this)
  }

  // componentDidMount() {
  //   axios.get('https://developers.zomato.com/api/v2.1/cities?q=london', this.header)
  //     .then(res => this.setState({ locationSuggestions: res.data.location_suggestions }))
  //     .catch(err => console.log(err))
  // }

  getCuisine(id) {
    axios.get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${id}`, this.header)
      .then(res => this.setState({ cuisineSuggestions: res.data.cuisines }))
      .catch(err =>console.log(err))
  }

  selectCuisine(id) {
    this.setState({ selectedCuisine: id })
  }

  onClick(id) {
    this.setState({ selectedCity: id })
    this.getCuisine(id)
  }

  onChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  onSearchCities(e) {
    this.setState({ searchCities: e.target.value })
  }

  onSubmitCities(e) {
    e.preventDefault()
    axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${this.state.searchCities}`, this.header)
      .then(res => this.setState({ locationSuggestions: res.data.location_suggestions }))
      .catch(err => console.log(err))
  }

  onSubmit(e) {
    e.preventDefault()
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.selectedCity}&entity_type=city&q=${this.state.searchTerm}&cuisines=${this.state.selectedCuisine}`
    console.log(url)    
    axios.get(url, this.header)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
  
  render() {
    console.log(this.state)
    return (
      <>
        <form onChange={this.onSearchCities} onSubmit={this.onSubmitCities}>
          <label>City</label>
          <input placeholder='search cities'></input>
          <button type='submit'>Search</button>
        </form>

        {this.state.locationSuggestions &&
          <ul>
            {this.state.locationSuggestions.map(loc => (
              <li key={loc.id} onClick={() => this.onClick(loc.id)}>{loc.name}</li>
            ))}
          </ul>
        }

        <form onChange={this.onChange} onSubmit={this.onSubmit}>
          <label>Search</label>
          <input placeholder='search'/>
          <button type='submit'>Search</button>
        </form>

        {this.state.cuisineSuggestions &&
          <ul>
            {this.state.cuisineSuggestions.map((cuisine, i) => {
              return <li key={cuisine.cuisine.cuisine_id} onClick={() => this.selectCuisine(cuisine.cuisine.cuisine_id)}>{cuisine.cuisine.cuisine_name}</li>
            })}
          </ul>
        }
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
