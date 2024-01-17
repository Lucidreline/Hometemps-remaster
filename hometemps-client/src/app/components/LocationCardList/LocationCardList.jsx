import React from 'react'
import LocationCard from '../LocationCard/LocationCard'

import './LocationCardList.scss'

const LocationCardList = () => {
    return (
        <div className='location-card-list'>
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
        </div>
    )
}

export default LocationCardList
