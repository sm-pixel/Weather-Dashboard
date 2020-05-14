//Api key
const apiKey = "&appid=5ae8fdb6f671ad1d9e8649e858708015";

var searches = JSON.parse(localStorage.getItem("searches")) || [];
function searchHistory() {
    $("#history").empty();
    if (searches.length === 0) return;

    for (var i = 0; i < searches.length; i++) {
        $("#history").prepend($("<p class='searchCity'>").text(searches[i]));
    }
    currentCity(searches[searches.length - 1]);
}
$("form").on("submit", function (event) {
    event.preventDefault();
    var city = $("#searchCity").val().trim();
    searches.push(city);
    localStorage.setItem("searches", JSON.stringify(searches));
    $("#searchCity").val("");
    searchHistory();
});
$("#history").on("click", ".searchCity", function () {
    var city = $(this).text();

    currentCity(city);
});
//current city display
function currentCity(city) {
    var quearyUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial" +
        apiKey;
    $.ajax({
        url: quearyUrl,
        method: "GET",
    }).then(function (response) {
        $.get("https://api.openweathermap.org/data/2.5/uvi?"+apiKey+"&lat="+response.coord.lat+"&lon="+response.coord.lon, function (uv) {
            console.log(response);
            console.log(uv);
            console.log(response.weather[0].icon);
            console.log(response.main.temp);
            console.log(response.main.humidity);
            console.log(response.wind.speed);
            

            $("#currentCity").empty();
            var newH3 = $("<h3>").text(response.name + " (" + moment.unix(response.dt).format("l") + ")")
            var newImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
            newH3.append(newImage)
            $("#currentCity").append(newH3)
            $("#currentCity").append(
                $("<p>").text("Temp: " + response.main.temp + " °F")
            );
            $("#currentCity").append(
                $("<p>").text("Humidity: " + response.main.humidity + "%")
            );
            $("#currentCity").append(
                $("<p>").text("Wind Speed: " + response.wind.speed + " MPH")
            );
            $("#currentCity").append($("<p>").text("UV Index: " + uv.value)) 
        })
    });
    forecastFive(city);
}
//5 day forecast
function forecastFive(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        $("#forecast").empty();
        for (let i = 0; i < response.list.length; i++) {

             var currHour = response.list[i]

             if(currHour.dt_txt.includes("12:00:00")){
                 console.log(currHour)
                 var newH5 = $("<h5>").text((moment.unix(currHour.dt).format("l")))
                 $("#forecast").append(newH5);
                 $("#forecast").append(
                    $("<p>").text("Temp: " + currHour.main.temp + " °F")
                );
                $("#forecast").append(
                    $("<p>").text("Humidity: " + currHour.main.humidity + "%"));
             }
            
        }
    });
}

searchHistory();
