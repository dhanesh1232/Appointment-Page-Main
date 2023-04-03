// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {AppointmentList, statusOnChange} = props
  const {opId, title, date, isFavorite} = AppointmentList
  const imgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const changeFavoriteStatus = () => {
    statusOnChange(opId)
  }
  const dateOb = format(new Date(date), 'dd MMMM yyyy')
  const dateC = format(new Date(), 'EEEE')
  // console.log(dateC)
  return (
    <li className="list-value">
      <div className="header">
        <p className="title">{title}</p>
        <button type="button" onClick={changeFavoriteStatus} data-testid="star">
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="op-time">
        Date: {dateOb}, {dateC}
      </p>
    </li>
  )
}
export default AppointmentItem
