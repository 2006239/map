var kaavio1, kaavio2, kaavio3, kaavio4;
var aloitusluku = 30;
var sijainti = 0;
var updatearvo = 600;
var paivitysarvo = 1;
var updateraja = 30;
var updatealaraja = 0;
var updateylaraja = 0;
var alaraja = 0;
var ylaraja = 0;
var keskiarvonopeus = 0;
var korkeinnopeus = 0;
var keskikulutus = 0;
var korkeinkulutus = 0;
var polindefault = 0;
var vanhaarvo = aloitusluku;
var raja = 0;
let file = document.getElementById("textfile");
let rivi;
var slider = document.getElementById("valitsin");
let arvo = slider.value;

var xml;
var cycle;


var eka;
var ajoreitti;
var map;
var kartta = document.getElementById("map");
var route;
var chart1 = document.getElementById('chart1');
var highx = 0;
var highy = 0;
var lowx = 0;
var lowy = 0;



function parseXML(data) {
  var parser = new DOMParser();
  //console.log(data.target.result);
  //document.write(data.target.result);
  this.xml = parser.parseFromString(data.target.result, "text/xml");
  this.cycle = this.xml.getElementsByTagName("cycle");
  slider.setAttribute("max", this.cycle.length/paivitysarvo);
  //slider.setAttribute("min", aloitusluku);
  slider.setAttribute("value", aloitusluku);
  return this.xml;
}

function gpsdata(arvo) {
  var sijainnit, lat, long, eka, vika;
  var edellinenlat = 0;
  var edellinenlong = 0;
  var latlong = [];
  var ajoreitti = [];
  var laskuri = 0;
  if (arvo > cycle.length) { arvo = cycle.length; }
  if (arvo > aloitusluku) {
    alaraja = arvo - aloitusluku;
    ylaraja = arvo;
  }
  else {
    alaraja = 0;
    ylaraja = aloitusluku;
  }

  updateylaraja = ylaraja;
  for (let i = 0; i < ylaraja; i++)//ylaraja
  {
    sijainnit = cycle[i].querySelector("gps");
    lat = sijainnit.querySelector("lat").textContent;
    long = sijainnit.querySelector("lon").textContent;
    if (lat != null && long != null) {
      edellinenlat = lat;
      edellinenlong = long;
      latlong.push("[" + long + "," + lat + "]");
    }
    if (lat == null && long != null) {
      lat = edellinenlat;
      latlong.push("[" + long + "," + lat + "]");
    }
    if (lat != null && long == null) {
      long = edellinenlong;
      latlong.push("[" + long + "," + lat + "]");
    }
    if (lat == null && long == null) {
      long = edellinenlong;
      lat = edellinenlat;
      latlong.push("[" + long + "," + lat + "]");
    }
    if (laskuri === 0) {
      eka = [lat, long];
      laskuri++;
    }
    vika = [lat, long];
  }
  var merkkijono = latlong.toString();
  var temp = '{"type": "Feature","geometry": {"type": "LineString","coordinates": [' + merkkijono + ']},"properties": {"name" : "ajoreitti"}}';
  ajoreitti[0] = JSON.parse(temp);
  ajoreitti[1] = eka;
  ajoreitti[2] = vika;
  return ajoreitti;
}

