 
 
 // Layer IDs for referencing zoom level
var layerids = [{id: 'Attainment10', minzoom: 13, maxzoom: 16.1, text:'10_dots', dots:'10'}, 
                {id: 'Attainment25', minzoom: 11, maxzoom: 12.99999, text:'25_dots', dots:'25'}, 
                {id: 'Attainment50', minzoom: 9, maxzoom: 10.99999, text:'50_dots', dots:'50'}, 
                {id: 'Attainment100', minzoom: 7, maxzoom: 8.99999, text:'100_dots', dots:'100'}, 
                {id: 'Attainment150', minzoom: 5, maxzoom: 6.99999, text:'150_dots', dots:'150'}]
 
var colors =   [['Assoc', '#84ddff'],
                ['Bacc', '#0097d2'],
                ['GradPro', '#005f84'],
                ['HSunder', '#a81d40' ],
                ['SomeHE', '#f6d61a' ]] //Changed to lighter yellow from #f6b11a

// Set bounds to focus on Texas
var bounds = [
    [-140, 15], // Southwest coordinates
    [-60, 45]  // Northeast coordinates
];

document.getElementById("DotNumbers").textContent = 150

    // initialize the mapbox map here
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obmRpbm5pbmciLCJhIjoiY2oxazR5NjNvMDFveDJ5b2FzbWZwbjFpbiJ9.bixlFwP8Kf43qHa7Z6XK8g';
var map = new mapboxgl.Map({
    // container id
container: 'mapid',
    // style location
style: attainmentStyle,
    // starting position
    center: [-99.19, 31.30],
    zoom: 5, 
    maxZoom: 16,    
    minZoom: 5,
    maxBounds: bounds // Sets bounds as max
    });


 
// Add the tile layers from mapbox
map.on('load', function() {
    var navigator = new mapboxgl.NavigationControl();
  map.addControl(navigator, 'top-right');
// Update this source when 
  map.addSource('Attainment', {
    'type': 'vector',
    'url': 'mapbox://johndinning.54qpiutf'
  });
  // map.addSource("AttainmentDots",{
  //   type: 'geojson',
  //   data: 'Put THECB ARCGIS Server URL here'
  // })
  map.addLayer({
    'id': 'Attainment150',
    'type': 'circle',
    'source': 'Attainment',
    'source-layer': 'Attainment150',
    'paint': {
      'circle-radius': {
          //'base': .7,
        'stops': [[5, .8], [7, 1.1]]
      },    
      'circle-color': {
        property: 'level',
        type: 'categorical',
        stops: colors
      }
    },
    'filter': ["==", "scale", 150]
  }, "state");

  map.addLayer({
    'id': 'Attainment100',
    'type': 'circle',
    'source': 'Attainment',
    'source-layer': 'Attainment100',
    'paint': {
      'circle-radius': {
          'stops': [[7, 1.1], [9, 1.5]]
      },
      'circle-color': {
          property: 'level',
          type: 'categorical',
          stops: colors
      }
    }
  }, "state");

      map.addLayer({
        'id': 'Attainment50',
        'type': 'circle',
        'source': 'Attainment',
        'source-layer': 'Attainment50',
        'paint': {
            'circle-radius': {
                'stops': [[9, 1.5], [11, 2.0]]
            },
            'circle-color': {
                property: 'level',
                type: 'categorical',
                stops: colors
            }
        }
    }, 'state');
      map.addLayer({
        'id': 'Attainment25',
        'type': 'circle',
        'source': 'Attainment',
        'source-layer': 'Attainment25',
        'paint': {
            // make circles larger as the user zooms from z11 to z13
            'circle-radius': {
                'stops': [[11, 2.0], [13, 2.4]]
            },
            'circle-color': {
                property: 'level',
                type: 'categorical',
                stops: colors
            }
        }
    }, 'state');
         map.addLayer({
        'id': 'Attainment10',
        'type': 'circle',
        'source': 'Attainment',
        'source-layer': 'Attainment10',
        'paint': {
            // make circles larger as the user zooms from z13 to z17
            'circle-radius': {
                'stops': [[13, 2.4], [17, 12]]
            },
            // color circles by level, using data-driven styles
            'circle-color': {
                property: 'level',
                type: 'categorical',
                stops: colors
            }
        }
    }, 'state');
    map.addLayer({
        "id": "TexasOutline",
        "type": "line",
        "source": {
          'type': 'vector',
          'url': 'mapbox://johndinning.7rzn4kl6'
          },
        'source-layer': 'Texas-d92wyb',
        "paint": {
          "line-color": "rgba(0,0,0, 1)",
          "line-width": 2,
          "line-opacity": 0.7
        }
      }, 'state');
    map.addLayer({
      'id': 'Higher Education Regions',
      'type': 'line',
      'source': {
          type: 'vector',
          url: 'mapbox://johndinning.cj6fke7kt0hcq2qql92u3y0h2-1zd81'
      },
      'source-layer': 'HERegions',
      'layout': {
        'visibility':'none'
      },
      "paint": {
        "line-dasharray": [
          2,
          3
        ],
        "line-color": "rgba(0, 95, 132, 1)", //#005F84
        "line-width": 1
      }
    }, 'state');
    //Attribution Layer
        map.addLayer({
        "id": "attribution-layer",
        "type": "circle",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": null
            }
        }
    });
    map.style.sourceCaches['attribution-layer']._source.attribution =  "&copy; THECB 2018".link("http://www.thecb.state.tx.us/") + " | ACS 2012-2016 from NHGIS".link("https://www.nhgis.org/");
    // Set zoom range for each layer
    layerids.map(function(id) {
      map.setLayerZoomRange(id.id, id.minzoom, id.maxzoom); 
    }); 

    layerids.map(function(x) {
    
        var ShowText = document.getElementById(x.text);
        var zm = map.getZoom();

        if (zm >= x.minzoom && zm <= x.maxzoom){
            document.getElementById("DotNumbers").textContent = x.dots;
        }
 }); 
});


