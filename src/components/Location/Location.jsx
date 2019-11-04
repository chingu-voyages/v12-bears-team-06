import React from 'react';
import ReactMapGL, { NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Loading from '../Loading/Loading';
import './location.scss';

//const TOKEN = 'pk.eyJ1IjoiY2hpbmd1djEyIiwiYSI6ImNrMjRpaTc0ejBqdTYzbXFtMGRpaWI4Y3oifQ.5j9FYNBF0wZ4Z2DmAjYWYg';
const TOKEN = 'pk.eyJ1IjoiY2hpbmd1djEyIiwiYSI6ImNrMjRpaGRlczAxa2Mzb256MGl0ZDliMWMifQ.4MY11PlRywyFlqXeTLeI4A';


const Location = ({ data, attractions, loading, destination, handleLocation }) => {

  const _onViewportChange = (data) => {
    handleLocation(data);
  }

  const settings = {
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    touchZoom: true,
    doubleClickZoom: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85
  };

  const loadPopups = (attractions) => {
    return attractions.map(spot => {
      return (
        <React.Fragment key={spot.name}>
          <Popup
            tipSize={7}
            anchor="bottom-right"
            longitude={spot.long}
            latitude={spot.lat}
            closeOnClick={false}><a href={spot.url} target="_blank">{spot.name}</a></Popup>
        </React.Fragment>
      )
    });
  };

  let map = loading ? <Loading /> : destination ? <Loading /> : <p className="msg_nodestination">You haven't entered your destination yet.</p>;


  if (destination && !loading && data.latitude !== '') {
    map = (
      <div className="map_wrap">
        <ReactMapGL
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/chinguv12/ck2hew0nx1xbc1cs3ly8c0u7p"
          width={'100%'}
          height={250}
          zoom={11}
          maxZoom={20}
          {...data}
          {...settings}
          onViewportChange={_onViewportChange}>
          {loadPopups(attractions)}
          <div style={{ position: 'absolute', right: '4px', top: '4px' }}>
            <NavigationControl
              onViewportChange={_onViewportChange}
              settings={settings} />
          </div>
        </ReactMapGL>
      </div>
    );
  };

  return (
    <div className="container container_location">
      <h2 className="">Location</h2>
      {map}
    </div>
  );
};

export default Location;