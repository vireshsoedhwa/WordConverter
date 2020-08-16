import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function UploadFile(props) {

    const [UploadFile, SetUploadFile] = React.useState(null);

    const [Filename, SetFilename] = React.useState(null);
    const [FileType, SetFileType] = React.useState(null);
    const [LastModified, SetLastModified] = React.useState(null);

    const [UploadReady, SetUploadReady] = React.useState(false);

    const handleFileChange = (event) => {

        SetUploadFile(event.target.files[0]);
        SetFilename(event.target.files[0].name)
        SetFileType(event.target.files[0].type)
        SetLastModified(event.target.files[0].lastModifiedDate.toDateString())

        SetUploadReady(true);
    };



    // <h2>File Details:</h2>
    //                 <p>File Name: {this.state.selectedFile.name}</p>
    //                 <p>File Type: {this.state.selectedFile.type}</p>
    //                 <p>
    //                     Last Modified:{" "}
    //                     {this.state.selectedFile.lastModifiedDate.toDateString()}
    //                 </p>


    const onFileUpload = () => {

        const formData = new FormData();

        formData.append(
            "file",
            UploadFile,
        );

        // formData.append(
        //     "filename",
        //     Filename
        // );

        // formData.append(
        //     "filetype",
        //     FileType
        // );

        // formData.append(
        //     "LastModified",
        //     LastModified
        // );

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value

        axios.post("http://localhost:8000/api/upload", formData, {
            headers: {
                'X-CSRF-TOKEN': csrftoken
            }
        }).then((response) => {
            console.log(response.data);
            console.log("success");
            props.GetLatestData();
            return response.data;
        }).catch((error) => {
            console.log(error);
        })

    }

    const classes = useStyles();
    return (
        <div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
                spacing={3}
            >
                <Grid item >
                    <form className={classes.root} noValidate autoComplete="off">
                        <Input label="Outlined" type="file" onChange={handleFileChange} />

                        {UploadReady ?
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={onFileUpload}
                            >
                                Convert to HTML
                        </Button>
                            :
                            <div>&nbsp;</div>
                        }

                    </form>
                </Grid>

                {UploadReady ?
                    <Grid item >
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={classes.heading}>File Details:</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List component="nav" aria-label="main mailbox folders"
                                    // subheader={
                                    //     <ListSubheader component="div" id="nested-list-subheader">
                                    //         File Details:
                                    //     </ListSubheader>
                                    // }
                                >
                                    <ListItem >
                                        <ListItemText primary="Filename:" />
                                        <ListItemText secondary={Filename} />
                                    </ListItem>
                                    <ListItem >
                                        <ListItemText primary="FileType:" />
                                        <ListItemText secondary={FileType} />
                                    </ListItem>
                                    <ListItem >
                                        <ListItemText primary="Last Modified:" />
                                        <ListItemText secondary={LastModified} />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Divider />
                    </Grid>
                    :
                    <Grid item>
                        <Typography variant="subtitle1">
                            Please Select a Word document. Only word files supported ok tnx
                    </Typography>
                    </Grid>
                }
            </Grid>
        </div>
    );
}