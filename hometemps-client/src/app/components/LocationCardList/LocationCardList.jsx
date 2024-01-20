import React from 'react'
import LocationCard from '../LocationCard/LocationCard'

import './LocationCardList.scss'

const getCurrentTimestamp = async () => {
    const res = await fetch('https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod/getxmostrecentitems/1')
    return res.json()
}


const LocationCardList = async () => {
    const timestamp = await getCurrentTimestamp()
    return (
        <div className='location-card-list'>
            <LocationCard location="Upstairs" timestamp={timestamp} />
        </div>
    )
}

export default LocationCardList
