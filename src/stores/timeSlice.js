const HOUR_IN_SECONDS = 60 * 60;
const MINUTE_IN_SECONDS = 60;

export const createTimeSlice = (set) => ({
    time: { hours: 0, minutes: 0, seconds: 0 },
    limit: { hours: 0, minutes: 0, seconds: 0 },
    setTime: (time) =>
        set({
            time: {
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds,
            },
        }),
    resetTime: () => set({ time: { hours: 0, minutes: 0, seconds: 0 } }),
    decreaseTime: () => set(decreaseTime),
    setTimeLimit: (time) =>
        set({
            limit: {
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds,
            },
        }),
});

const decreaseTime = (state) => {
    // convert the time into seconds
    const { hours, minutes, seconds } = state.time;
    let currentTime =
        seconds + MINUTE_IN_SECONDS * minutes + HOUR_IN_SECONDS * hours;

    // subtract to indicate one second has passed
    currentTime -= 1;

    const newTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
    };
    newTime.hours = Math.floor(currentTime / HOUR_IN_SECONDS);
    newTime.minutes = Math.floor(
        (currentTime - newTime.hours * HOUR_IN_SECONDS) / MINUTE_IN_SECONDS
    );
    newTime.seconds = Math.floor(
        currentTime -
            (newTime.hours * HOUR_IN_SECONDS +
                newTime.minutes * MINUTE_IN_SECONDS)
    );
    return { time: newTime };
};
