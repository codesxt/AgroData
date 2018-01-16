const utils = require('./utils');
const request = require('request');
const parseString = require('xml2js').parseString;
const moment = require('moment');
const BASE_URL = 'http://localhost:3111';

let groupDataByDays = (data) => {
  let groups = [];
  if(data){
    let lastDate = moment.utc(data[0].date);
    let newGroup = {
      date : lastDate,
      data : []
    }
    data.forEach((item) => {
      let newDate = moment.utc(item.date);
      if(newDate.diff(lastDate, 'days')==0){
        newGroup.data.push(item);
      }else{
        lastDate = moment.utc(item.date);
        groups.push(newGroup);
        newGroup = {
          date : lastDate,
          data : []
        }
      }
    })
  }
  return groups;
}

module.exports.getIndicators = (req, res) => {
  utils.sendJSONresponse(res, 200, {
    indicators : [
      {
        name        : 'daysTempGT25Deg',
        description : 'Días con temperatura mayor a 25° C.'
      }
    ]
  });
}

module.exports.daysTempGT25Deg = (req, res) => {
  console.log(req.query);
  console.log(req.params);
  if(!(req.query.to && req.query.from)){
    utils.sendJSONresponse(res, 400, {
      error     : "Missing parameters."
    });
    return;
  }else if (!moment(req.query.to).isValid() || !moment(req.query.from).isValid()) {
    utils.sendJSONresponse(res, 400, {
      error     : "Invalid dates."
    });
    return;
  }else{
    request.get(BASE_URL+'/api/v1/agromet/history/'+req.params.stationId+'?from='+req.query.from+'&to='+req.query.to,
      (error, response, body) => {
        if(error){
          console.log(error);
          utils.sendJSONresponse(res, 404, {
            message: "Data not found."
          });
          return;
        }else{
          let data = JSON.parse(body).data;
          let groups = groupDataByDays(data);
          let daysCount = 0;
          groups.forEach((item) => {
            let hasDay = false;
            item.data.forEach((item) => {
              if(+item.temperatureMax >= 25){
                hasDay = true;
              }
            })
            if(hasDay){
              daysCount += 1;
            }
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "daysTempGT25Deg.",
            value     : daysCount
          });
          return;
        }
      }
    )
  }
}

module.exports.daysTempGT30Deg = (req, res) => {
  console.log(req.query);
  console.log(req.params);
  if(!(req.query.to && req.query.from)){
    utils.sendJSONresponse(res, 400, {
      error     : "Missing parameters."
    });
    return;
  }else if (!moment(req.query.to).isValid() || !moment(req.query.from).isValid()) {
    utils.sendJSONresponse(res, 400, {
      error     : "Invalid dates."
    });
    return;
  }else{
    request.get(BASE_URL+'/api/v1/agromet/history/'+req.params.stationId+'?from='+req.query.from+'&to='+req.query.to,
      (error, response, body) => {
        if(error){
          console.log(error);
          utils.sendJSONresponse(res, 404, {
            message: "Data not found."
          });
          return;
        }else{
          let data = JSON.parse(body).data;
          let groups = groupDataByDays(data);
          let daysCount = 0;
          groups.forEach((item) => {
            let hasDay = false;
            item.data.forEach((item) => {
              if(+item.temperatureMax >= 30){
                hasDay = true;
              }
            })
            if(hasDay){
              daysCount += 1;
            }
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "daysTempGT30Deg.",
            value     : daysCount
          });
          return;
        }
      }
    )
  }
}

module.exports.daysTempGT34Deg = (req, res) => {
  console.log(req.query);
  console.log(req.params);
  if(!(req.query.to && req.query.from)){
    utils.sendJSONresponse(res, 400, {
      error     : "Missing parameters."
    });
    return;
  }else if (!moment(req.query.to).isValid() || !moment(req.query.from).isValid()) {
    utils.sendJSONresponse(res, 400, {
      error     : "Invalid dates."
    });
    return;
  }else{
    request.get(BASE_URL+'/api/v1/agromet/history/'+req.params.stationId+'?from='+req.query.from+'&to='+req.query.to,
      (error, response, body) => {
        if(error){
          console.log(error);
          utils.sendJSONresponse(res, 404, {
            message: "Data not found."
          });
          return;
        }else{
          let data = JSON.parse(body).data;
          let groups = groupDataByDays(data);
          let daysCount = 0;
          groups.forEach((item) => {
            let hasDay = false;
            item.data.forEach((item) => {
              if(+item.temperatureMax >= 34){
                hasDay = true;
              }
            })
            if(hasDay){
              daysCount += 1;
            }
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "daysTempGT34Deg.",
            value     : daysCount
          });
          return;
        }
      }
    )
  }
}

module.exports.degreeDays = (req, res) => {
  console.log(req.query);
  console.log(req.params);
  if(!(req.query.to && req.query.from)){
    utils.sendJSONresponse(res, 400, {
      error     : "Missing parameters."
    });
    return;
  }else if (!moment(req.query.to).isValid() || !moment(req.query.from).isValid()) {
    utils.sendJSONresponse(res, 400, {
      error     : "Invalid dates."
    });
    return;
  }else{
    request.get(BASE_URL+'/api/v1/agromet/history/'+req.params.stationId+'?from='+req.query.from+'&to='+req.query.to,
      (error, response, body) => {
        if(error){
          console.log(error);
          utils.sendJSONresponse(res, 404, {
            message: "Data not found."
          });
          return;
        }else{
          let data = JSON.parse(body).data;
          let groups = groupDataByDays(data);
          let degreeDays = 0;
          groups.forEach((item) => {
            let temperatureSum = 0;
            let rowsCount      = 0;
            item.data.forEach((item) => {
              temperatureSum += +item.airTemperatureAvg;
              rowsCount      += 1;
            })
            degreeDays += (temperatureSum / rowsCount) - 10;
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "degreeDays",
            value     : degreeDays
          });
          return;
        }
      }
    )
  }
}

module.exports.coldHours = (req, res) => {
  console.log(req.query);
  console.log(req.params);
  if(!(req.query.to && req.query.from)){
    utils.sendJSONresponse(res, 400, {
      error     : "Missing parameters."
    });
    return;
  }else if (!moment(req.query.to).isValid() || !moment(req.query.from).isValid()) {
    utils.sendJSONresponse(res, 400, {
      error     : "Invalid dates."
    });
    return;
  }else{
    request.get(BASE_URL+'/api/v1/agromet/history/'+req.params.stationId+'?from='+req.query.from+'&to='+req.query.to,
      (error, response, body) => {
        if(error){
          console.log(error);
          utils.sendJSONresponse(res, 404, {
            message: "Data not found."
          });
          return;
        }else{
          let data = JSON.parse(body).data;
          let groups = groupDataByDays(data);
          let coldHours = 0;
          groups.forEach((item) => {
            item.data.forEach((item) => {
              if(item.temperatureMin <= 7){
                coldHours += 0.25;
                console.log(item.date);
              }
            })
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "coldHours",
            value     : coldHours
          });
          return;
        }
      }
    )
  }
}
