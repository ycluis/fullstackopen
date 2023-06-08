import { useSelector, useDispatch } from 'react-redux'
import { applyFilter } from '../reducers/filterReducer'

const Filter = () => {
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10,
  }

  const handleChange = (e) => {
    dispatch(applyFilter(e.target.value))
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  )
}

export default Filter
