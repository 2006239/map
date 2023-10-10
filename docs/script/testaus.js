var icons = [L.divIcon({
  className: "",
  html: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 33 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><g transform="matrix(1,0,0,1,0.233507,-0.379231)"><g transform="matrix(0.0872488,0,0,0.0872488,-99.8898,-159.515)"><path d="M1280.51,2192.08c-76.809,-20.688 -133.408,-90.88 -133.408,-174.187c0,-99.55 80.823,-180.373 180.373,-180.373c99.55,0 180.373,80.823 180.373,180.373c-0,86.488 -61.004,158.841 -142.294,176.339l-42.295,200.804l-42.749,-202.956Z" style="fill:#f00;stroke:#000;stroke-width:9.78px;"/></g></g></svg>',
  iconAnchor: [16, 50],
  iconSize: [32, 50],
  popupAnchor: [0, -28],
})
];
var playspeed = 500;
var markers = [merkit.lenght - 1];
var bordermarkers = [rajamerkit.lenght-1];
//document.cookie = "testi=testi ; expires=Thu, 34 Dec 2999 12:00:00 UTC; path=/";
var markersold = markers.lenght - 1;
var markersdata = merkit;
var aloitusaika;
var nykyinenaika;
var alinopeusaika = 0;
var hi_cal = [];
var hard_iron = [5.04, 69.98, 22.97];
var soft_iron = [
  [1.075, -0.055, 0.046],
  [-0.055, 0.963, -0.027],
  [0.046, -0.027, 0.971],
];
var timer3 = new Date();
var oldilmatimer = new Date();
var ilmatimer = 0;
var roll, pitch = 0;
var lat3 = 0;
var lat2 = 0;
var lon3 = 0;
var lon2 = 0;
var currentlat = 0;
var currentlon = 0;
var latitude = 0;
var longtitude = 0;
var heading = 0;
var luku = 1;
var lukuplus = 380;
var kerrokset;
var tila;
let looppi;
//var merkit;
var kulma = 0;
var kaavio;
var aloitusluku = 30;
var sijainti = 0;
var updatearvo = 600;
var paivitysarvo = 1;
var updateraja = 30;
var updatealaraja = 0;
var updateylaraja = 0;
var alaraja = 0;
var ylaraja = 0;
var keskiarvonopeudet = 0;
var keskiarvonopeus = 0;
var korkeinnopeus = 0;
var keskikulutus = 0;
var korkeinkulutus = 0;
var korkeingvoima = 0;
var merenpinnasta = 1361.5;
var korkeinkohta = 0;
var polindefault = 0;
var vanhaarvo = aloitusluku;
var raja = 0;
let file = document.getElementById("textfile");
let fileMerkit = document.getElementById("merkitfile");
let rivi;
var slider = document.getElementById("valitsin");
let arvo = slider.value;
var xml;
var merkitxml;
var cycle;
var eka;
var ajoreitti;
var map;
var kartta = document.getElementById("map");
var osrmurl = document.getElementById("osrmurl");
var route;
var chart1 = document.getElementById("chart1");
var highx = 0;
var highy = 0;
var lowx = 0;
var lowy = 0;
var layers;
var suora = false;
var sadekartta;
var datamerkkijono = "";
var currentspeed = 0;
var matkametreina = 0;
var ekaresult = true;
var result2,
  result3,
  result4 = 0;
var resultlaskuri = 0;
var results = [];
var ilmat;
//var imageUrl = "D:/Harjoittelu/raspberry/raspberry/docs/script/orivesisyvyys.png"
//var errorOverlayUrl = "";
//altText = "orivesi: pohjoinen";
//var latLngBounds = L.latLngBounds([[62.6371679, 29.1713436], [62.2785787,  29.9646966]]);
//var imageOverlay;
//var firstProjection = "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
//var secondProjection = "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

//console.log(proj4( firstProjection,secondProjection,[2, 1]));
function ilmatieteenlaitos(){
    if(layers && map.hasLayer(sadekartta)){
        layers.removeLayer(sadekartta);
        map.removeLayer(sadekartta);
        sadekartta = L.tileLayer
            .wms("https://openwms.fmi.fi/geoserver/wms?"+Math.random()+"&", {
                format: "image/png",
                layers: "Radar:suomi_rr_eureffin",
                transparent: "True",
            }).setOpacity(0.7);
 //https://opendata.fmi.fi/wfs/fin?service=WFS&version=2.0.0&request=GetFeature&storedquery_id=fmi::obse>  
        layers.addBaseLayer(sadekartta, "Sadekartta");
        map.addLayer(sadekartta);
        //console.log(layers);
        //layers.addTo(map);
        console.log("päivitys");
        ilmat = setTimeout(ilmatieteenlaitos, 300000);
    }
    else/* if(layers)*/{
      ilmat = setTimeout(ilmatieteenlaitos, 300000); 
      console.log("ei päivitys");
    }
}

function matka(matka,nopeus){

    //console.log(nykyinenaika)
    //console.log(aloitusaika)
    var luku = +document.getElementById("treshold").value.replace(",",".");
    if (luku == null || luku <=0){
        if(nopeus>0){
            keskiarvonopeudet += 1;
            keskiarvonopeus += nopeus;
        }
        else{
            alinopeusaika += 500;
        }
    }
    else{
        if(nopeus>luku){
            keskiarvonopeudet += 1;
            keskiarvonopeus += nopeus;
        }
        else{
            alinopeusaika += 500;
        }
    }

    //console.log(nykyinenaika.getTime()-aloitusaika.getTime());
    var h = Math.floor((nykyinenaika.getTime()-aloitusaika.getTime())/3600000);
    var m = Math.floor((nykyinenaika.getTime()-aloitusaika.getTime())/(3600000/60))-(h*60);
    var s = Math.floor((nykyinenaika.getTime()-aloitusaika.getTime())/(3600000/60/60))-(m*60);
    var tamaaika = nykyinenaika.getTime()-alinopeusaika-aloitusaika.getTime();

    var hh = Math.floor(tamaaika/3600000);
    var hm = Math.floor(tamaaika/(3600000/60))-(hh*60);
    var hs = Math.floor(tamaaika/(3600000/60/60))-(hm*60);
    
    // console.log("Nopeus: "+nopeus);
    // console.log("keskiarvo: "+ keskiarvonopeus);
    // console.log("nopeuksienmäärä: "+keskiarvonopeudet.length);
    document.getElementById('aika').innerHTML = "Kulunutaika : "+h+":"+m+":"+s;
    
    document.getElementById('keskinopeus').innerHTML = "Keskinopeus: "+(keskiarvonopeus/keskiarvonopeudet).toFixed(2) + " km/h";
    var matkat = (keskiarvonopeus/keskiarvonopeudet)*((nykyinenaika.getTime()-aloitusaika.getTime()-alinopeusaika)/3600000);
    document.getElementById('harjoitusaika').innerHTML = "Suoritusaika: "+hh+":"+hm+":"+hs;
    document.getElementById('matka').innerHTML = "Matka: " +matkat.toFixed(2)+ " km";

  }