function gpsupdate(merkkijono)
{
  var luku = parseInt(merkkijono, 10);
  
  var sijainnit, lat, long, eka, vika;
  var edellinenlat = 0;
  var edellinenlong = 0;
  var latlong = [];
  var ajoreitti = [];
  var laskuri = 0;
  var arvo = 0;
  var raja = 0;
  if(luku<cycle.length)
  {//console.log(luku +" arvo < cycle " + cycle.length);
    if(luku<aloitusluku)
    {
	//console.log(luku +" arvo< aloitusluku" + aloitusluku);
        updatealaraja = 0;
        updateylaraja = aloitusluku;
    }
    else
    {  //console.log(luku +" arvo > aloitusluku " + aloitusluku);
       updateylaraja = luku;
       updatealaraja=updateylaraja-updateraja;
       if(luku > (vanhaarvo + 5)|| luku < vanhaarvo){console.log(luku +" arvo !== vanhaarvo+1 " + luku);
           if(luku>aloitusluku)
           {
           updateylaraja = luku;
           updatealaraja=updateylaraja-aloitusluku;
           console.log(updateylaraja-updatealaraja);
           }
          else{
		updataalaraja = 0;
	        updateylaraja = aloitusluku;
           }
	}
    }
  }
  else {
        //console.log(luku +" arvo > cycle" + cycle.length);
        updateylaraja = cycle.lenght;updatealaraja= cycle.lenght - aloitusluku;
      }
  vanhaarvo = luku;
console.log(updateylaraja +">"+ updatealaraja); 
  

for (let i = 0; i < updateylaraja; i++) {
    sijainnit = cycle[i].querySelector("gps");
    lat = sijainnit.querySelector("lat").textContent;
    long = sijainnit.querySelector("lon").textContent;
    if (lat != null && long != null) {
      edellinenlat = lat;
      edellinenlong = long;
      latlong.push("[" + long + "," + lat + "]");
    }
    if (lat == null && long != null) {
      lat = edellinenlat;
      latlong.push("[" + long + "," + lat + "]");
    }
    if (lat != null && long == null) {
      long = edellinenlong;
      latlong.push("[" + long + "," + lat + "]");
    }
    if (lat == null && long == null) {
      long = edellinenlong;
      lat = edellinenlat;
      latlong.push("[" + long + "," + lat + "]");
    }
    if (laskuri === 0) {
      eka = [lat, long];
      laskuri++;
    }
    vika = [lat, long];
  }
  var merkkijono = latlong.toString();
  var temp = '{"type": "Feature","geometry": {"type": "LineString","coordinates": [' + merkkijono + ']},"properties": {"name" : "ajoreitti"}}';
  ajoreitti[0] = JSON.parse(temp);
  ajoreitti[1] = eka;
  ajoreitti[2] = vika;
  return ajoreitti;
}
/*
function accelerometer(arvo)
{
    var alku, x, y, rajaarvo;
    var luvut = [];
    var acc= [];
    var dataset = [];
    var suurimmat = [];
    var palautettava;
    var arvot = [];
    var acc = this.xml.getElementsByTagName("accelerometer");
    alku = rajaarvo - koko;
    for(let i = alku; i<rajaarvo;i++)
    {
        luvut = acc[i].getElementsByTagName("*");
        x = parseFloat(luvut[0].textContent);
        y = parseFloat(luvut[1].textContent);
        dataset.push({ x: x, y: y});
        if (y < 0) if(y<this.lowy) lowy = y;
  if (x < 0) if(x<this.lowx) lowx = x;
        if (y > 0) if(y >this.highy) highy = y;
  if (x > 0) if(x >this.highx) highx = y;
        suurimmat[0]= this.lowy;
        suurimmat[1]= this.lowx;
        suurimmat[2]= this.highy;
        suurimmat[3]= this.highx;
    }
    var merkkijono = JSON.stringify(dataset);

var data = {
  labels: [
    'X',
    'Y',
    '-X',
    '-Y'
  ],
  datasets: [{
    label: 'G-voimat',
    data: dataset,
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }]};

var config = {
  type: 'radar',
  scales: {
    myScale: {
      axis: 'r'
    }
  },
  data: data,
  options: {
  locale: "fi",
        maintainAspectRatio: false,
	
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
};
return config;
}
*/

