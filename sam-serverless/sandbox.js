const getXMostRecentTimestamps = (timestampQuantity) => {
    // GetBatchItem can only return 25 items at a time, for now I will cap it.
    if (timestampQuantity > 25) timestampQuantity = 25


    const timezoneOffset = -8
    let timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - timezoneOffset)

    const formatedTimestamp = `${("0" + timestamp.getMonth() + 1).slice(-2)}/${("0" + timestamp.getDate()).slice(-2)}/${timestamp.getFullYear()} ${("0" + timestamp.getHours()).slice(-2)}:${("0" + timestamp.getMinutes()).slice(-2)}`
    console.log(formatedTimestamp)
}

getXMostRecentTimestamps()