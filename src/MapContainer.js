import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'
import data from './data.json'

class MapContainer extends Component {
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

	onMapClick = props => {
		if(this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker:      null,
				selectedPlace:     props
			})
		}
	}

	onWindowOpen = () => {
		this.setState({
			showingInfoWindow: true
		})
	}

	onWindowClose = () => {
		this.setState({
			showingInfoWindow: false
		})
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

				<InfoWindow
					marker={ this.state.activeMarker }
					visible={ this.state.showingInfoWindow }
					onOpen={ this.onWindowOpen }
					onClose={ this.onWindowClose }
				>
					<div>
						<a href="/"> <img alt={ '' }
							src="https://www.poll-vaulter.com/wp-content/uploads/sites/5968/2017/12/whatever_Metro-News-UK.png"
							height={ 32 } width={ 32 }/> </a>
						<h3>Company: { this.state.selectedPlace.company }</h3>
						<b>Address:</b>
						<div>
							{ this.state.selectedPlace.street } &nbsp;
							{ this.state.selectedPlace.city }, &nbsp;
							{ this.state.selectedPlace.state } &nbsp;
							{ this.state.selectedPlace.zipcode }
						</div>
						<b>Last Inspection Date:</b>
						<div>
							{ this.state.selectedPlace.lastInspection }
						</div>
					</div>
				</InfoWindow>
			</Map>
		)
	}
}

export default MapContainer
