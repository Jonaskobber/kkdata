/**
 * Class for creating a pie. Pass parameters as React props. This class will automatically include PieArch and pass required props.<br><br>
 * @constructor PieArch
 * @param {number} height - Height of the SVG area
 * @param {number} width - Width of the SVG area
 * @param {array} data - An array of the data over which to create the pie
 * @param {function} arc - A d3.svg.arc() with outer and inner radius set
 * @param {string} color - The hexidecimal color value of this arch
*/

import React, { Component, PropTypes } from 'react'

export class PieArch extends Component {
  render () {
    return (
      <g transform={'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')'}>
        <path d={this.props.arc(this.props.data)} fill={this.props.color}></path>
      </g>
    )
  }
}
PieArch.propTypes = {
  arc: PropTypes.func,
  color: PropTypes.string,
  data: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number
}
