import React, { Component } from 'react';
import '../global/css/App.css';
import { StyleApp } from './StyleApp';
import TitleBar from './TitleBar';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CardOption from './CardOption';
import Player from '../global/imagenes/player.png';
import Team from '../global/imagenes/team.png';
import Teams from './Teams';
import Players from './Players';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'Home',
    }
  }

  optionSelected = option => {
    this.setState({ selected: option })
  }

  view = () => {
    const { selected } = this.state;
    const option_list = [
      { name: 'Players', image: Player }, 
      { name: 'Teams', image: Team }
    ]
    return (
      <>
        { selected === 'Home' && <CardOption options_list = { option_list } onClick = { option => this.optionSelected(option) } /> }
        { selected === 'Players' && <Players /> }
        { selected === 'Teams' && <Teams /> }
      </>
    );
  }
  
  render() {
    const { selected } = this.state;
    return (
      <ThemeProvider theme = { StyleApp }>
        <div className = "App">
          <header className = "App-header">
            <TitleBar selected = { selected } optionSelected = { option => this.optionSelected(option) } />
          </header>
          { this.view() }
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
