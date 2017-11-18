import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3
  })
})

function PaperSheet (props) {
  const { classes } = props
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type='headline' component='h3'>
          Dashboard
        </Typography>
        <Typography type='body1' component='p'>
          Welcome back, John Doe!
        </Typography>
      </Paper>
    </div>
  )
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PaperSheet)
