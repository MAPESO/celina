import React, { Component } from 'react';
import './App.css';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './relay';

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
              <div>
                Vendors
                <ul>
                  {props.viewer.vendors.map(vendor => <li key={vendor.id}>{vendor.name}</li>)}
                </ul>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
