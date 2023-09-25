import dayjs from "dayjs"

function formatTime(timeStr: string, timezone: string): string {
    return dayjs(timeStr).tz(timezone).format("LT")
}

export { formatTime }