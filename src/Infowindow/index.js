import React, { Component } from 'react'
import { InfoWindow } from 'google-maps-react'

export default class Infowindow extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<InfoWindow
				marker={ this.props.activeMarker }
				visible={ this.props.showingInfoWindow }
				onOpen={ this.props.onWindowOpen }
				onClose={ this.props.onWindowClose }>
				<div>
					<img
						alt={ '' }
						src={ this.props.image }
						height={ 32 } width={ 32 }/>
					<h3>Name: { this.props.name }</h3>
					<b>Address:</b>
					<div>
						{ this.props.children }
					</div>
					<b>Last Inspection Date:</b>
					<div>
						{ this.props.date }
					</div>
				</div>
			</InfoWindow>
		)
	}
}
