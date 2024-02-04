import React from 'react'
import './LocationCardList.styles.scss'
import LocationCard from '../LocationCard/LocationCard.component'

// -- Change This!!! --
const locations = ["Outside", "Upstairs"]

const LocationCardList = () => {
    return (
        <div className='location-card-list'>
            {locations.map(location => (
                <LocationCard location={location} key={location} />
            ))}
        </div>
    )
}

export default LocationCardList
