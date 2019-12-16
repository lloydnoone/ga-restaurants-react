![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Nomato

![image](https://github.com/lloydnoone/ga-restaurants-react/blob/master/Screenshot%202019-10-14%20at%2021.27.41.png?raw=true)

This was a project assigned to me by General Assembly during a software enginerring immersive course. The purpose of the project was to solidify the skills we learnt in the second module. This inluded learning react and interacting with public API's. We were to put them to use in a project of our choice. 

After learning react for a week and covering the use of API's in the same amount of time we were given a day and a half to complete this project. I worked on this pair programming with another student on the course.

It is a an attempt to receate the Zomato website using their own API. we did this because we thought it would be a useful exercise in recreating a professional front-end. 

## Built With

1. HTML5
2. CSS3
3. JavaScript
4. React 16
5. Zomato API
6. GitHub

## Deployment

The website is deployed on Heroku and it can be found here- https://nomatosearch.herokuapp.com

## Getting Started

Use the clone button to download the source code. install npm packages in the root director using "npm i" in the src directory of the project. Then "npm run serve" to run on a local server. The assets used in this project are stored in the assets folder. They include gifs, png files and fonts.

## How It Works

The zomato api holds information on restaurants around the world along with any details on them you might want. This inlcudes photos, business details and even user reviews. The Nomato project we created serves this information up in a very similair way to the actual Zomato website.

![](https://github.com/lloydnoone/ga-restaurants-react/blob/master/Screenshot%202019-10-14%20at%2021.38.44.png?raw=true)


The search function works by displaying city choices that were filtered from the API using the users location input. The user then select the specific city they want from the options that are rendered. They are then presented with a selection of cuisines that are available in that city. 

At this point the user can search the whole city inlcuding all cuisines or choose one or as many of them as they like. if they press search now all restaurants including those cuisines will be displayed. The search input can be used for other search terms such as dishes or names of restaurants for example. They will be added to the query that filters the results.



```javascript
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
```

The results appear below on the same page. Clicking on one of the result will take the user to a page that shows more detailed information on that particular restaurant. This page required reaching and mapping over many nested levels of data for things like reviews etc. I also filtered to remove reviews with no comments.

```javascripts
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
```

![](leveleditor.gif)

## Wins and Blockers

The main challenge in this project was to get all the information we need by making correct API calls in an efficient way. 

The part where i spent the most time and had the most difficulty was correctly mapping though nested objects and arrays in which, each level of nested data could also be an object or array.  

A big win for me on this project was getting experience pair coding with somebody else. It was a new experience for me. My fears were proved wrong and me and Chawit both agree that we worked very well together and we are both more than happy with the end result.

## Future Features

The main future improvement for the project would be moslty styling. the way the filtered result of city and cuisine is displayed to the user is not great. I would change this to a scrollable dropdown list and aim or something that more closely resembles the Zomato website. Some of the code should be refactored into seperate components.

## Key Learnings

With less than 48hrs time management was again, a big factor in this project. In order to make use of the time as effectively as we could, division of labour was important and things like coordinating our breaks helped. 

We used a screen sharing plugin for vscode to imporve productivity but hand problems when both trying to contribute at the same time. It was buggy and we ended up with a lot of confusion when working with the same file and sometimes even when working in seperate files. 

It was also my first experience working with public APIs. I realised the importance of choosing the correct API by looking at popularity, quality of documentation and whether it was suitable for our needs. I also gained experience in drilling down into multiple nested fields of objects and arrays in order to get what we need from the JSON.


## Author 

Lloyd Noone - portfolio: lloydnoone.com
