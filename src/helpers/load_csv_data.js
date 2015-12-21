/**
 * Function for loading data from a CSV file and returning an array of objects containing the data.<br><br>
 * This helper depends on d3.
 * @function
 * @name loadCSVData
 * @param {string} url - Location of the CSV file
 * @param {function} callback - This function will return (err, result)
 */

import d3 from 'd3'

export function loadCSVData (url, callback) {
  d3.csv(url)
  .row((d) => {
    let obj = {}
    for (let key in d) {
      if(d.hasOwnProperty(key)) {
        obj[key] = d[key]
      }
    }
    return obj
  })
  .get((err, result) => {
    if (err)
      callback(err)
    else
      callback(null, result)
  })
}