function suunta(lat1, lon1, lat2, lon2) {
if(document.getElementById("rotation").checked){
  if (currentspeed > 0.7) {
    //console.log(currentspeed);
    var R = 6371e3;
    var teta1 = lat1 * (Math.PI / 180);
    var teta2 = lat2 * (Math.PI / 180);
    var delta1 = (lat2 - lat1) * (Math.PI / 180);
    var delta2 = (lon2 - lon1) * (Math.PI / 180);
    var y = Math.sin(delta2) * Math.cos(teta2);
    var x =
      Math.cos(teta1) * Math.sin(teta2) -
      Math.sin(teta1) * Math.cos(teta2) * Math.cos(delta2);
    var brng = Math.atan2(y, x);
    brng = (180 * brng) / Math.PI; // radians to degrees
    //console.log("brng2 = "+brng);
    //var result = ((brng + 360) % 360 );
    if ((brng > 0 && brng < 360) || brng === 0) {
      //console.log("if(" + brng + ")");
      result = brng;
    } else {
      result = ((((brng * 2 * 180) / 360) % 360) + 360) % 360;
      //console.log("else");
    }
    //result += 180;
    //return(((result*2*180/360)%360)+360)%360;
    //if (result > 180) result = 180 - (result);
    //else if (result < 180) result = 360 - (result);
    if (ekaresult) {
      result2 = result;
      result3 = result;
      result4 = result;
      ekaresult = false;
    }
    if (result === 0) result = result2;
    results.push(result);
    //console.log(result2 + " >< " + result);
    var luku = 0;
    //if(result<result2 && result >  result3 || result > result2 && result < result3){console.log("old"); result = result2;}
    if (currentspeed > 70 && results.lenght > 14) {
      for (var i = results.length - 13; i < results.lenght; i++) {
        luku += results[i];
      }
      palauta = luku / 12;
    } else if (currentspeed > 30 && results.lenght > 10) {
      for (var i = results.length - 9; i < results.lenght; i++) {
        luku += results[i];
      }
      palauta = luku / 8;
    } else if (currentspeed > 3 && results.lenght > 15) {
      for (var i = results.length - 14; i < results.lenght; i++) {
        luku += results[i];
      }
      palauta = luku / 13;
    } else palauta = result;
    result2 = result;
    result3 = result2;
    result4 = result3;
    var a =
      Math.sin(delta1 / 2) * Math.sin(delta1 / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(delta2 / 2) *
        Math.sin(delta2 / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    matkametreina += R * c;
    
  } else {
    //console.log("heading = "+(heading));
    palauta = heading;
  }
  return (360 - palauta) | 0;
}
else{return 0;}
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}

function parsekorkeus(data) {
  var sijainnit;
  var korkeus;
  for (let i = 0; i < data.length; i++) {
    sijainnit = data[i].querySelector("gps");
    if (sijainnit != null) {
      temp = sijainnit.querySelector("altitude");
      if (temp != null) {
        korkeus = parseFloat(temp.textContent);
        if (korkeus < merenpinnasta) {
          merenpinnasta = korkeus;
        }
        if (korkeinkohta < korkeus) {
          korkeinkohta = korkeus;
          //if(currentspeed  > korkeinkohta){korkeinkohta=currentspeed;}
        }
      }
    } else {
      korkeinkohta = 0;
      merenpinnasta = 0;
    }
  }
  return true;
}

function parseXMLs(data) {
  //console.log(data);
  var parser = new DOMParser();
  this.xml = parser.parseFromString(data, "text/xml");
  //console.log(this.xml);
  this.cycle = this.xml.getElementsByTagName("cycle");
  //console.log(this.cycle);
  if (this.cycle != null) {
    slider.setAttribute("max", this.cycle.length / paivitysarvo);
    slider.setAttribute("value", aloitusluku);
    parsekorkeus(this.cycle);
    return this.xml;
  }
}
function parseXML(data) {
  var parser = new DOMParser();
  this.xml = parser.parseFromString(data.target.result, "text/xml");
  this.cycle = this.xml.getElementsByTagName("cycle");
  //console.log(cycle);
  if (this.cycle != null) {
    slider.setAttribute("max", this.cycle.length / paivitysarvo);
    slider.setAttribute("value", aloitusluku);
    parsekorkeus(this.cycle);
    return this.xml;
  }
  w;
}
var toista;
function playTrack() {
  var luku = +document.getElementById("speed").value.replace(",",".");
  if(luku == null || luku <= 0){ luku = 1;}
  console.log(luku);
  playspeed = 500 / luku;
  toista = setInterval(updateSlider, playspeed);
}
var edelinennykyinenaika = nykyinenaika;
function updateSlider() {
  //var valitsin = document.getElementById("valitsin");
  //console.log(valitsin);
  slider.value = parseInt(valitsin.value) + 1;
  //console.log(slider.value +'='+slider.max);
  if(parseInt(slider.value) >= parseInt(slider.max)) clearTimeout(toista);
  UpdatePage(slider.value);
  var luku = +document.getElementById("speed").value.replace(",",".");
  if(luku == null || luku == 0){luku = 1;}
  if(playspeed != 500/luku){
      clearTimeout(toista);
      playspeed = 500/luku;
      toista = setInterval(updateSlider, playspeed);
  }
}

function gps(merkkijono) {
  var luku = parseInt(merkkijono, 10) - 2;
  var sijainnit, lat, long, eka, vika, korkeus, temp;
  var edellinenlat = 0;
  var edellinenlong = 0;
  var latlong = [];
  var ajoreitti = [];
  var laskuri = 0;
  updateylaraja = updateraja;
  if (luku < cycle.length - 1) {
    if (luku < aloitusluku) {
      updatealaraja = 0;
      updateylaraja = aloitusluku;
    } else {
      updateylaraja = luku;
      updatealaraja = updateylaraja - updateraja;
      if (luku > vanhaarvo + 5 || luku < vanhaarvo) {
        if (luku > aloitusluku) {
          updateylaraja = luku;
          updatealaraja = updateylaraja - aloitusluku;
        } else {
          updatealaraja = 0;
          updateylaraja = aloitusluku;
        }
      }
    }
  } else {
    updateylaraja = cycle.lenght;
    updatealaraja = cycle.length - aloitusluku;
  }
  vanhaarvo = luku;
  //console.log(cycle.length);
  //console.log(updateylaraja);
  for (let i = 0; i < updateylaraja; i++) {
    sijainnit = cycle[i].querySelector("gps");
    //console.log(sijainnit);
    if (sijainnit != null)
    {
      lat = sijainnit.querySelector("lat").textContent;
      long = sijainnit.querySelector("lon").textContent;
      //console.log("lat="+lat +", lon="+long);
      if (lat != null && long != null) {
        if (lat === "0" && long === "0" || lat == "9" && long === "9") {
          lat = edellinenlat;
          long = edellinenlong;
          latlong.push("["+edellinenlong+","+edellinenlat+"]");
        } else {
          /*
		if(lat>edellinenlat+1||lat<edellinenlat-1)
		{
                   lat = edellinenlat; 
		}
		if(long>edellinenlong+1 && edellinenlong!=0 || long<edellinenlong-1 && long!=0)
		{
                   long = edellinenlong; 
		}*/
          edellinenlat = lat;
          edellinenlong = long;
          if (lat != 0 && long != 0) {
            //console.log(lat +" "+long);
            lat3 = lat2;
            lon3 = lon2;
            lat2 = currentlat;
            lon2 = currentlon;
            currentlat = lat;
            currentlon = long;
            latlong.push("[" + long + "," + lat + "]");
          }
        }
      }

      if (edellinenlat === "0" && edellinenlong === "0") {
        edellinenlat = null;
        edellinenlong = null;
      }
      if (lat == null && long != null) {
        lat = edellinenlat;
        if (lat != "0" && long != "0") {
          latlong.push("[" + long + "," + lat + "]");
        }
      }
      if (lat != null && long == null) {
        long = edellinenlong;
        if (lat != "0" && long != "0") {
          latlong.push("[" + long + "," + lat + "]");
        }
      }
      if (lat == null && long == null) {
        long = edellinenlong;
        lat = edellinenlat;
        if (lat != "0" && long != "0") {
          latlong.push("[" + long + "," + lat + "]");
        }
      }
      if (laskuri === 0) {
        eka = [lat, long];
        laskuri++;
      }
      vika = [lat, long];
    } else {
      eka = [0, 0];
      latlong.push("[" + 0 + "," + 0 + "]");
      vika = [0, 0];
    }
  }
  var merkkijono = latlong.toString();
  //console.log(merkkijono);
  var temp =
    '{"type": "Feature","geometry": {"type":  "LineString","coordinates": [' +
    merkkijono +
    ']},"properties":   {"name" : "ajoreitti"}}';
  ajoreitti[0] = JSON.parse(temp);
  ajoreitti[1] = eka;
  ajoreitti[2] = vika;

  return ajoreitti;
}

function gpss(luku) {
  var sijainnit, lat, long, eka, vika, korkeus, temp;
  var edellinenlat = 0;
  var edellinenlong = 0;
  var latlong = [];
  var ajoreitti = [];
  var laskuri = 0;
  slider.value = luku;
  if (luku < aloitusluku) {
    updateylaraja = luku;
    updatealaraja = 0;
  } else {
    updateylaraja = luku;
    updatealaraja = luku - aloitusluku;
  }
  vanhaarvo = luku;
  for (let i = 0; i < updateylaraja; i++) {
    sijainnit = cycle[i].querySelector("gps");
    //console.log(sijainnit);
    if (sijainnit != null)
    {
      lat = sijainnit.querySelector("lat").textContent;
      long = sijainnit.querySelector("lon").textContent;
      console.log("lat="+lat +", lon="+long);
      if (lat != null && long != null) {
        if (lat === "0" && long === "0") {
          lat=edellinenlat;
          long=edellinenlong;
          latlong.push("["+edellinenlong+","+edellinenlat+"]");
        }
        else{
          /*
		if(lat>edellinenlat+1||lat<edellinenlat-1)
		{
                   lat = edellinenlat; 
		}
		if(long>edellinenlong+1 && edellinenlong!=0 || long<edellinenlong-1 && long!=0)
		{
                   long = edellinenlong; 
		}*/
          edellinenlat = lat;
          edellinenlong = long;
          if (lat != "0" && long != "0") {
            //console.log(lat +" "+long);
            lat3 = lat2;
            lon3 = lon2;
            lat2 = currentlat;
            lon2 = currentlon;
            currentlat = lat;
            currentlon = long;
            latlong.push("[" + long + "," + lat + "]");
          }
        }
      }

      if (edellinenlat === "0" && edellinenlong === "0") {
        edellinenlat = null;
        edellinenlong = null;
      }
      if (lat == null && long != null) {
        lat = edellinenlat;
        if (lat != "0" && long != "0") {
          latlong.push("[" + long + "," + lat + "]");
        }
      }
      if (lat != null && long == null) {
        long = edellinenlong;

        if (lat != "0" && long != "0") {
          latlong.push("[" + long + "," + lat + "]");
        }
      }
      if (lat == null && long == null) {
        long = edellinenlong;
        lat = edellinenlat;
        if (lat != "0" && long != "0") {
          latlong.push("[" + long + "," + lat + "]");
        }
      }
      if (laskuri === 0) {
        eka = [lat, long];
        laskuri++;
      }
      vika = [lat, long];
    }
    else {
      eka = [0, 0];
      latlong.push("[" + edellinenlong + "," + edellinenlat + "]");
      vika = [0, 0];
    }
  }
  var merkkijono = latlong.toString();
  //console.log(merkkijono);
  var temp =
    '{"type": "Feature","geometry": {"type":  "LineString","coordinates": [' +
    merkkijono +
    ']},"properties":   {"name" : "ajoreitti"}}';
  ajoreitti[0] = JSON.parse(temp);
  ajoreitti[1] = eka;
  ajoreitti[2] = vika;
  return ajoreitti;
}
//float roll = ((roll-gyro.gyro.x*timeUsed)*19/20)+(((atan2(accel.acceleration.x, accel.acceleration.z)*180)/M_PI)*1/2);
//float pitch = ((pitch+gyro.gyro.y*timeUsed)*19/20)+(((atan2(accel.acceleration.y, accel.acceleration.z)*180)/M_PI)*1/2);

function magnetometer() {
  var x, y, z, sijainnit;
  var dataset = [];
  var gvoima = 0;
  edellinen = 0;

  for (let j = updatealaraja; j < updateylaraja; j++) {
    sijainnit = cycle[j].querySelector("magnetometer");
    if (sijainnit != null) {
      x = sijainnit.querySelector("x");
      y = sijainnit.querySelector("y");
      z = sijainnit.querySelector("z");
      if (z != null && y != null && x != null) {
        x = parseFloat(x.textContent) * +0.001;
        y = parseFloat(y.textContent) * +0.001;
        z = parseFloat(z.textContent) * +0.001;
      } else {
        gvoima = edellinen;
      }
      dataset.push(gvoima - 9.821);
    } else dataset.push(0);
  }
  return dataset;
}

function accelerometer() {
  var x, y, z, sijainnit;
  var gz,gy,gx;
  var dataset = [];
  var gvoima = 0;
  edellinen = 0;

  for (let j = updatealaraja; j < updateylaraja; j++) {
    sijainnit = cycle[j].querySelector("accelerometer");
    if (sijainnit != null) {
      //console.log(sijainnit);
      ax = sijainnit.querySelector("x");
      ay = sijainnit.querySelector("y");
      az = sijainnit.querySelector("z");
      if (az != null && ay != null && ax != null) {
        gvoima = Math.sqrt(
          Math.pow(parseFloat(ax.textContent), 2) +
            Math.pow(parseFloat(ay.textContent), 2) +
            Math.pow(parseFloat(az.textContent), 2)
        );
        edellinen = gvoima;
        //console.log(gvoima);
      } else {
        gvoima = edellinen;
      }
      dataset.push(gvoima - 9.821);
      if(gvoima-9.821>korkeingvoima) korkeingvoima = gvoima-9.821;
    } else dataset.push(0);
    sijainnitg = cycle[j].querySelector("gyro");
    if (sijainnitg != null) {
      //console.log(sijainnitg);
      gx = parseFloat(sijainnitg.querySelector("x").textContent);
      gy = parseFloat(sijainnitg.querySelector("y").textContent);
      gz = parseFloat(sijainnitg.querySelector("z").textContent);
    }
    sijainnitm = cycle[j].querySelector("magnetometer");
    if (sijainnitm != null) {
      //console.log(sijainnitm);
      mx = parseFloat(sijainnitm.querySelector("x").textContent);
      my = parseFloat(sijainnitm.querySelector("y").textContent);
      mz = parseFloat(sijainnitm.querySelector("z").textContent);
    }
    if (
      gz != null &&
      gy != null &&
      gx != null &&
      mz != null &&
      my != null &&
      mx != null &&
      az != null &&
      ay != null &&
      ax != null
    ) {
      var millis = new Date();
      timeUsed = (millis.valueOf() - timer3.valueOf()) / 1000;
      timer3 = new Date();
      roll =
        ((roll - gx * timeUsed) * 19) / 20 +
        (((Math.atan2(ax, az) * 180) / Math.PI) * 1) / 2;
      pitch =
        ((pitch + gy * timeUsed) * 19) / 20 +
        (((Math.atan2(ay, az) * 180) / Math.PI) * 1) / 2;
      //console.log("x= "+mx+" y= "+my+" Z= "+mz);
      mag_data = [mx, my, mz];
      //console.log(mx)
      for (let i = 0; i < 3; i++) {
        hi_cal[i] = mag_data[i] - hard_iron[i];
      }
      for (let j = 0; j < 3; j++) {
        mag_data[j] =
          soft_iron[j][0] * hi_cal[0] +
          soft_iron[j][1] * hi_cal[1] +
          soft_iron[j][2] * hi_cal[2];
      }
      heading = -1*  (180 * Math.atan2(mag_data[0], mag_data[1]) / Math.PI);
      heading += 12.9;
      if(heading < 0) heading += 360;
      if(heading>360) heading -= 360;
    }
  }
  return dataset;
}

function korkeus() {
  var sijainnit, edellinenkorkeus, korkeus;
  var altitude = [];
  for (let j = updatealaraja; j < updateylaraja; j++) {
    sijainnit = cycle[j].querySelector("gps");
    if (sijainnit != null) {
      korkeus = sijainnit.querySelector("altitude");
      if (korkeus != null) {
        edellinenkorkeus = korkeus.textContent;
        altitude.push(parseFloat(korkeus.textContent)); //-merenpinnasta);
      }
      if (korkeus == null) {
        korkeus = edellinenkorkeus;
        //if(korkeus !=0){altitude.push(parseFloat(korkeus));}//-merenpinnasta);}
        altitude.push(parseFloat(korkeus));
      }
    } else altitude.push(0);
  }
  return altitude;
}

function gpsnopeus() {
  var edellinen = 0;
  var speed, sijainnit;
  var nopeus;
  var dataset = [];
  for (let j = updatealaraja; j < updateylaraja; j++)
  {
    sijainnit = cycle[j].querySelector("gps");
    //console.log(sijainnit);
    if (sijainnit != null) {
        speed = sijainnit.querySelector("gpsspeed");
        if (speed != null) {
            nopeus = parseFloat(speed.textContent);
            if(nopeus>korkeinnopeus) korkeinnopeus=nopeus;
            currentspeed = nopeus;
            edellinen = nopeus;
        } else nopeus = edellinen;
        dataset.push(nopeus);
    }else dataset.push(0);
  }
  return dataset;
}

/*
function nopeus() {
    var edellinen = 0;
    var speed;
    var nopeus;
    var dataset = [];
    var laskuri = 0;
    for (let j = updatealaraja; j < updateylaraja; j++) {
        speed = cycle[j].querySelector("speed");
        if (speed != null) {
            nopeus = parseInt(speed.textContent);
            edellinen = nopeus;
        }
        else nopeus = edellinen;
        dataset.push(nopeus);
        laskuri++
        if (laskuri > 30) {
            return false;
        }
    }
    return dataset;
}

function rpm() {
    var edellinen = 0;
    var revs;
    var kierrosluku = [];
    var dataset = [];
    for (let j = updatealaraja; j < updateylaraja; j++) {
        revs = cycle[j].querySelector("rpm");
        if (revs != null) {
            kierrosluku = parseFloat(revs.textContent);
            edellinen = kierrosluku;
        }
        else {
            kierrosluku = edellinen;
        }
        dataset.push(kierrosluku);
    }
    return dataset;
}

function kulutus() {
    var edellinen = 0;
    var fuel;
    var fuelrate = [];
    var dataset = [];
    for (let j = updatealaraja; j < updateylaraja; j++) {
        fuel = cycle[j].querySelector("fuel_rate");
        if (fuel != null) {
            fuelrate = parseFloat(fuel.textContent);
            edellinen = fuelrate;
        }
        else fuelrate = edellinen;
        dataset.push(fuelrate);
    }
    return dataset;
}

function jarrut() {
    var edellinen = 0;
    var brakes;
    var brake = [];
    var dataset = [];
    for (let j = updatealaraja; j < updateylaraja; j++) {
        brake = cycle[j].querySelector("brake");
        if (brake != null) {
            brakes = parseFloat(brake.textContent);
            edellinen = brakes;
        }
        else brakes = edellinen;
        dataset.push(brakes);
    }
    return dataset;
}
*/
//chart format
function drawChart(arvo) {
  //var kierrosluvut = rpm();
  //var kulut = kulutus();
  var altitude = korkeus();
  var gforce = accelerometer();
  //if (nopeus()) { var speed = nopeus; }
  var speed = gpsnopeus();
  //var brake = jarrut();
  var times;
  var timeset = [];
  for (let i = 0; i < updateylaraja; i++) {
    times = cycle[i].querySelector("time");
    if (times != null) timeset.push(times.textContent.slice(11));
    else {
      timeset.push("");
    }
  }

  var data = {
    labels: timeset,
    datasets: [
      {
        label: "Nopeus",
        data: speed,
        borderColor: "rgb(0, 255, 0)",
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        tension: 0.1,
        yAxisID: "y1",
        order: 1,
      },
      /*{
            label: 'Kierrosluku',
            data: kierrosluvut,
            borderColor: 'rgb(255, 0, 0)',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            tension: 0.1,
            yAxisID: 'y',
            order: 2
        },
        {
            label: 'Polttoaineenkulutus',
            data: kulut,
            borderColor: 'rgb(0, 0, 255)',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            tension: 0.1,
            yAxisID: 'y',
            order: 1
        },*/
      {
        label: "Kiihtyvyys",
        data: gforce,
        borderColor: "rgb(255, 0, 255)",
        backgroundColor: "rgba(255, 0, 255, 0.5)",
        tension: 0.1,
        yAxisID: "y",
        order: 3,
      } /*
        {
            label: 'Jarrutus',
            data: brake,
            fill: true,
            borderColor: 'rgb(255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
            tension: 0.1,
            yAxisID: 'y',
            order: 4
        },*/,
      {
        label: "Korkeus",
        size: 20,
        data: altitude,
        fill: true,
        borderColor: "rgb(160, 160, 160)",
        backgroundColor: "rgba(160, 160, 160, 0.5)",
        tension: 0.1,
        yAxisID: "y1",
        order: 2,
      },
    ],
  };
  var config = {
    type: "line",
    data: data,
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          position: "left",
        },
        y1: {
          beginAtZero: true,
          min: 0, //merenpinnasta
          max: korkeinkohta,
          position: "right",
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
      /*plugins: {
              title: {
                display: true,
                text: 'Testi',
                font: {
                  size: 30
                }
              }
            },*/
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      options: {
        responsive: true,

        maintainAspectRatio: false,
      },
    },
  };
  return config;
}

//gather chart data
function updateChart() {
  //var kierrosluvut = rpm();
  //var consumption = kulutus();
  var speed = gpsnopeus();
  var altitude = korkeus();
  var gforce = accelerometer();
  //var brake = jarrut();
  const data = [];
  var times;
  var timeset = [];
  for (let i = updatealaraja; i < updateylaraja; i++) {
    times = cycle[i].querySelector("time");
    if (times != null) timeset.push(times.textContent.slice(11));
    else {
      timeset.push("");
    }
  } 
  
  data[0] = timeset;
  data[1] = speed;
  //data[2] = kierrosluvut;
  //data[3] = consumption;
  data[2] = gforce;
  //data[5] = brake;
  data[3] = altitude;

  return data;
}

//redraw chart data
function KaavioUpdate(data, chart) {
  chart.data.labels = data[0];
  chart.data.datasets[0].data = data[1];
  chart.data.datasets[1].data = data[2];
  chart.data.datasets[2].data = data[3];
  if(korkeinnopeus>korkeinkohta)chart.config.options.scales.y1.max = korkeinnopeus;
  else chart.config.options.scales.y1.max = korkeinkohta;
  chart.config.options.scales.y.max = korkeingvoima;
  //chart.data.datasets[3].data = data[4];
  //chart.data.datasets[4].data = data[5];
  //chart.data.datasets[5].data = data[6];
  chart.update("none");
}

function merkkivalikko(e){
  window.open(this.href,'targetWindow',
  `toolbar=no,
   location=yes,
   status=no,
   menubar=no,
   scrollbars=no,
   resizable=no,
   width=300,
   height=150`);
return false;
}

//opensmap
function DrawMap(eka, ajoreitti) {
  removeMap(map);
  L.Control.include({
      _refocusOnMap: L.Util.falseFn // fixes chromium bug or feature when clicking on marker.
  });
  map = L.map(kartta, { rotate: true }).setView(eka, 12);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var testiIcon = L.divIcon({
    className: "",
    html: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 33 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><g transform="matrix(1,0,0,1,0.233507,-0.379231)"><g transform="matrix(0.0872488,0,0,0.0872488,-99.8898,-159.515)"><path d="M1280.51,2192.08c-76.809,-20.688 -133.408,-90.88 -133.408,-174.187c0,-99.55 80.823,-180.373 180.373,-180.373c99.55,0 180.373,80.823 180.373,180.373c-0,86.488 -61.004,158.841 -142.294,176.339l-42.295,200.804l-42.749,-202.956Z" style="fill:#f00;stroke:#000;stroke-width:9.78px;"/></g></g></svg>',
    iconAnchor: [16, 50],
    iconSize: [32, 50],
    popupAnchor: [0, -28],
  });

  /*
    var tiles2 = L.tileLayer("./script/maps/{z}/{x}/{y}.png", {
    //center: [62.45798688101115, 29.568038734751077],
    maxZoom: 16,
    minZoom: 13,
  }).addTo(map);
  */
  //http://openwms.fmi.fi/geoserver/wms?//service=WMS&version=1.3.0&request=GetMap&layers=Radar:suomi_rr12h_eureffin&styles=&bbox=59.7,19.1,70.1,31.7&wi//dth=512&height=422&crs=EPSG:4326&format=image/png&

  kerrokset = {
    None: L.tileLayer("", {})
  }
  sadekartta = L.tileLayer
      .wms("https://openwms.fmi.fi/geoserver/wms?"+Math.random()+"&", {
        format: "image/png",
        layers: "Radar:suomi_rr_eureffin",
        transparent: "True",
      }).setOpacity(0.7);
    //https://opendata.fmi.fi/wfs/fin?service=WFS&version=2.0.0&request=GetFeature&storedquery_id=fmi::observations::lightning::simple-->
  
  if(suora){
    layers = L.control.layers(kerrokset).addTo(map);
    layers.addBaseLayer(sadekartta, "Sadekartta");
  }
  //console.log(rajat);
  var line = L.polyline(rajat, { color: "red" });
  line.addTo(map);

  map.attributionControl.setPosition("bottomleft");
  this.route = L.geoJSON(ajoreitti[0]).addTo(map);
  //tiles2.fitBounds([[62.26459856482166, 29.96487945350392], [62.651375197200636, 29.171198015998236]]);
  const resizeObserver = new ResizeObserver(() => {
    map.invalidateSize();
  });

  resizeObserver.observe(document.querySelector(".leaflet-container"));
  var aika = cycle[0].querySelector("time");
  console.log(aika);
  if (aika != null){
      aloitusaika = new Date(aika.textContent.slice(0,19));
  }
  keskiarvonopeudet = 0;
  keskiarvonopeus = 0;
  for (var i = 0; i < merkit.length; i++) {
    markers[i] = L.marker([merkit[i][1], merkit[i][2]])
      .bindPopup(merkit[i][3] + ", " + merkit[i][4])
      /*.bindTooltip(merkit[i][0], {
        permanent: true,
        direction: "right",
        className: "kuvaus",
      })*/
      .addTo(map).on('click', showModifyMarker);
    markers[i].setIcon(icons[0]);
  }
  for (var i = 0; i < rajamerkit.length; i++) {
    bordermarkers[i] = L.marker([rajamerkit[i][1], rajamerkit[i][2]])
      .bindPopup(rajamerkit[i][3] + ", " + rajamerkit[i][4])
      .bindTooltip(rajamerkit[i][0], {
        permanent: true,
        direction: "right",
        className: "kuvaus",
      })
      .addTo(map);
    bordermarkers[i].setIcon(icons[rajamerkit[i][5]]);
  }
  /*if (getCookie("merkit")) {
    try {
      temp2 = JSON.parse(getCookie("merkit"));
    } catch (error) {
      console.log("Cookie not found.");
    }
  } else {
    temp2 = JSON.parse(localStorage.getItem("markers"));
  }
  if (temp2 != null) {
    for (var i = 0; i < temp2.length; i++) {
      temp2[i] = L.marker([temp2[i][1], temp2[i][2]])
        .bindPopup(temp2[i][3] + ", " + temp2[i][4])
        .bindTooltip(temp2[i][0], {
          permanent: true,
          direction: "right",
          className: "kuvaus",
          icon: testiIcon,
        })
        .addTo(map);
    }
  }*/
  return map;
}

//slider movement to update page content
function UpdatePage(slideri) {
  //console.log(slideri);
  let reitti = gps(slideri);
  this.route.clearLayers();
  //let data = reitti[0].geometry.coordinates[1];
  //console.log(data);
  route = L.geoJSON(reitti[0]).addTo(map);
  if(document.getElementById("center").checked){ map.setView(reitti[2]);}
  //console.log("heading = " + heading);
  map.setBearing(suunta(lat2, lon2, currentlat, currentlon));
  var aika = cycle[updateylaraja-1].querySelector("time");
  if(aika!=null) nykyinenaika = new Date(aika.textContent.slice(0,19));
  matka(matkametreina/1000, currentspeed);
  /*if (markers.length < merkit.length) {
    for (var i = markers.length; i <= merkit.length - 1; i++) {
      markers.push(
        L.marker([merkit[i][1], merkit[i][2]])
          .bindPopup(merkit[i][3] + ", " + merkit[i][4])
          /*.bindTooltip(merkit[i][0], {
            permanent: true,
            direction: "right",
            className: "kuvaus",
          })
          .addTo(map)
      );
    }
  }*/
  KaavioUpdate(updateChart(slideri), kaavio);
}

var reader = new FileReader();
file.addEventListener("change", function () {
  reader.onload = function (data) {
    //console.log("button1");
    parseXML(data);
    let reitti = gps(arvo);
    map = DrawMap(reitti[1], reitti[0]);
    if(kaavio) kaavio.destroy();
    kaavio = new Chart(chart, drawChart(raja));
    clearTimeout(toista);
    playTrack();
  };
  reader.readAsText(file.files[0]);
});

function removeMap(m){
  if(m){
    m.off();
    m.eachLayer(function (layer) { m.removeLayer(layer);})
    $(".leaflet-interactive").remove();
    m.remove();
    m = null;
  }
}

const button2 = document.getElementById("btnSerial");
button2.addEventListener("click", async () => {
  await navigator.serial
    .requestPort()
    .then(async (port) => {
      await port.open({ baudRate: 115200 });
      const reader = port.readable.getReader();
      var laskuri = 1;
      var tosi = false;
      var tosi2 = true;
      var eka = true;
      var parse = "";
      document.getElementById("textfile").value = null;
      while (true) {
        const { value, done } = await reader.read();
        datamerkkijono += new TextDecoder().decode(value);
        if (datamerkkijono.indexOf("</cycle>") + luku > luku) {
          if (eka) {
            datamerkkijono = datamerkkijono.slice(
              datamerkkijono.indexOf("<cycle>")
            );
            luku = datamerkkijono.indexOf("</cycle>") + 8;
            tosi = true;
            eka = false;
          } else if (datamerkkijono.indexOf("</cycle>", luku + 1) > luku) {
            luku = datamerkkijono.indexOf("</cycle>", luku + 1);
            tosi = true;
          }
          //console.log("luku" +luku);
          //console.log(datamerkkijono);
        }
        if (tosi) {
          if (datamerkkijono.length > luku) {
            datajono = datamerkkijono.slice(
              0,
              datamerkkijono.lastIndexOf("</cycle>") + 8
            );
            //jono = datajono.slice(datajono.indexOf("<cycle>"));
            //console.log(jono);

            parse = "<data>" + datajono + "</data>";
            //console.log(laskuri);
            parseXMLs(parse);
            let reitti = gpss(laskuri);

            //console.log(reitti);
            if (tosi2) {
              tosi2 = false;
              map = DrawMap(reitti[1], reitti[0]);
              if(kaavio)kaavio.destroy();
              kaavio = new Chart(chart, drawChart(raja));
            } else {
              this.route.clearLayers();
              this.route = L.geoJSON(reitti[0]).addTo(map);
              if(document.getElementById("center").checked) {map.setView(reitti[2]);}
              KaavioUpdate(updateChart(laskuri), kaavio);
            }
            laskuri = laskuri + 1;
            tosi = false;
          }
        }

        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock();
          break;
        }

        // value is a string.
      }
    })
    .catch((e) => {
      console.log("yhteys katkesi.");
      console.log(e);
    });
});

