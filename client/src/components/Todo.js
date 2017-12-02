import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
import PhoneIcon from 'material-ui-icons/Phone'
import FavoriteIcon from 'material-ui-icons/Favorite'
import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

function TabContainer ({ children, dir }) {
  return (
    <div dir={dir} style={{ paddingBottom: 8 * 3 }}>
      {children}
    </div>
  )
}

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper
  }
})

class CheckboxList extends React.Component {
  state = {
    // checked: [],
    modal: false,
    todoItems: ['Get Plates', 'Reserver Location', 'Assign Tables', 'Check GuestList'],
    completedItems: ['Hire Party Planner', 'Check RSPV List', 'Hire Catering Co.'],
    value: 0,
    addTodo: '',
    snack: false
  }

  // Open Modal
  openModal = () => {
    this.setState({ modal: true })
  }

  // Close Modal
  closeModal = () => {
    this.setState({ modal: false })
  }

  handleToggle = value => () => {
    const { todoItems, completedItems } = this.state

    const onCompleted = completedItems.indexOf(value)
    const onTodo = todoItems.indexOf(value)

    const newItems = [...completedItems]
    const currentItems = [...todoItems]

    if (onCompleted === -1) {
      newItems.push(value)
      currentItems.splice(onTodo, 1)
      this.openSnack()
    } else if (onTodo === -1) {
      currentItems.push(value)
      newItems.splice(onCompleted, 1)
      this.openSnack()
    }

    this.setState({
      todoItems: currentItems,
      completedItems: newItems
    })
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  // Opens Snackbar
  handleSaveTodo = event => {
    event.preventDefault()
    const addTodo = this.state.addTodo

    this.state.todoItems.push(addTodo)
    this.closeModal()
  }

  // Opens Snackbar
  openSnack = () => {
    this.setState({ snack: true })
  }

  // Closes Snackbar
  closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ snack: false })
  }

  render () {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position='static' color='default' style={{boxShadow: 'none'}}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor='primary'
            textColor='accent'
          >
            <Tab icon={<PhoneIcon color='primary' />} label='To Do' />
            <Tab icon={<FavoriteIcon color='primary' />} label='Completed' />
          </Tabs>
        </AppBar>

        { value === 0 &&
          <TabContainer dir=''>
            <List dense disablePadding>
              {this.state.todoItems.map(value => (
                <ListItem
                  key={value}
                  dense
                  button
                  onClick={this.handleToggle(value)}
                  className={classes.listItem}
                  disableGutters
                  divider
                  style={{padding: 0}}
                >
                  <Checkbox
                    checked={this.state.completedItems.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }
        { value === 1 &&
          <TabContainer dir=''>
            <List dense disablePadding>
              {this.state.completedItems.map(value => (
                <ListItem
                  key={value}
                  dense
                  button
                  onClick={this.handleToggle(value)}
                  className={classes.listItem}
                  disableGutters
                  divider
                  style={{padding: 0}}
                >
                  <Checkbox
                    checked={this.state.completedItems.indexOf(value) >= 0}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        }

        <Button onClick={this.openModal} color='primary' raised>Add Todo</Button>

        <Dialog open={this.state.modal} onRequestClose={this.closeModal}>
          <DialogTitle>Add To Do</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='addTodo'
              name='addTodo'
              label='To Do Item'
              type='text'
              fullWidth
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color='primary'>Cancel</Button>
            <Button onClick={this.handleSaveTodo} color='primary'>Save</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.snack}
          autoHideDuration={3000}
          onRequestClose={this.closeSnack}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Saved</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={this.closeSnack}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

      </div>
    )
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

export default withStyles(styles)(CheckboxList)
