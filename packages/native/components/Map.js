import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import logo from './logo.png';

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.handleMapReady = this.handleMapReady.bind(this);
  }

  handleMapReady() {
    try {
      navigator.geolocation.getCurrentPosition(
        position => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          this.map.animateToRegion(region);
        },
        error => {
          Alert.alert('', 'Error al detectar tu locación');
        },
      );
    } catch (e) {
      alert(e.message || '');
    }
  }

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        showsUserLocation
        ref={map => {
          this.map = map;
        }}
        onMapReady={this.handleMapReady}
        style={StyleSheet.absoluteFill}
      >
        {this.props.markers.map(marker => (
          <Marker
            key={marker.coordinates.latitude}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
            image={logo}
          />
        ))}
      </MapView>
    );
  }
}
