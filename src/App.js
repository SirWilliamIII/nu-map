import React, { Component } from 'react'
import MapContainer from './MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import key from './secret'

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Nu-Map</h1>
				<br/>
				<div className="container">
					<MapContainer google={ this.props.google }/>
				</div>
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: key.apiKey
})(App)

