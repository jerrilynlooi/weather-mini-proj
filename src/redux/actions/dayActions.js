import * as types from "../types"

export const openDayDetail = (payload) => ({
  type: types.OPEN_DAY_DETAIL,
  payload
})

export const closeDayDetail = () => ({
  type: types.CLOSE_DAY_DETAIL
})
