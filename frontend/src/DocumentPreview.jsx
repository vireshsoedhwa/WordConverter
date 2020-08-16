import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DownloadIcon from '@material-ui/icons/GetApp';

import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';

import { MDBContainer, MDBIframe } from "mdbreact";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function DocumentPreview(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let thedate = new Date(props.time);

    let datestring = thedate.getFullYear() + "-" + thedate.getMonth() + "-" +
        thedate.getDate() + "  " + thedate.getHours() + ":" + thedate.getMinutes()

    return (
        <Card className={classes.root} raised>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.index}
                    </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={props.name}
                subheader={datestring}
            />
            {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {/* This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like. */}
                    {/* <Typography
                        variant="h6" gutterBottom
                    >
                        Preview
                    </Typography> */}
                    <MDBContainer>
                        <MDBIframe src={"http://localhost:8000/api/media?doc=" + props.index} />
                    </MDBContainer>

                </Typography>
            </CardContent>

            <CardActions disableSpacing>

                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton> */}

                {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}

                <Tooltip title="Open in New Tab">
                    <IconButton aria-label="share">
                        <Link
                            href={"http://localhost:8000/api/media?doc=" + props.index}
                            // color="primary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkIcon />
                        </Link>
                    </IconButton>
                </Tooltip>


                <Tooltip title="Download">
                    <IconButton aria-label="share">
                        <Link
                            href={"http://localhost:8000/code/DATA/converted/" + props.index + "/html" }
                            // color="primary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <DownloadIcon />
                        </Link>
                    </IconButton>
                </Tooltip>


                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Original Document Name:</Typography>
                    <Typography paragraph>
                        {props.name}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}