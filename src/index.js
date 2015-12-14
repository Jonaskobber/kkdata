import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  render () {
    return (
      <div>
        <p>App</p>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('app')
)
