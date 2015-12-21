import React, { Component, PropTypes } from 'react'

export class NumberMinMax extends Component {
  constructor () {
    super()
    this.checkMinMax = this.checkMinMax.bind(this)
  }

  checkMinMax () {
    let min = parseInt(this.refs.minimum.value)
    let max = parseInt(this.refs.maximum.value)
    if(min <= max)
      this.props.updateFilter((d) => {
        if (d[this.props.query] > min && d[this.props.query] < max)
          return true
      }, this.props.filterName)
  }

  render () {
    return (
      <div>
        <input
          type='number'
          ref='minimum'
          defaultValue={this.props.min} />
        <input
          type='number'
          ref='maximum'
          defaultValue={this.props.max} />
        <button
          onClick={this.checkMinMax}>Gem</button>
      </div>
    )
  }
}
NumberMinMax.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  updateFilter: PropTypes.func,
  query: PropTypes.string,
  filterName: PropTypes.string
}
