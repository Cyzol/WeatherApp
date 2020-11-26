const key = "691499a8f0d63837c117390650a9ba93";

const weather = {
};

const map = L.map('map', {
    center: [52.7367900, 15.2287800],
    zoom: 13
});

// L.marker([52.7367900, 15.2287800]).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);


let popup = L.popup();


let theMarker = {};
async function onMapClick(e) {

    if (theMarker != undefined) {
        map.removeLayer(theMarker);
    }

    theMarker = L.marker(e.latlng).addTo(map);

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng['lat']}&lon=${e.latlng['lng']}&appid=${key}`;

    await fetch(api)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            weather.name = data.name;
            weather.temp = data.main.temp - 273.15;
            weather.pressure = data.main.pressure;
            weather.wind = data.wind.speed;
            weather.icon = data.weather[0].icon;
        })

    adv(weather.temp);
    popup
        .setLatLng(e.latlng)
        .setContent(
            '<img class="icon" src="https://openweathermap.org/img/wn/' + weather.icon + '@2x.png"<br>' +
            '<div class=popup-city><br>Miasto : ' + weather.name + '</div>' +
            "<div class=popup-temp><br>Temperatura : " + Math.floor(weather.temp) + " &#x2103</div>" +
            "<div class=popup-pressure><br>Ciśnienie : " + weather.pressure + " hPa</div>" +
            "<div class=popup-wind><br> Wiatr : " + weather.wind + " km/h</div>" +
            "<br><button id = button-wykres >Wykres</button>")
        .openOn(map)


    let wykresy = document.getElementById("test");
    document.getElementById("button-wykres").addEventListener("click", function () {
        wykresy.scrollIntoView();
    });
}




map.addEventListener("click", onMapClick);



function addCityFunction() {
    var node = document.createElement("LI");
    node.setAttribute('class', 'list-group-item');
    var textnode = document.createElement("a")
    textnode.setAttribute("class", "listItem");
    textnode.innerHTML = document.getElementById("addCityInput").value
    node.appendChild(textnode);
    document.getElementById("cityList").appendChild(node);
    refreshList();
}


//Ploty.js

const wykrCis = document.querySelector('.wykresCis');
const wykrTemp = document.querySelector('.wykresTemp');

wykrCis.addEventListener("click", WykresCisnienia);
wykrTemp.addEventListener("click", WykresTemperatur);

//DANE

let temptrace = [
    {
        type: 'bar',
        x: ['2020-05-11 00:00:00', '2020-05-11 03:00:00', '2020-05-11 06:00:00', '2020-05-11 09:00:00', '2020-05-11 12:00:00', '2020-05-11 15:00:00', '2020-05-11 18:00:00', '2020-05-11 21:00:00', '2020-05-12 00:00:00'],
        y: [5, 4, 3, 8, 11, 12, 11, 5, -1],
        marker: {
            color: 'blue',
            line: {
                width: 0.2
            }
        }
    }
];
let layout = {
    title: 'Wykres temperatur podczas calego dnia',
    font: { size: 18 }
};
let config = { responsive: true }

document.addEventListener('DOMContentLoaded', WykresTemperatur);
let pressuretrace = [
    {
        type: 'bar',
        x: ['2020-05-11 00:00:00', '2020-05-11 03:00:00', '2020-05-11 06:00:00', '2020-05-11 09:00:00', '2020-05-11 12:00:00', '2020-05-11 15:00:00', '2020-05-11 18:00:00', '2020-05-11 21:00:00', '2020-05-12 00:00:00'],
        y: [1105, 904, 1303, 1208, 1111, 1412, 1011, 1005, 901],
        marker: {
            color: 'red',
            line: {
                width: 0.2
            }
        }
    }
]
var layout1 = {
    title: 'Wykres cisnienia podczas calego dnia',
    font: { size: 18 }
};
function WykresTemperatur() {
    Plotly.newPlot('test', temptrace, layout, config);
}
function WykresCisnienia() {
    Plotly.newPlot('test', pressuretrace, layout1, config);
}


function adv(temp) {
    switch (true) {
        case (temp > 10 && temp <= 25):
            document.getElementById("adv1").src = "https://www.e-zikoapteka.pl/gripex-hot-lek-przeciw-objawom-przeziebienia-i-grypy-12-saszetek.2.jpg";
            break;
        case (0 < temp && temp <= 10):
            document.getElementById("adv1").src = "https://www.e-zikoapteka.pl/gripex-hot-lek-przeciw-objawom-przeziebienia-i-grypy-12-saszetek.2.jpg";
            break;
        case (temp <= 0):
            document.getElementById("adv1").src = "https://www.oponeo.pl/gfxNew/productDetails/bridgestone-blizzak-lm005/header-banner-320.jpg"
            break;
        case (temp > 25):
            document.getElementById("adv1").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNfA3dpsrM53wRNb363SgYNh2PN9cVFw65QA&usqp=CAU";
            break;
        default:
            document.getElementById("adv1").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrAxseKJGtJScFgki1GSbbP-i4xv93iXhJPQ&usqp=CAU";
    }
}

// document.addEventListener('DOMContentLoaded', adv);



//search city from list 
function refreshList() {

    let foo = document.querySelectorAll('.listItem');

    for (let i = 0; i < foo.length; i++) {
        console.log(foo[i].addEventListener("click", modifyText))
    }
}
refreshList();

// lista miast po prawej 
function modifyText(e) {
    let city2 = e.target.innerHTML;
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${key}&units=metric`;
    let lon;
    let lat;
    let name;
    let temp;
    let pressure;
    let wind;
    let icon;
    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            lon = data.coord.lon;
            lat = data.coord.lat;
            name = data.name;
            temp = data.main.temp;
            pressure = data.main.pressure;
            wind = data.wind.speed;
            icon = data.weather[0].icon;
            map.panTo(new L.LatLng(lat, lon));

            popup
                .setLatLng(data.coord)
                .setContent(
                    '<img class="icon" src="https://openweathermap.org/img/wn/' + icon + '@2x.png"<br>' +
                    '<div class=popup-city><br>Miasto : ' + name + '</div>' +
                    "<div class=popup-temp><br>Temperatura : " + Math.floor(temp) + " &#x2103</div>" +
                    "<div class=popup-pressure><br>Ciśnienie : " + pressure + " hPa</div>" +
                    "<div class=popup-wind><br> Wiatr : " + wind + " km/h</div>" +
                    "<br><button id = button-wykres >Wykres</button>")
                .openOn(map)
        })
}


// search bar 
document.querySelector("#searchInput").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        const value = document.querySelector("#searchInput").value;
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}&units=metric`;

        let name;
        let temp;
        let pressure;
        let wind;
        let icon;
        fetch(api)
            .then(response => response.json())
            .then(data => {
                console.log(data.weather[0].icon);
                lon = data.coord.lon;
                lat = data.coord.lat;
                name = data.name;
                temp = data.main.temp;
                pressure = data.main.pressure;
                wind = data.wind.speed;
                icon = data.weather[0].icon;
                map.panTo(new L.LatLng(lat, lon));

                popup
                    .setLatLng(data.coord)
                    .setContent(
                        '<img class="icon" src="https://openweathermap.org/img/wn/' + icon + '@2x.png"<br>' +
                        '<div class=popup-city><br>Miasto : ' + name + '</div>' +
                        "<div class=popup-temp><br>Temperatura : " + Math.floor(temp) + " &#x2103</div>" +
                        "<div class=popup-pressure><br>Ciśnienie : " + pressure + " hPa</div>" +
                        "<div class=popup-wind><br> Wiatr : " + wind + " km/h</div>" +
                        "<br><button id = button-wykres >Wykres</button>")
                    .openOn(map)
            })
    }
})




