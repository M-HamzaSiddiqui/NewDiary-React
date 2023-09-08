import React, { Component } from 'react'

export class LoadSpinner extends Component {
    render() {
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            </div>
        )
    }
}

export default LoadSpinner