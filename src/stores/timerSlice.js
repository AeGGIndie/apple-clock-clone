export const createTimerSlice = (set) => ({
    timer: undefined,
    startTimer: (callback, interval) =>
        set({ timer: setInterval(callback, interval) }),
    stopTimer: () => set((state) => ({ timer: clearInterval(state.timer) })),
});
