import React, { Component } from 'react'
import MapContainer from './MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import key from './secret'

class App extends Component {
	render() {
		return (
			<div className="App">
				<MapContainer google={ this.props.google }/>
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: key.apiKey
})(App)

