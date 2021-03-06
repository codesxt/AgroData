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
      },
      {
        name        : 'daysTempGT30Deg',
        description : 'Días con temperatura mayor a 30° C.'
      },
      {
        name        : 'daysTempGT34Deg',
        description : 'Días con temperatura mayor a 34° C.'
      },
      {
        name        : 'degreeDays',
        description : 'Grados día (base 10).'
      },
      {
        name        : 'coldHours',
        description : 'Horas con temperatura menor a 7° C.'
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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

module.exports.daysRainOver10mm = (req, res) => {
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
              if(+item.hourlyRainfall >= 10){
                hasDay = true;
              }
            })
            if(hasDay){
              daysCount += 1;
            }
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "daysRainOver10mm",
            value     : daysCount
          });
          return;
        }
      }
    )
  }
}

module.exports.totalRain = (req, res) => {
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
          let totalRain = 0;
          groups.forEach((item) => {
            item.data.forEach((item) => {
              totalRain += +item.hourlyRainfall;
            })
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "totalRain",
            value     : totalRain
          });
          return;
        }
      }
    )
  }
}

module.exports.daysWindOver5kmh = (req, res) => {
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
              if(+item.windSpeedMax >= 1.38889){
                hasDay = true;
              }
            })
            if(hasDay){
              daysCount += 1;
            }
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "daysWindOver5kmh",
            value     : daysCount
          });
          return;
        }
      }
    )
  }
}

module.exports.daysWindOver10kmh = (req, res) => {
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
              if(+item.windSpeedMax >= 2.77778){
                hasDay = true;
              }
            })
            if(hasDay){
              daysCount += 1;
            }
          })

          utils.sendJSONresponse(res, 200, {
            indicator : "daysWindOver10kmh",
            value     : daysCount
          });
          return;
        }
      }
    )
  }
}

module.exports.averageRelativeHumidity = (req, res) => {
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
          let averageHumidity = 0;
          let averageHumiditySum = 0;
          groups.forEach((item) => {
            let humiditySum = 0;
            let rowsCount   = 0;
            let dailyAverageHumidity = 0;
            item.data.forEach((item) => {
              humiditySum += +item.relativeHumidityAvg;
              rowsCount      += 1;
            })
            dailyAverageHumidity = (humiditySum / rowsCount);
            averageHumiditySum += dailyAverageHumidity;
          })
          averageHumidity = averageHumiditySum / groups.length;

          utils.sendJSONresponse(res, 200, {
            indicator : "averageRelativeHumidity",
            value     : averageHumidity
          });
          return;
        }
      }
    )
  }
}

module.exports.accumulatedSolarRadiation = (req, res) => {
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
          let totalRadiation = 0;
          groups.forEach((item) => {
            item.data.forEach((item) => {
              totalRadiation += (+item.solarRadiationMax *900);
            })
          })
          totalRadiation = totalRadiation / 1000000;

          utils.sendJSONresponse(res, 200, {
            indicator : "accumulatedSolarRadiation",
            value     : totalRadiation
          });
          return;
        }
      }
    )
  }
}

module.exports.evapotranspiration = (req, res) =>  {
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
    req.query.to = moment(req.query.to).add(1, 'day').format('YYYY-MM-DD');
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
          let totalEvapotranspiration = 0;
          let rse = [17.7,15.95,13.35,10.1,7.6,6.4,6.85,8.9,11.95,14.9,17.1,18.1];
          groups.forEach((item) => {
            item.data.forEach((item) => {
              let lastHour = new Date(item.date).toLocaleTimeString();
              if (lastHour === '8:00:00 PM') {
                console.log(lastHour);
                console.log(item);
                totalEvapotranspiration += 0.0023 * (+item.airTemperatureAvg + 17.78) * rse[new Date().getMonth()] * Math.pow((+item.temperatureMax - +item.temperatureMin), 0.5);
                console.log("Evapo: " + totalEvapotranspiration + ", Tprom: " + item.airTemperatureAvg + ", RSE: " + rse[new Date().getMonth()] + ", Tmax: " + item.temperatureMax + ", Tmin: " + item.temperatureMin);
              }
            })
          })
          console.log(totalEvapotranspiration.toFixed(2));
          totalEvapotranspiration = totalEvapotranspiration.toFixed(2);

          utils.sendJSONresponse(res, 200, {
            indicator : "evapotranspiration",
            value     : totalEvapotranspiration
          });
          return;
        }
      }
    )
  }
}
