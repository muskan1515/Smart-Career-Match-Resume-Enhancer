import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MessageType = 'success' | 'error' | 'warning' | null

interface GlobalState {
  loading: boolean
  message: string | null
  messageType: MessageType
}

const initialState: GlobalState = {
  loading: false,
  message: null,
  messageType: null
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setMessage: (
      state,
      action: PayloadAction<{ type: MessageType; text: string }>
    ) => {
      state.messageType = action.payload.type
      state.message = action.payload.text
    },
    clearMessage: (state) => {
      state.message = null
      state.messageType = null
    }
  }
})

export const { setLoading, setMessage, clearMessage } = globalSlice.actions
export default globalSlice.reducer
