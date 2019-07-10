const axios = require('axios')
const dateformat = require('dateformat')

let response 
const date = []

async function getData() {
    response = await axios({
        url: 'http://localhost:4000/build/25171564',
        method: 'get'
      })
    
      response.data.forEach(element => {
        const buildDate = new Date(element.started_at)
        const formatedBuildDate = dateformat(buildDate, "yyyy-mm-dd")
        date.push({date: formatedBuildDate, state: element.state})
    });
    
    const result = Object.values(date.reduce((r, o) => {
        r[o.date] = r[o.date] || {date: o.date, passed : 0, failed: 0};
        if(o.state === 'passed'){
            r[o.date].passed ++;
        } else {
            r[o.date].failed ++;
        }
        
        return r;
      },{}));
    
      console.log(result)
}

getData()

