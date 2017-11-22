import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import moment from 'moment'
// import { DateTimePicker } from 'material-ui-pickers'
import { TimePicker, DatePicker } from 'material-ui-pickers'
import Button from 'material-ui/Button'
import API from '../utils/Api'
import classNames from 'classnames'
import orange from 'material-ui/colors/orange'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from 'material-ui/Dialog'
import PagesIcon from 'material-ui-icons/Pages'

const styles = theme => ({
  paper: {
    padding: '10px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  dayWrapper: {
    position: 'relative'
  },
  day: {
    width: 36,
    height: 36,
    fontSize: 14,
    margin: '0 2px',
    color: theme.palette.text.primary
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: '2px solid #6270bf',
    borderRadius: '50%'
  },
  nonCurrentMonthDay: {
    color: '#BCBCBC'
  },
  highlightNonCurrentMonthDay: {
    color: '#676767'
  },
  highlight: {
    background: '#9fa8da'
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  },
  dateCenter: {
    margin: '0 auto'
  },
  button: {
    margin: theme.spacing.unit
  },
  raisedAccent: {
    backgroundColor: orange[700]
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  spaceBottom: {
    marginBottom: theme.spacing.unit
  }
})

class addEvent extends React.Component {
  state = {
    name: '',
    location: '',
    description: '',
    selectedDate: moment(),
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true })
  };

  handleRequestClose = () => {
    this.setState({ open: false })
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSubmit = () => {
    var eventData = {
      eventName: this.state.name,
      description: this.state.description,
      location: this.state.location,
      date: this.state.selectedDate
    }
    this.setState({
      name: '',
      location: '',
      description: ''
    })
    console.log(eventData)
    API.saveEvent(eventData)
    this.setState({ open: false })
  }

  renderCustomDayForDateTime = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
    const { classes } = this.props

    const dayClassName = [
      (date.isSame(selectedDate, 'day')) && classes.customDayHighlight
    ].join(' ')

    return (
      <div className={classes.dayWrapper}>
        {dayComponent}
        <div className={dayClassName} />
      </div>
    )
  }

  render () {
    const { selectedDate } = this.state
    const { classes } = this.props
    return (

      <span>
        <Button onClick={this.handleClickOpen} className={classNames(classes.button, classes.raisedAccent)} raised color='accent'>
          <PagesIcon className={classes.leftIcon} />
          New Event
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>New Event</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.spaceBottom}>
             Start a memorable event!
           </DialogContentText>
            <div>
              <form noValidate autoComplete='off'>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='name'
                      label='Name'
                      value={this.state.name}
                      onChange={this.handleChange('name')}
                      fullWidth
                      margin='dense'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='location'
                      label='Location'
                      value={this.state.location}
                      onChange={this.handleChange('location')}
                      fullWidth
                      margin='dense'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label='Date'
                      value={selectedDate}
                      onChange={this.handleDateChange}
                      animateYearScrolling={false}
                      leftArrowIcon='<'
                      rightArrowIcon='>'
                      fullWidth
                      margin='dense'
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TimePicker
                      label='Time'
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                      fullWidth
                      margin='dense'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id='full-width'
                      label='Event Description'
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={this.state.description}
                      multiline
                      character='10'
                      onChange={this.handleChange('description')}
                      placeholder="What's the event about?"
                      fullWidth
                      margin='dense'
                    />
                  </Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color='primary'>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </span>

    )
  }
}

addEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(addEvent)