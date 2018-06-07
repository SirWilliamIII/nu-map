import React, { Component } from 'react'

export default class Form extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="form-group">
					<div className="row">
						<div className="col-md-2 col-sm-6">
							<input
								className="form-control"
								type="text"
								placeholder="Name"
								value={ this.props.name }
								onChange={ this.props.nameHandler }
							/>
						</div>
						<div className="col-md-2 col-sm-6">
							<input
								className="form-control"
								type="text"
								placeholder="City"
								value={ this.props.city }
								onChange={ this.props.cityHandler }
							/>
						</div>
						<div className="col-md-2 col-sm-6">
							<input
								className="form-control"
								type="date"
								placeholder="Date"
								value={ this.props.date }
								onChange={ this.props.dateHandler }
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
