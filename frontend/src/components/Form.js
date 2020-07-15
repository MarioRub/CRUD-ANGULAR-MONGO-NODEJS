
import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';


const baseUrl = "http://localhost:3001/";

const onClickDelete =(id) => {

  axios.delete(`${baseUrl}${id}`)
  .then(res => {
  alert("Borrada con Exito");
  console.log(id);
  });
 
    
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
    };

  }
  componentWillMount() {

    fetch(baseUrl)

      .then(res => res.json())
      .then(json => {
        console.log("Fetch Realizado")
        this.setState({
          isLoaded: true,
          items: json,
          toEdit: json,
        })
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.items !== this.state.items){
    fetch(baseUrl)
    .then(res => res.json())
    .then(json => {
      console.log("Fetch Realizado")
      this.setState({
        isLoaded: true,
        items: json,
        toEdit: json,
      })
    });
  }
  }

  onClickEdit(e, item) {
    // set state es la función mágica de react que te permite cambiar valores de forma reactiva
    this.setState({ toEdit: item });
  }

  render() {
    var { isLoaded, items, toEdit } = this.state;
    if (!isLoaded) {
      return <div><CircularProgress size={80} /></div>
    } else {
      return (
        <div  >
          <form noValidate autoComplete="off" style={{ margin: 8 }} fullWidth>

            <TextField
              id="standard-full-width"
              label="Add a new Task"
              style={{ margin: 8 }}
              placeholder="Task"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.toEdit.descripcion}
            />

            <Button variant="outlined" color="primary">
              Guardar
                    </Button>
          </form>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>task</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.descripcion}>
                    <TableCell component="th" scope="row">
                      {item.descripcion}
                    </TableCell>
                    <TableCell align="right">
                      <FormControlLabel control={<Checkbox color="secondary" name="Finished" value="yes" />} />
                      <a onClick={(e) => onClickDelete(item._id)} ><DeleteIcon /></a>
                      <a onClick={(e) => this.onClickEdit(e, item)} ><EditIcon /></a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      )
    }

  }

}

export default Form;