// Generate click event for to turn Attainment categories on and off
var filter = ["in", "level", 'GradPro', 'Bacc', 'Assoc', 'SomeHE', 'HSunder']; 

var colorFilter = [{Lvl: 'Assoc', hex: '#84ddff'},
                   {Lvl:'Bacc', hex: '#0097d2'},
                   {Lvl:'GradPro', hex: '#005f84'},
                   {Lvl:'HSunder', hex: '#a81d40' },
                   {Lvl:'SomeHE', hex: '#f6b11a'}];

// figure out current layer id by zoom level
function current_layer() {
  var zm = map.getZoom(); 
  if (zm >= 13) {
    return "Attainment10"; 
  } else if (zm >= 11 && zm < 13) {
    return "Attainment25"; 
  } else if (zm >= 9 && zm < 11) {
    return "Attainment50"; 
  } else if (zm >= 7 && zm < 9) {
    return "Attainment100"; 
  } else {
    return "Attainment150"; 
  }
} 

legendList = document.getElementsByClassName('clickable');

//Define the function for Legend Selector
function SelectFunction(e) {

  var Target = e.target.id; //Div ID
  var layer = current_layer(); 
  var Targetlevel = Target.match("_$") ? (Target.slice(0,-1)):Target; //Get Div or span ID using the ternary operator and regular expression ($).
  var TargetFont = document.getElementById(Targetlevel);

  // get the corresponding hex value for the level
  var level_index = colorFilter.map(function(x) {
    return x.Lvl; 
  }).indexOf(Targetlevel); 
  
  var hex = colorFilter[level_index].hex; 
  
  var Span_el = document.getElementById(Targetlevel+'_');
  
  // check if the level is in the target array; if not, then add it
  // The push() method adds one or more elements to the end of an array
  if (filter.indexOf(Targetlevel, 1) === -1) {
    filter.push(Targetlevel); 
    map.setFilter(layer, filter); 
    Span_el.style.backgroundColor = hex; 
    TargetFont.style.fontStyle = "normal"; 
  // otherwise, remove it
  } else {
    index = filter.indexOf(Targetlevel); 
    filter.splice(index, 1); 
    map.setFilter(layer, filter); 
    Span_el.style.backgroundColor = '#61666d'; 
    TargetFont.style.fontStyle = "italic"; 
  }
}; 

for (i=0; i<legendList.length; i++){
    legendList[i].addEventListener("click", SelectFunction);    
}

// Preserve filter on zoom
layerids.map(function(x) {
  map.on('zoom', function() {
    map.setFilter(x.id, filter); 
  }); 
}); 


//The map() method creates a new array from the layerisd array made above
 layerids.map(function(x) {
     map.on('zoom', function() {
         
        var ShowText = document.getElementById(x.dots);
        var zm = map.getZoom();

        if (zm >= x.minzoom && zm <= x.maxzoom){
            document.getElementById("DotNumbers").textContent = x.dots;
        }
     });   
 }); 



// This sections adds funtionality for buttons to turn on addittional layers

//starting with just one layer (HERegions), more can be added to the logic below


var toggleableLayerIds = [ 'Higher Education Regions' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = '';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}