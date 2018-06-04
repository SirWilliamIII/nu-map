import React, { Component } from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'
import data from './data.json'

class MapContainer extends Component {
	state = {
		showingInfoWindow: false,
		activeMarker:      {},
		selectedPlace:     [],
		nameInput: '',
		cityInput: ''
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

	onMapClick = (props) => {
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

	onWindowClose = (props, marker, e) => {
		this.setState({
			showingInfoWindow: false
		})
	}

	handleNameChange = e => {
		this.setState({
			nameInput: e.target.value
		})
	}

	handleCityChange = e => {
		this.setState({
			cityInput: e.target.value
		})
	}

	createMarker = marker => {
		let color

		const pin_color = {
			red: 'ff0000',
			green: '00ff00',
			blue: '0000ff'
		}

		let dateArr = marker.lastInspection.split('-')
		let convertedDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2])
		console.log(convertedDate.toDateString())

		let today = new Date()
		let oneYearAgo = today.setFullYear(today.getFullYear() - 1)

		if(oneYearAgo > convertedDate) {
			color = pin_color.red
		} else {
			color = pin_color.blue
		}
		return <Marker
			key={ marker.id }
			company={ marker.company }
			address={ marker.street + marker.city + marker.state + marker.zipcode }
			lastInspection={ marker.lastInspection }
			onClick={ this.onMarkerClick }
			name={ marker.name }
			icon={ `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}` }
			position={ marker.position }/>
	}

	createAllMarkers(markers) {
		return markers.map(marker => {
			return this.createMarker(marker)
		})
	}

	filterByCompanyName(name) {
		return this.createAllMarkers(data.vets).filter(vet => vet.props.company === name)
	}

	filterByCity(city) {
		return this.createAllMarkers(data.vets).filter(vet => vet.props.city === city)
	}

	displayMarkers = () => {
		let res
		if(this.state.nameInput === '' && this.state.cityInput === '') {
			res = this.createAllMarkers(data.vets)
		} else if(this.state.nameInput){
			res = this.filterByCompanyName(this.state.nameInput)
		} else if(this.state.cityInput) {
			res = this.filterByCity(this.state.cityInput)
		}
		return res
	}

	render() {
		return (
			<div>
				<h3>Search By: </h3>
					<div className="form-group">
						<div className="row">
							<div className="col-4">
								<input className="form-control" type="text" placeholder="Company Name" value={ this.state.nameInput } onChange={ this.handleNameChange }/>
							</div>
							<div className="col-4">
								<input className="form-control" type="text" placeholder="City" value={ this.state.cityInput } onChange={ this.handleCityChange }/>
							</div>
						</div>
					</div>
			<Map
				google={ this.props.google }
				style={ { width: '80%', height: '60%' } }
				onClick={ this.onMapClick }
				zoom={ 6 }
				initialCenter={ {
					lat: 31.16,
					lng: -100.06
				} }>

				{ this.displayMarkers() }

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
							{ this.state.selectedPlace.address }
						</div>
						<b>Last Inspection Date:</b>
						<div>
							{ this.state.selectedPlace.lastInspection }
						</div>
					</div>
				</InfoWindow>
			</Map>
		</div>
		)
	}
}

export default MapContainer
