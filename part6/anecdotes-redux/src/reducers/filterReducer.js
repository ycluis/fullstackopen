export const applyFilter = (data) => {
  return {
    type: 'FILTER',
    payload: data,
  }
}

const reducer = (state = '', action) => {
  if (action.type === 'FILTER') {
    return action.payload
  }
  return state
}

export default reducer
