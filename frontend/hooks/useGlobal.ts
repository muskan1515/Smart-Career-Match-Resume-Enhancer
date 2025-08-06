import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/index'
import {
  setLoading,
  setMessage,
  clearMessage
} from '../store/slices/globalSlice'

export const useGlobal = () => {
  const dispatch = useDispatch()
  const global = useSelector((state: RootState) => state.global)

  return {
    loading: global.loading,
    message: global.message,
    messageType: global.messageType,
    setLoading: (isLoading: boolean) => dispatch(setLoading(isLoading)),
    setMessage: (type: 'success' | 'error' | 'warning', text: string) =>
      dispatch(setMessage({ type, text })),
    clearMessage: () => dispatch(clearMessage())
  }
}
