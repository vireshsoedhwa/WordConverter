import React, { Component } from 'react';

import axios from 'axios';

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
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        // Request made to the backend api 
        // Send formData object 
        axios.post("api/upload", formData);
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
        fetch("api/conversion")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
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
                    {item.name} - input: {item.inputfile} - converted: {item.convertedfile}
                </li>
            )
        }

        return (
            <div>
                <h1>{this.state.placeholder}</h1>
                <ul>
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
                {this.fileData()}

            </div>
        )
    }
}

