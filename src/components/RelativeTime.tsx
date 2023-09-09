import React, { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"

const RelativeTime = (props: { timestamp: Dayjs }) => {
    const [currentTime, setCurrentTime] = useState(dayjs())
    useEffect(() => {
        const intervalId = setInterval(() => setCurrentTime(dayjs()), 5000)

        return () => clearInterval(intervalId)
    }, [])

    return props.timestamp.to(currentTime)
}

export default RelativeTime