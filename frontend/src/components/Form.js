
import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const baseUrl = "http://localhost:3001/";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,  
          items: [],
        };
    
      }
      componentWillMount(){

        fetch(baseUrl)
      
        .then(res => res.json())
        .then(json => {
          console.log("Fetch Realizado")
          this.setState({
            isLoaded:true,
            items: json,
          })
        }); 
      }

    render() {
        var  {isLoaded,items} = this.state;
        if(!isLoaded){
            return<div><CircularProgress size={80} /></div>
          }else{
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
                    />
                    <Button variant="outlined" color="primary">
                        Guardar
                    </Button>
                </form>
                <div className="row">
            {items.map(item=>(    
                    <div>
                    {item.descripcion}
                    </div>
                          ))}                
                </div>

            </div>
        )
    }

  }

}

export default Form;