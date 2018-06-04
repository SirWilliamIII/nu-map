import React, { Component } from 'react'
import { Map } from 'google-maps-react'

class MapContainer extends Component {
	state = {
		showingInfoWindow: false,
		activeMarker:      {},
		selectedPlace:     []
	}
	render() {
		return (
			<Map
				google={ this.props.google }
				style={ { width: '80%', height: '60%' } }
				onClick={ this.onMapClick }
				zoom={ 6 }
				initialCenter={ {
					lat: 31.16,
					lng: -100.06
				} }>
			</Map>
		)
	}
}

export default MapContainer
