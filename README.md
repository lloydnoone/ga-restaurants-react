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

The website is deployed on GitHub pages and it can be found here- https://lloydnoone.github.io/pacman-clone/

## Getting Started

Use the clone button to download the source code. install npm packages in the root director using "npm i" in the src directory of the project. Then "npm run serve" to run on a local server. The assets used in this project are stored in the assets folder. They include gifs, png files and fonts.

## How It Works

The zomato api holds information on restaurants around the world along with any details on them you might want. This inlcudes photos, business details and even user reviews. The Nomato project we created serves this information up in a very similair way to the actual Zomato website.

![](https://github.com/lloydnoone/ga-restaurants-react/blob/master/Screenshot%202019-10-14%20at%2021.38.44.png?raw=true)



The ghosts have 3 modes of movement. 

* Chase
  > In chase the ghosts target pacman by comapring their postion to pacmans position on the gameboard in a staight line. This means they sometimes go the wrong way and is an intentional part of the game mechanics.
  
* scatter
  > In scatter, the ghosts will go to there respective corner and circle around until after a few seconds they put back in chase mode.
  
* frightened 
  > firghtened mode is activated when pacman eats the larger energizer dots. In this mode the ghosts take random turns and      move more slowly. This gives pacman a chance to chase down the ghosts and eat them for extra points.
  
A timer changes the ghosts from chase to scatter. because of this the ghosts attack in waves. The time remaining in each mode is remembered during frightened mode so that they go back to there previous state and carry on where they left off.

an example of the ghosts movement function-

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

Upon eating all the pips, the player wins and is moved on to the next level. The stage is the same but the ghosts will now be moving faster. the ghosts speed will increase everytime the stage is cleared. 

## Challenges and future improvements

The main challenge of the project was to create a ghost AI that was similair to the original pacman. I recreated this in much the same way by giving the ghosts the ability to change targe tiles depending on which mode they are in. 

The part where i spent the most time and had the most difficulty was organizing the timers and intervals which control these states. They switch back and forth and are interupted by the frightened state and should resume where they left off. The functions handling this are complicated and need refactoring somehow.

The main future improvement for the project would be to expand on the level editor that i created for my own convenience. It would be a great idea to make this more user friendly and accesible to users. This would give a whole new feature where players could make there own stages for the game and save them.

![](leveleditor.gif)

## Author 

Lloyd Noone - portfolio: lloydnoone.com
