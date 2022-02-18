import React, { Component } from 'react';
import { Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { generateFilters, query } from '../global/js/functions';
import Default from '../global/imagenes/default.jpg';

class Players extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      order: '',
      page: 1,
      players: [],
    }
  }

  async getPlayers(filters = []) {
    let f = await generateFilters(filters);
    return new Promise(resolve => {
      query(`api/v1/players?${f}`, null, 'get', (error, estado, resp) => {
        resolve(estado === 200 && !error ? resp.Players : null)
      })
    })
  }

  loadPlayers = async () => {
    const { name, order, page } = this.state;
    const filter = [{ 'key': 'search', 'value': name }, { 'key': 'order', 'value': order }, { 'key': 'page', 'value': page }];
    const players = await this.getPlayers(filter);
    this.setState({ players });
  }

  resetFields = () => {
    this.setState({ name: '', order: '', page: 1 });
  }

  onChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, order, page, players } = this.state;
    return (
      <Grid container spacing = { 3 } style = {{ padding: '40px' }}>
        <Grid item xs = { 4 }>
          <TextField
            value = { name }
            id = 'name'
            name = 'name'
            label = 'Name'
            fullWidth
            onChange = { this.onChange }
          />
        </Grid>
        <Grid item xs = { 3 }>
          <FormControl fullWidth>
            <InputLabel id = "order-label">Order</InputLabel>
            <Select
              labelId = "order-label"
              id = "order"
              name = 'order'
              value = { order }
              label = "Order"
              onChange = { this.onChange }
            >
              <MenuItem value = 'asc'>Ascending</MenuItem>
              <MenuItem value = 'desc'>Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs = { 3 }>
        <Grid item xs = { 4 }>
          <TextField
            value = { page }
            type = "number"
            id = 'page'
            name = 'page'
            label = 'Page'
            fullWidth
            onChange = { this.onChange }
          />
        </Grid>
        </Grid>
        <Grid item xs = { 2 }>
          <Button color = "primary" style = {{ color: "#c79e32" }} onClick = { this.loadPlayers }> Search </Button>
          <Button color = "secondary" style = {{ color: "#c80f43" }} onClick = { this.resetFields }> Clear </Button>
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
                  <TableCell align = "right">Team</TableCell>
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
                      <TableCell align="right">{row.team}</TableCell>
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

export default Players;
