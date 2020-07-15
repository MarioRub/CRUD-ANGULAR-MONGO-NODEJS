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
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const baseUrl = "http://localhost:3001/";

const onClickDelete = (id) => {

  axios.delete(`${baseUrl}${id}`)
    .then(res => {
      alert("Delete Sucessfull!");
    });

}

const PostTask = (newTask) => (

  axios.post(baseUrl, newTask)
    .then(response => {
      alert("Task Created Sucessfully!")
    })
    .catch(error => {
      alert("Error :(")
    })
)

const UpdateTask = (newTask, _id) => (

  axios.put(`${baseUrl}${_id}`, {
      descripcion: newTask.descripcion
    })
    .then(response => {
      alert("Update Succesfull!")
    })
    .catch(error => {
      alert("Error :(")
    })
)

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      toEdit: [],
      descripcion: null,
    };
    this.updateInputdescripcion = this.updateInputdescripcion.bind(this);
    
  };

  componentWillMount() {
    fetch(baseUrl)
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    });
  }
  componentDidUpdate(prevProps, prevState) {

    if (prevState.descripcion !== this.state.descripcion) {
      fetch(baseUrl)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
    }
  }

  onClickEdit(item) {
    this.setState({ descripcion: item.descripcion, toEdit: item });
  }

  render() {

    const newTask = { descripcion: this.state.descripcion };
    var { isLoaded, items, toEdit } = this.state;

    if (!isLoaded) {
      return <div><CircularProgress size={80} /></div>
    } else {
      return (
        <div className="App">
          <form noValidate autoComplete="off" style={{ margin: 8 }} fullWidth>
            <TextField
              id="standard-full-width"
              label="Add a new Task"
              style={{ margin: 8 }}
              placeholder="Task"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={ this.state.descripcion }
              onChange={ this.updateInputdescripcion }
            />
            <Button style = { {margin:8 }}variant="outlined" color="primary" onClick={() => PostTask(newTask)}>
              Save
            </Button>
            <Button variant="outlined" color="primary" onClick={() => UpdateTask(newTask, toEdit._id)}>
              Update
            </Button>
          </form>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Task Descriptions</TableCell>
                  <TableCell align="right">Task Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={ item.descripcion }>
                    <TableCell component="th" scope="row">
                      { item.descripcion }
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="Delete" onClick={() => onClickDelete(item._id)} >
                        < DeleteIcon/>
                      </IconButton>
                      <IconButton aria-label="Update" onClick={() => this.onClickEdit(item)} >
                        <EditIcon/>
                      </IconButton>
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
  updateInputdescripcion(event) {

    this.setState({ descripcion: event.target.value })
  }

}

export default Form;