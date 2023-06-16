import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number,
  name: string,
  token: string
}

const initialState: CounterState = {
  value: 0,
  name: '',
  token: ''
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    name: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    increment: (state) => {
      state.value += 1
    },
    reset: (state) => {
      state.value = 0
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, reset, name, setToken } = counterSlice.actions

export default counterSlice.reducer