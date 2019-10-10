import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './style.scss'

import Home from './components/Home'
import Restaurant from './components/Restaurant'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='restaurants/:id' component={Restaurant}/>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))
