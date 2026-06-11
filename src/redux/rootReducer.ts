import { combineReducers } from 'redux'
import bookingReducer from './booking/reducer'
import hotelReducer from './hotel/reducer'

const rootReducer = combineReducers({
  hotel: hotelReducer,
  booking: bookingReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
