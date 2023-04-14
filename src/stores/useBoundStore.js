import { create } from "zustand";
import { createTimerSlice } from "./timerSlice";
import { createTimeSlice } from "./timeSlice";

export const useBoundStore = create((...a) => ({
    ...createTimerSlice(...a),
    ...createTimeSlice(...a),
}));
