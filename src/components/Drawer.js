import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import AppBar from "./AppBar";
import styles from "./styles";
import Map from "./Map";
import {ListComponent} from "./List";
import TextField from '@material-ui/core/TextField';
import {Places} from "./places/places";

class ResponsiveDrawer extends React.Component {
  
  state = {
    mobileOpen: false,
    places: Places,
    clickedPlace: ''
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  clickPlace = (marker) =>{
    this.setState({
      clickedPlace: marker
    })
  }

  searching = (event) =>{
    if (event.target.value) {
      let updatePlaces = Places.filter((place, ind) => {
        return place.title.toLowerCase().search(
          event.target.value.toLowerCase()
        ) !== -1;
      });
      this.setState({
        places: updatePlaces,
        clickedPlace: ''
      })
    }
    else{
      this.setState({
        places: Places,
        clickedPlace: ''
      })
    }
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <TextField
            role="search"
            id="standard-name"
            label="Search College"
            className={classes.textField}
            value={this.state.name}
            margin="normal"
            onChange={this.searching}
          />
        <Divider />
        <ListComponent list={this.state.places} onClickPlace={this.clickPlace}/>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar classes={classes} handleDrawerToggle={this.handleDrawerToggle} />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Map 
          places={this.state.places} 
          clickedPlace={this.state.clickedPlace} />
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);