import React, { Component } from 'react'
import data from './data.json'
import { Map, Marker, InfoWindow } from 'google-maps-react'


class MapContainer extends Component {
	state = {
		showingInfoWindow: false,
		activeMarker:      {},
		selectedPlace:     {},
		nameInput: '',
		cityInput: '',
		dateInput: ''
	}


	//////////////////////////////////////////////////////////////////////////
		/* State handlers */
	//////////////////////////////////////////////////////////////////////////

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

	handleDateChange = e => {
		this.setState({
			dateInput: e.target.value
		})
	}


	//////////////////////////////////////////////////////////////////////////
		/* Filters */
	//////////////////////////////////////////////////////////////////////////

	filterByName = name => {
		return this.createAllMarkers(data).filter(vet => vet.props.company === name)
	}

	filterByCity = city => {
		return this.createAllMarkers(data).filter(vet => vet.props.city === city)
	}

	filterByLastInspectionDate = date => {
		return this.createAllMarkers(data).filter(vet => vet.props.lastInspection === date)
	}

	filterByNameAndCity = (name, city) => {
		return this.filterByName(name).filter(n => n.props.city === city)
	}

	filterByNameAndDate = (name, date) => {
		return this.filterByName(name).filter(n => n.props.lastInspection === date)
	}

	filterByCityAndDate = (city, date) => {
		return this.filterByCity(city).filter(n => n.props.lastInspection === date)
	}

	filterByNameAndCityAndDate = (name, city, date) => {
		return this.filterByNameAndCity(name, city).filter(n => n.props.date === date)
	}


	//////////////////////////////////////////////////////////////////////////
		/* Create Marker(s) */
	//////////////////////////////////////////////////////////////////////////

	createMarker = marker => {
		const pin_color = {
			red: 'ff0000',
			green: '00ff00',
			blue: '0000ff'
		}

		let dateArr = marker.lastInspection.split('-')
		let dateOfLastInspection = new Date(dateArr[0], dateArr[1] - 1, dateArr[2])

		let today = new Date()
		let oneYearAgo = today.setFullYear(today.getFullYear() - 1)

		let color

		if(oneYearAgo >= dateOfLastInspection) {
			color = pin_color.red
		} else {
			color = pin_color.green
		}

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
			icon={ `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}` }
			position={ marker.position }
			image={ marker.imageUrl }/>
	}

	createAllMarkers(markers) {
		return markers.map(marker => {
			return this.createMarker(marker)
		})
	}


	//////////////////////////////////////////////////////////////////////////
		/* Create Filtered Markers */
	//////////////////////////////////////////////////////////////////////////

	displayMarkers = data => {
		const nameField = this.state.nameInput,
		      cityField = this.state.cityInput,
		      dateField = this.state.dateInput

		let shownMarkers
		if(nameField === '' && cityField === '' && dateField === '') {
			shownMarkers = this.createAllMarkers(data)
		} else if(nameField && cityField === '' && dateField === ''){
			shownMarkers = this.filterByName(nameField, data)
		} else if(cityField && nameField === '' && dateField === '') {
			shownMarkers = this.filterByCity(cityField, data)
		} else if(dateField && nameField === '' && cityField === '') {
			shownMarkers = this.filterByLastInspectionDate(dateField, data)
		} else if(nameField && cityField) {
			shownMarkers = this.filterByNameAndCity(nameField, cityField)
		} else if(nameField && dateField) {
			shownMarkers = this.filterByNameAndDate(nameField, dateField)
		} else if(cityField && dateField) {
			shownMarkers = this.filterByCityAndDate(cityField, dateField)
		} else if(nameField && cityField && dateField) {
			shownMarkers = this.filterByNameAndCityAndDate(nameField, cityField, dateField)
		}
		return shownMarkers
	}

	render() {
		return (
			<div className="container-fluid">
				<h3>Filter by fields:</h3>
					<div className="form-group">
						<div className="row">
							<div className="col-2">
								<input className="form-control" type="text" placeholder="Name" value={ this.state.nameInput } onChange={ this.handleNameChange }/>
							</div>
							<div className="col-2">
								<input className="form-control" type="text" placeholder="City" value={ this.state.cityInput } onChange={ this.handleCityChange }/>
							</div>
							<div className="col-2">
							    <input className="form-control" type="date" placeholder="Date" value={ this.state.dateInput } onChange={ this.handleDateChange}/>
							</div>
							<div className="col-3">
								will
							</div>
						</div>
					</div>
				<Map
					google={ this.props.google }
					style={ { width: '70%', height: '80%' } }
					onClick={ this.onMapClick }
					zoom={ 6 }
					initialCenter={ {
						lat: 31.36,
						lng: -100.06
					} }>

					{ this.displayMarkers(data) }

					<InfoWindow
						marker={ this.state.activeMarker }
						visible={ this.state.showingInfoWindow }
						onOpen={ this.onWindowOpen }
						onClose={ this.onWindowClose }>
						<div>
							<img
								alt={ '' }
								src={ this.state.selectedPlace.image }
								height={ 32 } width={ 32 }/>
							<h3>Name: { this.state.selectedPlace.company }</h3>
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
			</div>
		)
	}
}


export default MapContainer
