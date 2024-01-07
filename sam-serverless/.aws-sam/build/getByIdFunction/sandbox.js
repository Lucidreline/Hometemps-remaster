const dateToFormattedString = (dateObj) => {
    return `${("0" + dateObj.getMonth() + 1).slice(-2)}/${("0" + dateObj.getDate()).slice(-2)}/${dateObj.getFullYear()} ${("0" + dateObj.getHours()).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}`
}

const getXMostRecentTimestamps = (timestampQuantity) => {
    // GetBatchItem can only return 25 items at a time, for now I will cap it.
    if (timestampQuantity > 25) timestampQuantity = 25

    // get the current time
    let timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - 8) // time zone change

    // get the current hour at the 0 minute
    let currentHour = new Date(timestamp.setMinutes(0))


    // get resulting list of formatted string timestamps
    const results = []
    for (let i = 0; i < timestampQuantity; i++) {
        currentHour.setHours(currentHour.getHours() - 1)
        results.push(dateToFormattedString(currentHour))
    }

    return results.reverse()
}

const formatTimestampsForQuery = (timestamps) => {
    const results = []
    timestamps.forEach(timestamp => {
        results.push({ timestamp: { S: timestamp } })
    })
    return results
}

const x = getXMostRecentTimestamps(3)
console.log(x)
console.log(formatTimestampsForQuery(x))