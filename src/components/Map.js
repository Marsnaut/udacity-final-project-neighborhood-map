import React from "react";
import {getInformation} from "./getInformation";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '<INSERT YOUR KEY HERE>'

export default class Map extends React.Component {
  mapContainer;
  map;
  mapMarker = [];
  infowindow = '';

  componentDidMount() {
    loadMapScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`).then(arr => {
      this.initMap();
    })
      .catch(err => alert("Error Loading Map", err));
  }

  componentWillReceiveProps(newProps) {
    this.removeMarker();
    this.setMarker(newProps.places);
    this.openInfoModel(newProps.clickedPlace);
  }

  openInfoModel = (marker) =>{
    this.mapMarker.map(arr=>{
      if(arr.title === marker.title){
        this.map.setCenter(arr.getPosition());
        this.map.panBy(0, -200);
        getInformation(arr,this.infowindow,this.map,true); 
      }
    })
  }

  initMap = () => {
    this.map = new window.google.maps.Map(this.mapContainer, {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 10
    });
    this.setMarker(this.props.places);
  }

  setMarker = (place) => {
    this.mapMarker = [];
    this.infowindow = [];
    place.map((places, index) => {
      let marker = new window.google.maps.Marker(
        {
          position: places.location,
          map: this.map,
          title: places.title
        });
        this.infowindow = new window.google.maps.InfoWindow();
        getInformation(marker,this.infowindow,this.map);
        this.mapMarker.push(marker);
    })
  }

  removeMarker = () => {
    this.mapMarker.map(marker => {
      marker.setMap(null);
    })
  }

  render() {
    return (
      <div id="map" role="application" ref={el => this.mapContainer = el} aria-label="map"></div>
    )
  }
}

// Load google maps Asynchronously
function loadMapScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = src;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};