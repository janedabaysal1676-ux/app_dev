let initialZoomLevel = 10;
let initialCenter = [1588911.734653, 6026906.806230];

let mapObjectInput = {
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'map',
        view: new ol.View({
          center: initialCenter,
          zoom: initialZoomLevel
        })
      };

var map = new ol.Map(mapObjectInput);

document.getElementById('zoom-out').onclick = function() {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function() {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
};

document.getElementById('reset').onclick = function() {
    var view = map.getView();
    view.animate({zoom: initialZoomLevel}, {center: initialCenter});
};

document.getElementById('left').onclick = function() {
    var view = map.getView();
    var currentCenter = view.getCenter();
    view.animate({center: [currentCenter[0] - 100000, currentCenter[1]]});
};

document.getElementById('right').onclick = function() {
    var view = map.getView();
    var currentCenter = view.getCenter();
    view.animate({center: [currentCenter[0] + 100000, currentCenter[1]]});
};

document.getElementById('up').onclick = function() {
    var view = map.getView();
    var currentCenter = view.getCenter();
    view.animate({center: [currentCenter[0], currentCenter[1] + 100000]});
};

document.getElementById('down').onclick = function() {
    var view = map.getView();
    var currentCenter = view.getCenter();
    view.animate({center: [currentCenter[0], currentCenter[1] - 100000]});
};

var measureMode = false;
var points = [];


document.getElementById('measure').onclick = function() {
    measureMode = true;
    points = [];
    document.getElementById('result').innerHTML = "Click two points on the map.";
};

map.on('click', function(e) {
    if (measureMode === true) {
        points.push(e.coordinate);

        if (points.length === 2) {
            var point1 = ol.proj.toLonLat(points[0]);
            var point2 = ol.proj.toLonLat(points[1]);

            var wgs84Sphere = new ol.Sphere(6378137);
            var distance = wgs84Sphere.haversineDistance(point1, point2);


            document.getElementById('result').innerHTML =
                "Distance: " + (distance / 1000).toFixed(2) + " km";

            measureMode = false;
            points = [];
        }
    }
});

document.getElementById('location').onclick = function() {
    navigator.geolocation.getCurrentPosition(function(position) {

        var lon = position.coords.longitude;
        var lat = position.coords.latitude;

        var coordinates = ol.proj.fromLonLat([lon, lat]);

        map.getView().animate({
            center: coordinates,
            zoom: 15
        });

    });
};


