// API by city name 


//Current city div - city name - name //icon next to city and time - weather.icon
//temp - main.temp
//humidity% - main.humidity
//wind - wind.speed
//uv index - ?????

//city
// let city = $("#searchCity").val().trim();
// API Key
const apiKey = "&appid=5ae8fdb6f671ad1d9e8649e858708015";
// API url
// const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=&units=imperial&appid=" + city + apiKey;

//search city & history
var searches = JSON.parse(localStorage.getItem("searches")) || [];

function searchHistory() {
    $("#history").empty();

    for (var i = 0; i < searches.length; i++) {
        $("#history").prepend($("<p class='searchCity'>").text(searches[i]));
    }
}
$("form").on("submit", function (event) {
    event.preventDefault();
    var city = $("#searchCity").val().trim();
    searches.push(city);
    localStorage.setItem("searches", JSON.stringify(searches));
    $("#searchCity").val("");
    var quearyUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url: quearyUrl,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            console.log(response.name)
            console.log(response.weather[0].icon)
            console.log(response.main.temp)
            console.log(response.main.humidity)
            console.log(response.wind.speed)
            // console.log(response.main.uv) still not working
            searchHistory();
        });

    $(document).on("click", ".searchCity", function () {
        console.log($(this).text());

        currentCity();
    })
});
searchHistory();
//current city display
function currentCity() {
    $("#currentCity").empty()

    $("#currentCity").append($("<h3>").text(response.name))
    $("#currentCity").append($("<h4>").text(date.toLocaleDateString('en-US')))
    $("#currentCity").append($("<p>").text("Temp: " + response.main.temp + " °F"))
    $("#currentCity").append($("<p>").text("Humidity: " + response.main.humidity + "%"))
    $("#currentCity").append($("<p>").text("Wind Speed: " + response.wind.speed + " MPH"))
    console.log
    // $("#CurrentCity").append($("<p>").text("UV Index: " + ???)) also add color???
}
//5 day forecast