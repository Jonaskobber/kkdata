import React, { Component, PropTypes } from 'react'

import { HistogramApp, HistogramAxis, NumberMinMax } from '../components'
import { loadCSVData } from '../helpers'

export class Histogram extends Component {
  constructor (props) {
    super(props)

    this.getHistogramInfo = this.getHistogramInfo.bind(this)
    this.filterData = this.filterData.bind(this)
    this.changeFilter = this.changeFilter.bind(this)

    this.state = {
      bars: props.bars,
      data: props.data,
      filter: props.filter
    }
  }

  componentWillMount () {
    loadCSVData('data/' + this.props.params.url + '.csv', (err, data) => {
      if (err) console.log(err)
      else {
        let filteredData = []
        data.map((d) => {
          for(let i = 0; i < d.PERSONER; i++) {
            filteredData.push({
              alder: d.ALDER
            })
          }
        })
        this.setState({
          data: filteredData
        })
      }
    })
  }

  getHistogramInfo (xScale, yScale, bars) {
    this.setState({
      xScale,
      yScale,
      bars
    })
  }

  makeHistogram () {
    let params = {
      axisMargin: this.props.axisMargin,
      bins: 10,
      data: this.filterData(),
      height: this.props.height,
      leftMargin: 25,
      topMargin: 25,
      width: this.props.width,
      value: (d) => {
        return d.alder
      }
    }

    if(!this.state.xScale)
      params.returnInfo = this.getHistogramInfo

    return (
      <HistogramApp
        {...params} />
    )
  }

  makeAxis (orient) {
    if (this.state.bars.length) {
      let params = {
        bars: this.state.bars,
        xScale: this.state.xScale,
        yScale: this.state.yScale,
        height: this.props.height,
        axisMargin: this.props.axisMargin,
        leftMargin: 25,
        topMargin: 25,
        orient
      }

      return (
        <HistogramAxis
          {...params} />
      )
    }
  }

  filterData () {
    let result
    for(var key in this.state.filter) {
      if (this.state.filter.hasOwnProperty(key)) {
        result = this.state.data.filter(this.state.filter[key])
      }
    }
    return result
  }

  changeFilter (filterChange, filterName) {
    let filter = this.state.filter
    filter[filterName] = filterChange
    this.setState({
      filter
    })
  }

  render () {
    if(!this.state.data.length)
      return (
        <div>
          <p>Data loades</p>
        </div>
      )

    return (
      <div>
        <p>Borgere</p>
        <svg width={this.props.width + 50} height={this.props.height + 50}>
          {this.makeHistogram()}
          {this.makeAxis('bottom')}
        </svg>
        <NumberMinMax
          min={parseInt(this.state.data[0].ALDER)}
          max={parseInt(this.state.data[this.state.data.length - 1].ALDER)}
          updateFilter={this.changeFilter}
          query={'ALDER'}
          filterName={'age'} />
      </div>
    )
  }
}
Histogram.propTypes = {
  axisMargin: PropTypes.number,
  bars: PropTypes.array,
  data: PropTypes.array,
  filter: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
  params: PropTypes.object
}
Histogram.defaultProps = {
  bars: [],
  data: [],
  axisMargin: 80,
  height: 500,
  width: 700,
  filter: {
    standard: () => {
      return true
    }
  }
}
