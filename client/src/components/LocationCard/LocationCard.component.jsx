import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'

import './LocationCard.styles.scss'




const LocationCard = ({ location }) => {

    let [tempRequest, setTempRequest] = useState({
        items: [
            {
                temperature: -1,
                humidity: -1

            }
        ]
    })

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod/getxmostrecentitems/0.5/${location}`)

            setTempRequest(await response.json())

        }
        fetchData()

    }, [location]);

    console.log(tempRequest)


    const { temperature, humidity } = tempRequest.items[0]
    return (
        <div className="location-card">
            <h3 className='card-title'>{location}</h3>
            <div className="card-body">
                <div className="temperature-section">
                    <FontAwesomeIcon className='awesome-icon' icon={faTemperatureThreeQuarters} />
                    <h4 className="temperature-display">{tempRequest = !undefined ? temperature : 0} &deg;F</h4>
                </div>
                <div className="humidity-section">
                    <FontAwesomeIcon className='awesome-icon' icon={faDroplet} />
                    <h4 className="humidity-display">{tempRequest = !undefined ? humidity : 0} %</h4>
                </div>
            </div>
        </div>
    )
}

export default LocationCard
