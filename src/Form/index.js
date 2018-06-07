import React, { Component } from 'react'

export default class Form extends Component {
    render(props) {
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-md-2 col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            value={this.props.nameInput}
                            onChange={this.props.nameChanged}
                        />
                    </div>
                    <div className="col-md-2 col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="City"
                            value={this.props.cityInput}
                            onChange={this.props.cityChanged}
                        />
                    </div>
                    <div className="col-md-2 col-sm-6">
                        <input
                            className="form-control"
                            type="date"
                            placeholder="Date"
                            value={this.props.dateInput}
                            onChange={this.props.dateChanged}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
