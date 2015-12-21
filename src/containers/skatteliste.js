import React, { Component, PropTypes } from 'react'

import { PieApp } from '../components'

import { loadCSVData } from '../helpers'

export class Skatteliste extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  componentWillMount () {
    loadCSVData('data/skatteliste.csv', (err, result) => {
      if (err) console.log(err)
      else {
        let data = []
        data[0] = {}
        data[0].antal = 0
        data[1] = {}
        data[1].antal = 0
        result.map((d) => {
          if(parseInt(d.Selskabsskat) === 0)
            data[0].antal++
          else
            data[1].antal++
        })
        this.setState({
          data
        })
      }
    })
  }

  render () {
    if(!this.state.data.length)
      return (
        <p>Loader</p>
      )

    return (
      <svg width={700} height={500}>
        <PieApp
          colorRange={['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']}
          data={this.state.data}
          height={500}
          width={700}
          value={(d) => {
            return d.antal
          }} />
      </svg>
    )
  }
}
Skatteliste.propTypes = {
  data: PropTypes.array
}
Skatteliste.defaultProps = {
  data: []
}
