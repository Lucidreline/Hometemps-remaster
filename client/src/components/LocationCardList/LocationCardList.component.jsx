import React from 'react'
import LocationCard from '../LocationCard/LocationCard.component'

// -- Change This!!! --
const locations = ["Outside", "Upstairs", "1", "2"]

const LocationCardList = () => {
    return (
        <div className='location-card-list'>
            {locations.map(location => (
                <LocationCard location={location} />
            ))}
        </div>
    )
}

export default LocationCardList
