import { combineReducers } from 'redux'
import hotelReducer from './hotel/reducer'

const rootReducer = combineReducers({
  hotel: hotelReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
