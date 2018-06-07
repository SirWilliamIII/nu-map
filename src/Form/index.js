import React, { Component } from 'react'

export default class Form extends Component {

	render() {
		return (
			<div className="container-fluid">
				<div className="form-group">
					<div className="row">
						<div className="col-lg-3 col-md-8 col-sm-6 input-group">
							<div className="row">
								<div className="col-md-6 col-lg-8">
									<input
										className="form-control"
										type="text"
										placeholder="Name"
										value={ this.props.name }
										onChange={ this.props.nameHandler }
									/>
								</div>
								<div className="col-lg-3 col-md-6">
									<span className='input-group-btn'>
										<button className="btn btn-outline-dark btn-sm">add city</button>
									</span>
								</div>
							</div>
						</div>
						<div className="col-md-8 col-sm-6 col-lg-3">
							<div className="row">
								<div className="col-md-6 col-lg-8">
									<input
										className="form-control"
										type="text"
										placeholder="City"
										value={ this.props.city }
										onChange={ this.props.cityHandler }
									/>
								</div>
								<div className="col-lg-3 col-md-6">
									<span className='input-group-btn'>
										<button className="btn btn-outline-dark btn-sm">add date</button>
									</span>
								</div>
							</div>
						</div>
						<div className="col-md-8 col-sm-6 col-lg-3">
							<div className="row">
								<div className="col-lg-8 col-md-6">
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
				</div>
			</div>
		)
	}
}