function showAddMarker() {
  latitude = structuredClone(currentlat);
  longtitude = structuredClone(currentlon);
  console.log("view");
  $("#marker-form").dialog();
}

function showModifyMarker(e){
  console.log("view this")
  var temp = this;
  var luku = 0;
  var lat = temp.getLatLng()["lat"];
  var lon=temp.getLatLng()["lng"];
  for(var i = 0; i<markersdata.length;i++){
    if(parseFloat(markersdata[i][1]) === parseFloat(lat) || parseFloat(markersdata[i][2]) ===parseFloat(lon))
    {
       luku = i;
       break;
    }
  }
  //console.log(luku);
  //console.log(markersdata[0][1]);
  //document.getElementById('name2').value=markersdata[luku][0];
  //document.getElementById('desc2').value=markersdata[luku][3];
  //document.getElementById('accuracy2').value=markersdata[luku][4];
  $("#name2").val(markersdata[luku][0]);
  $("#desc2").val(markersdata[luku][3]);
  $("#accuracy2").val(markersdata[luku][4]);

  $( "#marker2-form" ).dialog({
    dialogClass: "no-close",
    buttons: [
      {
        text: "Palaa",
        click: function(){$( this ).dialog("destroy");document.getElementById("marker2-form").reset();}
      }
      ,
      {
        text: "Poista",
        click: function(){removeMarker(temp, luku);}
      }
    ]
  });
  //testi = $("marker2-form").dialog({buttons: [{label:"Palaa", click: "0"/*hideModifyMarker()*/}, {label:"Poista", click:removeMarker(this)}]});
  //testi.dialog("open");

}

