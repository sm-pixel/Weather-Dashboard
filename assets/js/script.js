// API by city name 


//Current city div - city name - name //icon next to city and time - weather.icon
//temp - main.temp
//humidity% - main.humidity
//wind - wind.speed
//uv index - ?????

//user search
var city = $("#searchCity").val().trim();
// API Key
const apiKey = "&appid=5ae8fdb6f671ad1d9e8649e858708015";
// API url
// var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=&units=imperial&appid=" + city + apiKey;

//search city
$("#searchCity").on("click", function (event) {
    event.preventDefault()
    var city = $("#searchCity").val().trim()
    $("searchCity").val("")
    var quearyUrl = "https://api.openweathermap.org/data/2.5/weather?q=&units=imperial&" + city + apiKey;

    $.ajax({
        url: quearyUrl,
        method: "GET"
    })
    .then(function (response){
        console.log(response)
        console.log(response.name)
        console.log(response.weather.icon)
        console.log(response.main.temp)
        console.log(response.main.humidity)
        console.log(response.wind.speed)
        console.log(response.main.uv)
    })
})

//search history

//current city display

//5 day forecast