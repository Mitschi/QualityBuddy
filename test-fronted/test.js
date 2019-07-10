const axios = require('axios')

let response 
const date = []

async function getData() {
    response = await axios({
        url: 'http://localhost:4000/build',
        method: 'get'
      })
    
      response.data.forEach(element => {
        const buildDate = new Date(element.started_at)
        date.push({date: buildDate.toISOString(), state: element.state})
    });
    
    const result = Object.values(date.reduce((r, o) => {
        r[o.Date] = r[o.Date] || {Date: o.date, passed : 0, failed: 0};
        if(o.state === 'passed'){
            r[o.Date].passed ++;
        } else {
            r[o.Date].failed ++;
        }
        
        return r;
      },{}));
    
      console.log(result)
}

getData()