function hideAddMarker() {
  console.log("destroy");
  $(this).dialog("close");
  document.getElementById("marker-form").reset();
}


function hideModifyMarker() {
  console.log("destroy");
  $("#marker2-form").dialog("destroy");
  document.getElementById("marker2-form").reset();
}

function removeMarker(e, luku)
{
  if(map.hasLayer(e))
  {
    map.removeLayer(e);
    markersdata.splice(luku,1);
    fetch("/merkit", {
    method: "POST",
    headers:{"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify({
      markersdata 
    })
  })
  }
  hideModifyMarker();
}


function addMarker() {
  var lat = $
  console.log("add");
  var nimi = $("#name").val();
  var kuvaus = $("#desc").val();
  var tarkkuus = $("#accuracy").val();
  if (true){//latitude != 0 && longtitude != 0) {
    markersdata.push([nimi, latitude, longtitude, kuvaus, tarkkuus]);
    L.marker([latitude, longtitude])
      .bindPopup(kuvaus + ", " + tarkkuus)
      .setIcon(icons[0])
      /*.bindTooltip(nimi, {
        permanent: true,
        direction: "right",
        className: "kuvaus",
      })*/
      .addTo(map).on('click', showModifyMarker);
    fetch("/merkit", {
      method: "POST",
      headers:{"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({
        markersdata 
      })
    });
     latitude = 0;
    longtitude=0;
    //setCookie("merkit", JSON.stringify(markersdata), 365);
    //localStorage.setItem("markers", JSON.stringify(markersdata));
    $("#marker-form").dialog("destroy");
    document.getElementById("marker-form").reset();


  }
}

