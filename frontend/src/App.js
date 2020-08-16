import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import UploadFile from './uploader.jsx';
import DocumentPreview from './DocumentPreview.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loaded: false
        };

        this.GetLatestData = this.GetLatestData.bind(this);
    }


    componentDidMount() {
       this.GetLatestData();
    }

    GetLatestData(){
        fetch("http://localhost:8000/api/conversion")
        .then(response => {
            if (response.status > 400) {

            }
            return response.json();
        })
        .then(data => {
            this.setState({
                data: data,
                loaded: true
            })
        });
    }

    render() {

        let DocumentPreviewComponents

        const elements = this.state.data;
        if (this.state.loaded) {
            DocumentPreviewComponents = elements.map(item =>
                <React.Fragment key={item.id}>
                    {/* {item.id} - {item.name} - input: {item.inputfile} - converted: {item.convertedfile} */}
                    <Grid item >
                        <DocumentPreview index={item.id} time={item.created_at} name={item.name}/>
                    </Grid>
                </React.Fragment>
            )
        }

        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={3}
                >
                    <Grid item >
                        <UploadFile GetLatestData={this.GetLatestData} />
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                        spacing={2}
                    >

                        {DocumentPreviewComponents}

                        {/* <DocumentPreview />
                        <DocumentPreview />
                        <DocumentPreview />
                        <DocumentPreview />    */}
                    </Grid>
                </Grid>
            </div>
        )
    }
}



