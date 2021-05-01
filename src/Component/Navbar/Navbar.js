import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col } from 'reactstrap';
import './Navbar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function Navbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Col className="col-md-1 col-sm-1 ml-auto">
                        <Link to='/customer' className="link" >
                            <i className="zmdi zmdi-home zmdi-hc-lg"></i>
                        </Link>
                    </Col>
                </Toolbar>
            </AppBar>
        </div >
    );
}

export default withRouter(Navbar);
