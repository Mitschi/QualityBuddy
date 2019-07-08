const axios = require('axios');



async function fetchBuild(){
    let build
    //return axios.get("http://dummy.restapiexample.com/api/v1/employees");
    await axios({
        method: 'get',
        url: 'http://dummy.restapiexample.com/api/v1/employees',
        responseType: 'JSON'
      })
        .then((response) =>  {
          build = response
        })
        .catch((error) =>{
            console.error(error)
        })
        ;
        return await build
}
console.log(fetchBuild())
//let build = JSON.parse(fetchBuild());