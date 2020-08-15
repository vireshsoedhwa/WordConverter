import React, { Component } from 'react';

import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import BasicTextFields from './uploader.jsx';

import Box from '@material-ui/core/Box';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholder: "",
            data: null,
            loaded: false,
            selectedFile: null
        };
    }

    // On file select (from the pop up) 
    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button) 
    onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "file",
            this.state.selectedFile
            // this.state.selectedFile.name
        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        // Request made to the backend api 
        // Send formData object 
        // axios.put("api/upload", formData);
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value

        // axios.defaults.xsrfCookieName = 'csrftoken'
        // axios.defaults.xsrfHeaderName = 'X-CSRFToken'

        axios.post("http://localhost:8000/api/upload", formData, {
            headers: {
                'X-CSRF-TOKEN': csrftoken
            }
        })



    };

    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };




    componentDidMount() {

        // console.log("token1 = " + document.querySelector('[name=csrfmiddlewaretoken]').value)
        // console.log("token2 = " + getCookie('csrftoken'))

        fetch("http://localhost:8000/api/conversion")
            .then(response => {
                if (response.status > 400) {
                    // return this.setState(() => {
                    //     return { placeholder: "Something went wrong!" };
                    // });
                }
                return response.json();
            })
            .then(data => {
                // this.setState(() => {
                //     return {
                //         data,
                //         loaded: true
                //     };
                // });

                this.setState({
                    data: data,
                    loaded: true
                })
            });
    }

    render() {

        let elementComponents
        const elements = this.state.data;
        if (this.state.loaded) {
            elementComponents = elements.map(item =>
                <li key={item.id}>
                    {item.id} - {item.name} - input: {item.inputfile} - converted: {item.convertedfile}
                </li>
            )
        }

        return (
            <div>
                {/* <ul>
                    {elementComponents}
                </ul>

                <h1>
                    upload here
                </h1>

                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                {this.fileData()} */}



                {/* <React.Fragment>
                    <CssBaseline />
                    <Container >
                        <Typography component="div" style={{ backgroundColor: '#FFFFFF', height: '100vh' }} />
                    </Container>
                </React.Fragment> */}

                {/* <BasicTextFields/> */}


                <Box color="text.primary" clone>
                    <div>hshhs</div>
                </Box>
            </div>
        )
    }
}



