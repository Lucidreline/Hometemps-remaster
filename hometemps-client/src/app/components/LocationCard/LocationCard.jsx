import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'

import './LocationCard.scss'


const LocationCard = () => {
    return (
        <div className="location-card">
            <h3 className='card-title'>Location</h3>
            <div className="card-body">
                <div className="temperature-section">
                    <FontAwesomeIcon className='awesome-icon' icon={faTemperatureThreeQuarters} />
                    <h4 className="temperature-display">67&deg;F</h4>
                </div>
                <div className="humidity-section">
                    <FontAwesomeIcon className='awesome-icon' icon={faDroplet} />
                    <h4 className="humidity-display">45%</h4>
                </div>
            </div>
        </div>
    )
}

export default LocationCard