function kaasupolin() {
  var highp, lowp;
  var edellinen = 0;
  var average = 0;
  var high = 0;
  var pedal;
  var gaspedal = [];
  var dataset = [];
  for (let j = alaraja; j < ylaraja; j++) {
    pedal = cycle[j].querySelector("throttle_pos");
    if (pedal != null) {
      gaspedal = parseFloat(pedal.textContent.slice(0, -3));
      edellinen = gaspedal;
    }
    else gaspedal = edellinen;
    dataset.push(gaspedal);
    if (gaspedal > highp) highp = gaspedal;
    average = average + gaspedal;
  }
  //console.log(timeset.length.toString() + " = "+ dataset.length.toString());
  //labels:timeset,
  //datasets: [{
  var data = {
    label: 'Kaasupolkimen asento',
    data: dataset,
    fill: true,
    borderColor: '#fff',
    tension: 0.1
  };
  /*
  var config = {
    type: 'line',
    data: data,
    options: {
          maintainAspectRatio: false,
  	
      elements: {
        line: {
          borderWidth: 3
        }
  }}};
  //console.log("nopeus: "+  JSON.stringify(config))
  */
  return data;
}


function nopeus(arvo) {
  var kaasu = kaasupolin();
  var kulut = kulutus();
  var alku, high, average, rajaarvo;
  var edellinen = 0;
  var average = 0;
  high = 0;
  var speed;
  var times;
  var nopeus = [];
  var dataset = [];
  var timeset = [];

  for (let i = alaraja; i < ylaraja; i++)//alaraja ylaraja
  {
    times = cycle[i].querySelector("time");
    if (times != null) timeset.push(times.textContent.slice(11));
    else { timeset.push(""); }
  }

  for (let j = 0; j < cycle.length; j++) {
    speed = cycle[j].querySelector("speed");
    if (speed != null) {
      nopeus = parseInt(speed.textContent.slice(0, -3));
      edellinen = nopeus;
    }
    else nopeus = edellinen;
    dataset.push(nopeus);
    if (nopeus > high) high = nopeus;
    average = average + nopeus;
  }

  var data = {
    labels: timeset,
    datasets: [{
      label: 'Nopeus',
      data: dataset,
      fill: true,
      borderColor: '#fff',
      tension: 0.1
    },
      kaasu,
      kulut

    ]
  };

  var config = {
    type: 'line',
    data: data,
    options: {
      maintainAspectRatio: false,

      elements: {
        line: {
          borderWidth: 3
        }
      }
    }
  };
  //console.log("nopeus: "+  JSON.stringify(config))
  return config;
}

function kulutus(arvo) {
  var alku, highf;
  var edellinen = 0;
  var average = 0;
  var high = 0;
  var fuel;
  var times;
  var fuelrate = [];
  var dataset = [];
  var timeset = [];
  var arvot = [];
  for (let j = alaraja; j < ylaraja; j++) {
    fuel = cycle[j].querySelector("fuel_rate");
    if (fuel != null) {
      fuelrate = parseFloat(fuel.textContent.slice(0, -3));
      edellinen = fuelrate;
    }
    else fuelrate = edellinen;
    dataset.push(fuelrate);
    if (fuelrate > highf) highf = fuelrate;
    average = average + fuelrate;
  }
  //console.log(timeset.length.toString() + " = "+ dataset.length.toString());
  //	labels:timeset,
  //  datasets: [{
  var data = {
    label: 'Polttoaineenkulutus',
    data: dataset,
    fill: true,
    borderColor: '#fff',
    tension: 0.1
  };
  /*
  var config = {
    type: 'line',
    data: data,
    options: {
          maintainAspectRatio: false,
  	
      elements: {
        line: {
          borderWidth: 3
        }
  }}};
  */
  //console.log("nopeus: "+  JSON.stringify(config))
  return data;
}

function kaasupolinUpdate() {
  var lowp;
  var edellinen = 0;
  var average = 0;
  var highp = 0;
  var pedal;
  var gaspedal = [];
  var dataset = [];
  for (let j = updatealaraja; j < updateylaraja; j++) {
    pedal = cycle[j].querySelector("throttle_pos");
    if (pedal != null) {
      gaspedal = parseFloat(pedal.textContent.slice(0, -3));
      edellinen = gaspedal;
    }
    else {
      gaspedal = edellinen;
      //console.log(edellinen + " tyhja");
    }
    //if(gaspedal === 0 && edellinen !== 0) gaspedal = edellinen;
    dataset.push(gaspedal);
    if (gaspedal > highp) highp = gaspedal;

    average = average + gaspedal;
  }

  return dataset;
}


