import React, { Component } from 'react'
import { Marker } from 'google-maps-react'
import data from '../data.json'

export default class Markers extends Component {
	state = {
		showingInfoWindow: false,
		activeMarker:      {},
		selectedPlace:     []
	}

	onMarkerClick = (props, marker, e) => {
		if(this.state.selectedPlace) {
			this.setState({
				selectedPlace:     props,
				activeMarker:      marker,
				showingInfoWindow: true
			})
		}
	}

	createMarker = marker => {
		return <Marker
			key={ marker.id }
			company={ marker.company }
			street={ marker.street }
			city={ marker.city }
			state={ marker.state }
			zipcode={ marker.zipcode }
			lastInspection={ marker.lastInspection }
			onClick={ this.onMarkerClick }
			name={ marker.name }
			icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
			position={ marker.position }/>
	}

	createAllMarkers(markers) {
		return markers.map(marker => {
			return this.createMarker(marker)
		})
	}

	render() {
		return (
			<div>
				{ this.createAllMarkers(data.vets) }
			</div>
		)
	}
}
