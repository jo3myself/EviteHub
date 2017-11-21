import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import orange from 'material-ui/colors/orange'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import UserAvatar from './UserAvatar'
import Brand from './Brand'
import EventsDropdown from './EventsDropdown'
import { DashboardListItems, GuestListItems, SendInvitesListItems } from './drawerItems'

const drawerWidth = 250

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: teal[500]
      }
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: 'none'
      }
    },
    MuiTypography: {
      subheading: {
        color: 'white'
      },
      colorSecondary: {
        fontWeight: 500,
        color: orange[300]
      }
    },
    MuiListItemIcon: {
      root: {
        color: teal[900]
      }
    }
  }
})

const styles = theme => ({
  bigAvatar: {
    width: 60,
    height: 60,
    margin: '5px auto'
  },
  drawerHeader: {
    height: 64,
    backgroundColor: teal[800]
  },
  drawerAvatar: {
    height: '215px',
    textAlign: 'center',
    paddingTop: '20px'
  },
  flex: {
    flex: '0 1 100%'
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      height: '100%'
    }
  },
  icon: {
    margin: theme.spacing.unit
  }
})

class SideBar extends Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render () {
    const { classes } = this.props

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Brand />
        </div>
        <UserAvatar />
        <Divider />
        <EventsDropdown />
        <Divider />
        <List><DashboardListItems /></List>
        <List><GuestListItems /></List>
        <List><SendInvitesListItems /></List>
      </div>
    )

    return (
      <MuiThemeProvider theme={theme}>
        <Hidden mdUp>
          <Drawer
            type='temporary'
            anchor='left'
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onRequestClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
              >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation='css'>
          <Drawer
            type='permanent'
            open
            classes={{
              paper: classes.drawerPaper
            }}
              >
            {drawer}
          </Drawer>
        </Hidden>
      </MuiThemeProvider>
    )
  }
}
SideBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, theme)(SideBar)
