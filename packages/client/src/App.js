import React, { Component } from 'react';
import './App.css';
import { QueryRenderer, graphql } from 'react-relay';
import GoogleMapReact from 'google-map-react';
import environment from './relay';

import { Row, Col, Block } from 'jsxstyle';
class App extends Component {
  render() {
    return (
      <div className="App">
        <QueryRenderer
          environment={environment}
          query={graphql`
            query AppQuery {
              viewer {
                vendors {
                  id
                  name
                  address
                  category
                  diet
                  distance
                  coordinates {
                    latitude
                    longitude
                  }
                }
              }
            }
          `}
          render={({ error, props }) => {
            if (error) {
              return <div>{error.message}</div>;
            }

            if (!props) {
              return <div>Loading</div>;
            }

            return (
              <Row>
                <Col height="100vh" width="50vw">
                  <Block padidng="16px" fontSize="30px">
                    Vendors
                  </Block>
                  {props.viewer.vendors.map(vendor => (
                    <Col key={vendor.id} alignItems="flex-start" margin="16px">
                      <Block fontSize="20px">{vendor.name}</Block>
                      <Block fontSize="10px">{vendor.category}</Block>

                      <Block marginTop="16px" fontSize="12px" textAlign="start">
                        {vendor.address}
                      </Block>
                      <Block>{vendor.diet.join(', ')}</Block>
                    </Col>
                  ))}
                </Col>
                <Col height="100vh" width="50vw">
                  <GoogleMapReact
                    defaultCenter={{
                      lat: props.viewer.vendors[0].coordinates.latitude,
                      lng: props.viewer.vendors[0].coordinates.longitude,
                    }}
                    defaultZoom={11}
                  >
                    {props.viewer.vendors.map(vendor => (
                      <Row
                        key={vendor.id}
                        lat={vendor.coordinates.latitude}
                        lng={vendor.coordinates.longitude}
                        text={vendor.name}
                        backgroundColor="#7eb785"
                        height="50px"
                        width="50px"
                        borderRadius="25px"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                      >
                        {vendor.name}
                      </Row>
                    ))}
                  </GoogleMapReact>
                </Col>
              </Row>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
