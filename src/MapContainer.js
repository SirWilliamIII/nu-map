import React, { Component } from 'react'
import { Map, Marker } from 'google-maps-react'
import data from './data.json'

class MapContainer extends Component {
	state = {
		showingInfoWindow: false,
		activeMarker:      {},
		selectedPlace:     []
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
			position={ marker.position }/>
	}

	createAllMarkers(markers) {
		return markers.map(marker => {
			return this.createMarker(marker)
		})
	}
	// filterByCompanyName(name) {
	// 	this.state.displayedMarkers.push(this.createAllMarkers(data.vets).filter(vet => vet.props.company === name))
	// }
	//
	// filterByLastInspectionDate(date) {
	// 	this.state.displayedMarkers.push(this.createAllMarkers(data.vets).filter(vet => vet.props.lastInspection === date))
	// }
	//
	// filterByCity(city) {
	// 	this.state.displayedMarkers.push(this.createAllMarkers(data.vets).filter(vet => vet.props.city === city))
	// }
	//
	// secondFilterByCompanyName(filter1, name) {
	// 	this.state.displayedMarkers.push(filter1.filter(n => n.props.company === name))
	// }
	//
	// secondFilterByLastInspectionDate(filter1, date) {
	// 	this.state.displayedMarkers.push(filter1.filter(n => n.props.lastInspection === date))
	// }
	//
	// secondFilterByCity(filter1, city) {
	// 	this.state.displayedMarkers.push(filter1.filter(n => n.props.city === city))
	// }
	//
	// filterByNameAndCity(name, city) {
	// 	this.state.displayedMarkers.push(this.filterByCompanyName(name).filter(n => n.props.city === city))
	// }

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
			{ this.createAllMarkers(data.vets) }
			</Map>
		)
	}
}

export default MapContainer
