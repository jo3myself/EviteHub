import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import orange from 'material-ui/colors/orange'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import DeviceHub from 'material-ui-icons/DeviceHub'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import ButtonBase from 'material-ui/ButtonBase'

function theme (outerTheme) {
  return createMuiTheme({
    typography: {
      title: {
        color: '#FFF'
      }
    }
  })
}

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
    fill: orange[900]
  },
  brandHover: {
    '&:hover': {
      fill: orange[700]
    }
  },
  root: {
    minHeight: 64,
    width: '100%',
    paddingLeft: 16,
    justifyContent: 'left'
  }

})

function Brand (props) {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <span>
        <Toolbar disableGutters>
          <ButtonBase className={classes.root} component={Link} to='/dashboard'>
            <DeviceHub
              className={classNames(classes.leftIcon, classes.brandHover)}
              style={{
                width: 36,
                height: 36
              }} />
            <Typography type='title'>eviteHub</Typography>
          </ButtonBase>
        </Toolbar>
      </span>
    </MuiThemeProvider>
  )
}

Brand.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(Brand)