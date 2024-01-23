import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'

import './LocationCard.scss'



const LocationCard = async ({ location }) => {
    const getItems = async (location) => {
        const res = await fetch(`https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod/getxmostrecentitems/0.5/${location}`)
        return res.json()
    }

    const item = await getItems(location)
    const { temperature, humidity } = item.items[0]
    return (
        <div className="location-card">
            <h3 className='card-title'>{location}</h3>
            <div className="card-body">
                <div className="temperature-section">
                    <FontAwesomeIcon className='awesome-icon' icon={faTemperatureThreeQuarters} />
                    <h4 className="temperature-display">{temperature.toFixed(1)}&deg;F</h4>
                </div>
                <div className="humidity-section">
                    <FontAwesomeIcon className='awesome-icon' icon={faDroplet} />
                    <h4 className="humidity-display">{humidity} %</h4>
                </div>
            </div>
        </div>
    )
}

export default LocationCard
