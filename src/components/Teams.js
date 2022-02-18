import React, { Component } from 'react';
import { Avatar, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { query } from '../global/js/functions';
import Default from '../global/imagenes/default.jpg';

class Teams extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      players: [],
    }
  }

  async getPlayers() {
    const { Name } = this.state;
    return new Promise(resolve => {
      query(`api/v1/team`, { Name }, 'post', (error, estado, resp) => {
        resolve(estado === 200 && !error ? resp.Players : null)
      })
    })
  }

  loadPlayers = async () => {
    const players = await this.getPlayers();
    this.setState({ players });
  }

  onChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { Name, players } = this.state;
    return (
      <Grid container spacing = { 3 } style = {{ padding: '40px' }}>
        <Grid item xs = { 6 }>
          <TextField
            value = { Name }
            id = 'Name'
            name = 'Name'
            label = 'Name'
            fullWidth
            onChange = { this.onChange }
          />
        </Grid>
        <Grid item xs = { 6 }>
          <Button color = "primary" style = {{ color: "#c79e32" }} onClick = { this.loadPlayers }> Search </Button>
        </Grid>
        <Grid item xs = { 12 }>
          <TableContainer component = { Paper }>
            <Table sx = {{ minWidth: 650 }} aria-label = "simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align = "right">Position</TableCell>
                  <TableCell align = "right">Nation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  players && players.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right"><Avatar alt = { row.name } src = { Default } /></TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.position}</TableCell>
                      <TableCell align="right">{row.nation}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

export default Teams;
