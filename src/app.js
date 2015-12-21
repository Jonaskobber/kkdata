import './styles/main.scss'

import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

import * as containers from './containers'

const {
  Histogram,
  Piechart
} = containers

class App extends Component {
  render () {
    return (
      <div>
        <div>
          <h1>App</h1>
          <Link to='/piechart/skatteliste'>Skat</Link>
          <Link to='/histogram/borgere'>Borgere</Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}
App.propTypes = {
  children: PropTypes.object
}

render(
  <Router>
    <Route path='/' component={App}>
      <Route path='/piechart/:url' component={Piechart} />
      <Route path='/histogram/:url' component={Histogram} />
    </Route>
  </Router>,
  document.getElementById('app')
)
