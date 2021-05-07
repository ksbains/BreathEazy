var selection = document.querySelector('select')
selection.addEventListener('change', getUserData)


function getUserData(){
    var username = document.getElementById("users").value;
    // make a query to the mongo db database, get the 
    let apiPath = 'https://breatheazy-api.herokuapp.com/mongo/sensor/'
    //let apiPath = 'http://localhost:3000/mongo/sensor/'
    apiPath = apiPath + username;
    console.log(apiPath)
    $.getJSON(apiPath, function (data){
        aqiData = data[0]
        console.log(aqiData)
        let timeRow = document.getElementById("timeRow")
        let usernameRow = document.getElementById("usernameRow")
        let pm2_5Row = document.getElementById("pm2_5Row")
        let pm10Row = document.getElementById("pm10Row")
        let humRow = document.getElementById("humRow")
        let tempRow = document.getElementById("tempRow")
        let idRow = document.getElementById("idRow")

        timeRow.innerText = aqiData.dateTimeData;
        usernameRow.innerText = aqiData.username;
        pm2_5Row.innerText = aqiData.pm2_5Data;
        pm10Row.innerText = aqiData.pm10Data;
        humRow.innerText = aqiData.humidityData;
        tempRow.innerText = aqiData.tempData;
        idRow.innerText = aqiData._id;
    })
    
}