//const button3 = document.getElementById("live");
//button3.addEventListener("click", function () {
function live() {
  if (!suora) {
    //console.log("start");
    $.getJSON("/start", function (data)
    {
      if(data!=null){
        clearTimeout(toista);
        suora = true;
        document.getElementById("textfile").value= null;

        document.getElementById("live").innerHTML = "Save";
        //looppi = setInterval(readLive, 500);
        readLive();
        ilmatieteenlaitos();
      }
      })
    }
    else {
     console.log("stop");
      $.getJSON("/stop", function (data) {
       // if(data!=null){
        document.getElementById("live").innerHTML = "Live!";
        suora = false;
        clearTimeout(looppi);
        clearTimeout(ilmat);
        livetosi2=true;
        liveeka=true;
        //}
      });
    }
  }

  

livetosi = false;
livetosi2 = true;
liveeka = true;
liveoldlength = 0;

function readLive() {
  start = performance.now();
  var laskuri = 1;
  var luku = 0;
  var parse = "";
  $.getJSON("/live", function (ajodata) {
    //var x = new XMLHttpRequest();
    //x.open("GET", 'serve.php',  true);
    //x.send()
    //ajodata = {{merkkijono}};
    //ajodata = reloadJs();

    if (ajodata != null) {
      //laskuri=ajodata.split("</cycle>").length-1;
      //console.log("ajodata=" + ajodata);
      datamerkkijono = ajodata; //open( "GET", "./function.php", false );
      //console.log(datamerkkijono.lenght);
      //console.log(datamerkkijono.length +" >" +liveoldlength);
      //if(true){ //datamerkkijono.length > liveoldlength) {
        //console.log("lenght");
        //liveoldlength = datamerkkijono.length;
        //if (datamerkkijono.indexOf("</cycle>") + luku > luku) {
        if (liveeka) {
            //console.log("eka");
            laskuri = datamerkkijono.split("</cycle>").length - 1;
            //datamerkkijono = datamerkkijono.slice(datamerkkijono.indexOf("<cycle>"));
            //luku = datamerkkijono.indexOf("</cycle>") + 8;
            //livetosi = true;
            //liveeka = false;
          //} else if (datamerkkijono.indexOf("</cycle>", luku + 1) > luku) {
            //luku = datamerkkijono.indexOf("</cycle>", luku + 1);
            //livetosi = true;
        }
          //console.log("luku =" +luku);
          //console.log(datamerkkijono);
        //}
        //if (livetosi) {
          //if (datamerkkijono.length > luku) {
        datajono = datamerkkijono.slice(
          0,
          datamerkkijono.lastIndexOf("</cycle>") + 8
        );
            //jono = datajono.slice(datajono.indexOf("<cycle>"));
            //console.log(datajono);

            parse = "<data>" + datajono + "</data>";
            //console.log(parse);
            parseXMLs(parse);
            //laskuri = parse.split("</cycle>").length - 1;
            //console.log(laskuri);
            let reitti = gpss(laskuri);


            //console.log(reitti);
            if (livetosi2) {
              livetosi2 = false;
              map = DrawMap(reitti[1], reitti[0]);
              reittiohje = L.Routing.control({
                  waypoints:[
                      L.latLng(currentlat,currentlon),
                      /*L.latLng(currentlat,currentlon)*/[]],
                  show:false,
                  collapsible:true,
                  router: L.Routing.osrmv1({
                      serviceUrl: 'http://'+osrmurl+'/route/v1'}),
                      routeWhileDragging: true,
                      timeout:150,
                      geocoder: L.Control.Geocoder.nominatim()
              }).addTo(map);
              //iter = L.Routing.itinerary()
              //iter.hide();
              //L.Control.geocoder().addTo(map);
              if(kaavio)kaavio.destroy();
              kaavio = new Chart(chart, drawChart(raja));
            }
            else {
              let reitti = gpss(laskuri);
              route.clearLayers();
              //let data = reitti[0].geometry.coordinates[1];
              //console.log(data);
              route = L.geoJSON(reitti[0]).addTo(map);
              if(document.getElementById("center").checked){map.setView(reitti[2]);}
              //console.log("heading = " + heading);
              map.setBearing(suunta(lat2, lon2, currentlat, currentlon));
              var aika = cycle[updateylaraja-1].querySelector("time");
              if(aika!=null) nykyinenaika = new Date(aika.textContent.slice(0,19));
              matka(matkametreina/1000, currentspeed);
              if(reittiohje != null){
                try{
                reittiohje.spliceWaypoints(0,1,L.latLng(currentlat,currentlon));
                }
                catch(e)
                {console.log("reittiohje");}
              }
              if (markers.length < merkit.length) {
                for (var i = markers.length; i < merkit.length; i++) {
                  markers.push(
                    L.marker([merkit[i][1], merkit[i][2]])
                      .bindPopup(merkit[i][3] + ", " + merkit[i][4])
                      /*.bindTooltip(merkit[i][0], {
                        permanent: true,
                        direction: "right",
                        className: "kuvaus",
                      })*/
                      .addTo(map)
                  );
                }
              }
              KaavioUpdate(updateChart(laskuri), kaavio);
            }
            //laskuri = laskuri + 1;
            tosi = false;
          //}
        //}
     // }
    }
  end = performance.now();
  time = end-start;
  if(time<500){
    looppi =setTimeout(readLive, 500-time);
  }
  else {
    console.log("Live :" +time);
    looppi = setTimeout(readLive, 0);
  }
  });
}
