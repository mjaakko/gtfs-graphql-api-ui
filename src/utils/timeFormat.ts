import dayjs from "dayjs"

function formatTime(timeStr: string, timezone: string): string {
    return dayjs(timeStr).tz(timezone).format("LT")
}

function formatDateTime(timeStr: string, timezone: string): string {
    return dayjs(timeStr).tz(timezone).format("L LT")
}

export { formatTime, formatDateTime }