import React, { Component, PropTypes } from 'react'

import { PieApp } from '../components'

import { loadCSVData } from '../helpers'

export class Piechart extends Component {
  constructor (props) {
    super(props)

    this.filterData = this.filterData.bind(this)

    this.state = {
      data: props.data,
      filter: props.filter
    }
  }

  componentWillMount () {
    loadCSVData('data/' + this.props.params.url + '.csv', (err, data) => {
      if (err) console.log(err)
      else
        this.setState({
          data
        })
    })
  }

  filterData () {
    let {
      data,
      filter } = this.state
    for(var key in filter) {
      if(filter.hasOwnProperty(key)) {
        data = data.filter(filter[key])
      }
    }
    return data
  }

  render () {
    if(!this.state.data.length)
      return (
        <p>Loader</p>
      )

    return (
      <PieApp
        colorRange={['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']}
        data={this.filterData()}
        height={500}
        width={500}
        value={(d) => {
          return parseInt(d.Selskabsskat)
        }} />
    )
  }
}
Piechart.propTypes = {
  data: PropTypes.array,
  filter: PropTypes.object,
  params: PropTypes.object
}
Piechart.defaultProps = {
  data: [],
  filter: {
    standard: () => {
      return true
    },
    standardAgain: (d) => {
      if(d.Selskabsskat == 1381)
        return true
      else
        return false
    }
  }
}
