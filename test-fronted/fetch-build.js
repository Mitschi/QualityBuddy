const axios = require('axios');

export let build

export function fetchBuild(){
    axios.get("http://dummy.restapiexample.com/api/v1/employees")
    .then((response) => {
      build = response
    })
}
fetchBuild()
console.log(build)
//let build = JSON.parse(fetchBuild());