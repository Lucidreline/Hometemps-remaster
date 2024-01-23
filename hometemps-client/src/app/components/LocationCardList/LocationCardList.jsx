import React from 'react'
import LocationCard from '../LocationCard/LocationCard'

import './LocationCardList.scss'


const LocationCardList = async () => {
    return (
        <div className='location-card-list'>
            <LocationCard location="Outside" />
            <LocationCard location="Upstairs" />
        </div>
    )
}

export default LocationCardList
