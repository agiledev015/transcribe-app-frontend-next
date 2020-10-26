import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 	-33.918861,
      lng: 	18.423300
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%', paddingBottom: "100px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBUSnlzplNdtia9169K3clgZsXjwSOGlVQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text="Cape Town"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;