const axios = require('axios');

const FOUR_SQUARE_ID = process.env.FOUR_SQUARE_ID || '<INSERT YOUR KEY HERE>'
const FOUR_SQUARE_SECRET = process.env.FOUR_SQUARE_SECRET || '<INSERT YOUR KEY HERE>'

export const getInformation = async (marker, infowindow, map, click) => {
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FOUR_SQUARE_ID}&client_secret=${FOUR_SQUARE_SECRET}&v=20130815&ll=${marker.getPosition().lat()},${marker.getPosition().lng()}&limit=1`;
    return await axios.get(url).then(arr => {
        let location_data = arr.data.response.venues[0];
        let title = '<b>Name: </b>' + (location_data.name) + '<br>';
        let readMore = '<a href="https://foursquare.com/v/' + arr.data.response.venues[0].id + '" target="_blank">Read More on Foursquare Website</a>';
        let verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
        let address = '<b>Complete Address: </b>' + (location_data.location.formattedAddress[0]) + ' ' + location_data.location.formattedAddress[1] + '<br>';

        infowindow.setContent(
            title + verified + address + readMore
        );
        if (click)
            infowindow.open(map, marker);
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }).catch(err => {
        marker.addListener('click', function () {
            let content = 'Information Not Found'
            let infowindow = new window.google.maps.InfoWindow({
                content: content
            });
            infowindow.open(map, marker);
            map.setZoom(8);
            map.setCenter(marker.getPosition());
        });
    })
        ;
}