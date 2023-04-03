// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    date: '',
    title: '',
    appointmentsList: [],
    appointmentsListStarred: [],
    isStarred: false,
  }

  onSubmitFormData = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      opId: v4(),
      title,
      date,
      isFavorite: false,
    }
    if (title.length > 1 && date.length > 1) {
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  getStarredAppointments = () => {
    this.setState(prevState => ({
      isStarred: !prevState.isStarred,
      appointmentsListStarred: prevState.appointmentsList.filter(eachStar => {
        if (eachStar.isFavorite === true) {
          return eachStar
        }
        return ''
      }),
    }))
  }

  changeDateStatue = event => {
    this.setState({date: event.target.value})
  }

  onChangAppointmentName = event => {
    this.setState({title: event.target.value})
  }

  isFavoriteStatus = opId => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachComment => {
        if (opId === eachComment.opId) {
          return {...eachComment, isFavorite: !eachComment.isFavorite}
        }
        return eachComment
      }),
    }))
  }

  renderNewAppointments = () => {
    const {appointmentsList, isStarred, appointmentsListStarred} = this.state
    return isStarred
      ? appointmentsListStarred.map(eachOp => (
          <AppointmentItem
            key={eachOp.opId}
            AppointmentList={eachOp}
            statusOnChange={this.isFavoriteStatus}
          />
        ))
      : appointmentsList.map(eachOp => (
          <AppointmentItem
            key={eachOp.opId}
            AppointmentList={eachOp}
            statusOnChange={this.isFavoriteStatus}
          />
        ))
  }

  render() {
    const {date, title} = this.state
    return (
      <div className="dc-container">
        <div className="dc-card">
          <div className="dc">
            <form className="my-form" onSubmit={this.onSubmitFormData}>
              <h1 className="head">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="op-name"
                placeholder="Title"
                value={title}
                onChange={this.onChangAppointmentName}
              />
              <label htmlFor="date" className="label" type="date">
                DATE
              </label>
              <input
                type="date"
                className="op-date"
                value={date}
                id="date"
                onChange={this.changeDateStatue}
              />
              <button type="submit" className="btn-add">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="dc-img"
            />
          </div>
          <hr className="separator" />
          <div className="status">
            <h1 className="appo">Appointments</h1>
            <button
              type="button"
              className="starred"
              onClick={this.getStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul>{this.renderNewAppointments()}</ul>
        </div>
      </div>
    )
  }
}
export default Appointments
