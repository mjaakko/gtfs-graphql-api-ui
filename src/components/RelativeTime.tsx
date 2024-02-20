import React, { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"

const RelativeTime = (props: { timestamp: Dayjs }) => {
    const [currentTime, setCurrentTime] = useState(dayjs())
    useEffect(() => {
        const intervalId = setInterval(() => setCurrentTime(dayjs()), 5000)

        return () => clearInterval(intervalId)
    }, [])
    useEffect(() => setCurrentTime(dayjs), [props.timestamp])

    //If given timestamp is in the future, show current time
    return props.timestamp.isAfter(currentTime) ?
        currentTime.to(currentTime) :
        currentTime.to(props.timestamp)
}

export default RelativeTime