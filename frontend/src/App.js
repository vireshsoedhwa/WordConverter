import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


import UploadFile from './uploader.jsx';
import DocumentPreview from './DocumentPreview.jsx';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { MDBContainer, MDBIframe } from "mdbreact";



import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loaded: false,
            showpreview: false,
            previewindex: "",
            showinstructions: false
        };

        this.GetLatestData = this.GetLatestData.bind(this);
        this.showpreview = this.showpreview.bind(this);
        this.hidepreview = this.hidepreview.bind(this);

        this.showinstructions = this.showinstructions.bind(this);
        this.hideinstructions = this.hideinstructions.bind(this);
    }


    componentDidMount() {
        this.GetLatestData();
    }

    GetLatestData() {
        fetch("/api/conversion")
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


    showpreview(id) {
        this.setState({
            showpreview: true,
            previewindex: id
        })
    }

    hidepreview() {
        this.setState({
            showpreview: false,
            previewindex: ""
        })
    }

    showinstructions() {
        this.setState({
            showinstructions: true
        })
    }

    hideinstructions() {
        this.setState({
            showinstructions: false
        })
    }

    render() {

        let DocumentPreviewComponents

        const elements = this.state.data;
        if (this.state.loaded) {
            DocumentPreviewComponents = elements.map(item =>
                <React.Fragment key={item.id}>
                    {/* {item.id} - {item.name} - input: {item.inputfile} - converted: {item.convertedfile} */}
                    <Grid item >
                        <DocumentPreview index={item.id} time={item.created_at} name={item.name}
                            showpreview={this.showpreview} 
                            GetLatestData={this.GetLatestData}
                            />
                    </Grid>
                </React.Fragment>
            )
        }

        return (
            <div>

                {/*  ================================================  PREVIEW DIALOG */}
                <Dialog aria-labelledby="simple-dialog-title" open={this.state.showpreview} fullScreen>
                    <DialogTitle id="simple-dialog-title">

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={this.hidepreview}
                        >
                            Close Preview
                        </Button>
                        <Link
                            href={"/code/DATA/converted/" + this.state.previewindex + "/html"}
                            color="primary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                            >
                                Download
                            </Button>
                        </Link>

                    </DialogTitle>
                    <DialogContent dividers>

                        <MDBContainer>
                            <MDBIframe src={"/api/media?doc=" + this.state.previewindex}
                                style={{ height: "1200px" }}

                            />
                        </MDBContainer>
                    </DialogContent>
                </Dialog>


                {/*  ================================================  Instructions DIALOG */}


                <Dialog aria-labelledby="simple-dialog-title" open={this.state.showinstructions} fullScreen>
                    <DialogTitle id="simple-dialog-title">

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={this.hideinstructions}
                        >
                            Close
                        </Button>

                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Instructions
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Uploading
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            In order to have a succesful conversion please consider uploading Word(.docx) files only. 
                            Select the file and choose your preferred CSS settings below. After conversion is done your file should be ready for preview.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            Previewing
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            After successful conversion your file will be visible for previewing. Click on the "Show Preview" button to
                            preview the file or click on the arrow to download the file. The preview mode will also allow you to download the file
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            Downloading
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            After clicking the Download button you should receive a zipped folder with the html files and all images included
                        </Typography>

                    </DialogContent>
                </Dialog>



                {/*  ================================================  uploadfile grid */}



                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={3}
                >
                    <Grid item >
                        <UploadFile GetLatestData={this.GetLatestData} showinstructions={this.showinstructions} />
                    </Grid>

                    {/*  ================================================  Document card components */}

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                        spacing={2}
                    >
                        {DocumentPreviewComponents}
                    </Grid>
                </Grid>
            </div>
        )
    }
}


