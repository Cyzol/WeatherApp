const map = L.map('map',{
    center: [52.7367900, 15.2287800],
    zoom: 13
    });

    L.marker([52.7367900, 15.2287800]).addTo(map);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
    }).addTo(map);


      var popup = L.popup();

      function onMapClick(e) {
          popup
              .setLatLng(e.latlng)
              .setContent(e.latlng.toString())
              .openOn(map);
      }
      
      map.on('click', onMapClick);


      function addCityFunction() {
        var node = document.createElement("LI");
        node.setAttribute('class','list-group-item');
        var textnode = document.createElement("Label")
        textnode.innerHTML = document.getElementById("addCityInput").value
        node.appendChild(textnode);
        document.getElementById("cityList").appendChild(node);
      }


      //Ploty.js

      const wykrCis = document.querySelector('.wykresCis');
      const wykrTemp = document.querySelector('.wykresTemp');

      wykrCis.addEventListener("click",WykresCisnienia);
      wykrTemp.addEventListener("click",WykresTemperatur);

      //DANE

      let temptrace = [
        {
            type: 'bar',
            x: ['2020-05-11 00:00:00', '2020-05-11 03:00:00', '2020-05-11 06:00:00','2020-05-11 09:00:00', '2020-05-11 12:00:00', '2020-05-11 15:00:00','2020-05-11 18:00:00', '2020-05-11 21:00:00', '2020-05-12 00:00:00'],
            y: [5, 4, 3, 8, 11, 12, 11, 5, -1],
            marker:{
                color:'blue',
                line: {
                    width: 0.2
                }
            }
        }
        ];
        let layout = { 
            title: 'Wykres temperatur podczas calego dnia',
            font: {size: 18}
            };
        let config = {responsive: true}

        document.addEventListener('DOMContentLoaded',WykresTemperatur);
        let pressuretrace = [
            {
                type: 'bar',
                x: ['2020-05-11 00:00:00', '2020-05-11 03:00:00', '2020-05-11 06:00:00','2020-05-11 09:00:00', '2020-05-11 12:00:00', '2020-05-11 15:00:00','2020-05-11 18:00:00', '2020-05-11 21:00:00', '2020-05-12 00:00:00'],
                y: [1105, 904, 1303, 1208, 1111, 1412, 1011, 1005, 901],
                marker:{
                color:'red',
                line: {
                    width: 0.2
                }
            }
            }
        ]
        var layout1 = { 
            title: 'Wykres cisnienia podczas calego dnia',
            font: {size: 18}
            };
        function WykresTemperatur(){
            Plotly.newPlot('test', temptrace, layout, config);            
        }
        function WykresCisnienia(){
            Plotly.newPlot('test', pressuretrace, layout1, config);            
        }
   

      
      