function update() {
  var kaasu = kaasupolinUpdate();
  var kulut = kulutusUpdate();
  const data = [];
  var edellinen = 0;
  var average = 0;
  var high = 0;
  var speed;
  var times;
  var nopeus = [];
  var dataset = [];
  var timeset = [];

  for (let i = updatealaraja; i < updateylaraja; i++) {
    times = cycle[i].querySelector("time");
    if (times != null) timeset.push(times.textContent.slice(11));
    else { timeset.push(""); }
  }

  for (let j = updatealaraja; j < updateylaraja; j++) {
    speed = cycle[j].querySelector("speed");
    if (speed != null) {
      nopeus = parseInt(speed.textContent.slice(0, -3));
      edellinen = nopeus;
    }
    else nopeus = edellinen;

    dataset.push(nopeus);
    if (nopeus > high) high = nopeus;
    average = average + nopeus;
  }
  //console.log(timeset.length.toString() + " = "+ dataset.length.toString());

  data[0] = timeset;
  data[1] = dataset;
  data[2] = kaasu;
  data[3] = kulut;

  return data;
}

function kulutusUpdate(arvo) {
  var edellinen = 0;
  var average = 0;
  var highf = 0;
  var fuel;
  var fuelrate = [];
  var dataset = [];

  for (let j = updatealaraja; j < updateylaraja; j++) {
    fuel = cycle[j].querySelector("fuel_rate");
    if (fuel != null) {
      fuelrate = parseFloat(fuel.textContent.slice(0, -3));
      edellinen = fuelrate;
    }
    else fuelrate = edellinen;
    dataset.push(fuelrate);
    if (fuelrate > highf) highf = fuelrate;
    average = average + fuelrate;
  }

  return dataset;
}


function KaavioUpdate(data, chart) {
  //console.log(updateraja);
    chart.data.labels = data[0];
    chart.data.datasets[0].data = data[1];
    chart.data.datasets[1].data = data[2];
    chart.data.datasets[2].data = data[3];
    chart.update("none");

}



function DrawMap(eka, ajoreitti) {
  //kartta = document.getElementById("map");
  this.map = L.map(kartta).setView(eka, 12);
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  this.route = L.geoJSON(ajoreitti).addTo(map);
  //const marker = L.marker([51.5, -0.09]).addTo(map);
  return map;
}

function ReloadMap(arvo) {
  //console.log(seuraa);
  let reitti = gpsdata(arvo);
  this.route.clearLayers();
  this.route = L.geoJSON(reitti[0]).addTo(this.map);
  if (document.getElementById("seuraa").checked) this.map.setView(reitti[2]);
  kaavio2.destroy();
  kaavio2 = new Chart(chart, nopeus(arvo));
  // KaavioUpdate(update(), kaavio2);
}

function UpdatePage(slideri) {
  let reitti = gpsupdate(slideri);
  this.route.clearLayers();
  this.route = L.geoJSON(reitti[0]).addTo(this.map);
  if (document.getElementById("seuraa").checked) this.map.setView(reitti[2]);
  KaavioUpdate(update(), kaavio2);
}

var reader = new FileReader();
file.addEventListener("change", function () {
  reader.onload = function (data) {
    parseXML(data);
    let reitti = gpsdata(arvo);
    kartta = DrawMap(reitti[1], reitti[0])
    //console.log(accelerometer(raja, arvo));
    //kaavio1 = new Chart(chart1, accelerometer(raja));
    kaavio2 = new Chart(chart, nopeus(raja));
    //kaavio3 = new Chart(chart3, kulutus(raja));
  }
  reader.readAsText(this.files[0]);
});











