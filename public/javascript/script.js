var selection = document.querySelector('select')
selection.addEventListener('change', getUserData)

function ajaxPromise(apiPath){
    return $.ajax({
        url:apiPath,
        dataType: 'json',
        type: 'GET'
    })
}

function getUserData(){
    let timeRow = document.getElementById("timeRow")
    let usernameRow = document.getElementById("usernameRow")
    let pm2_5Row = document.getElementById("pm2_5Row")
    let pm10Row = document.getElementById("pm10Row")
    let humRow = document.getElementById("humRow")
    let tempRow = document.getElementById("tempRow")
    let idRow = document.getElementById("idRow")
    
    
    
    
    var username = document.getElementById("users").value;
    // make a query to the mongo db database, get the 
    //let apiPath = 'https://breatheazy-api.herokuapp.com/mongo/sensor/'
     let apiPath = 'http://localhost:3000/mongo/sensor/'
    apiPath = apiPath + username;
    var promised = ajaxPromise(apiPath);
    promised.done((data) =>{
        aqiData = data[0]    
        timeRow.innerText = aqiData.dateTimeData;
        usernameRow.innerText = aqiData.username;
        pm2_5Row.innerText = aqiData.pm2_5Data;
        pm10Row.innerText = aqiData.pm10Data;
        humRow.innerText = aqiData.humidityData;
        tempRow.innerText = aqiData.tempData;
        idRow.innerText = aqiData._id;    
    })
}
