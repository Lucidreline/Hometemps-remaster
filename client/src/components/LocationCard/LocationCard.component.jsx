import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'

import './LocationCard.styles.scss'




const LocationCard = ({ location }) => {

    // const getItems = async (location) => {
    //     const res = await fetch(`https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod/getxmostrecentitems/0.5/${location}`)
    //     return res.json()
    // }

    const [tempRequest, setTempRequest] = useState()

    useEffect(() => {

        const fetchData = async () => {


            console.log("test for:" + location)
            const response = await fetch(`https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod/getxmostrecentitems/${location}`)

            setTempRequest(response)

        }


        fetchData()

    }, []);



    return (
        <div className="location-card">
            <h3 className='card-title'>{location}</h3>
            <div className="card-body">
                <div className="temperature-section">
                    <FontAwesomeIcon className='awesome-icon' icon={faTemperatureThreeQuarters} />
                    <h4 className="temperature-display">69&deg;F</h4>
                </div>
                <div className="humidity-section">
                    <FontAwesomeIcon className='awesome-icon' icon={faDroplet} />
                    <h4 className="humidity-display">70 %</h4>
                </div>
            </div>
        </div>
    )
}

export default LocationCard
