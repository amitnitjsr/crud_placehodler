import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from '../Action';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Row, Col, Button } from 'reactstrap';
import signin from '../../../asset/images/signin-image.webp';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Navbar from '../../../Component/Navbar/Navbar';
import Axios from 'axios';
import './AddEdit.css';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        boxShadow: "0px 0px 1px 1px lightgrey"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const AddEdit = (props) => {

    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const { id } = props.match.params;
        const { list } = props;
        if (id) {
            const finalList = list.filter(d => d.id === parseInt(id));
            if (finalList.length) {
                setTitle(finalList[0].title);
                setBody(finalList[0].body);
                setUserId(finalList[0].userId);
            }
        }
        else {
            setTitle('');
            setBody('');
            setUserId('');
        }
    }, [props.match.params.id, props]);

    const saveHandler = () => {
        if (props.match.params.id) {
            const data = {
                id: props.match.params.id,
                userId: userId,
                title: title,
                body: body
            }
            Axios.put('https://jsonplaceholder.typicode.com/posts/' + props.match.params.id, {
                data
            })
                .then((res) => {
                    props.history.push('/customer');
                })
                .catch((err) => {
                    console.log('error', err);
                })


        }
        else {
            const data = {
                userId: 1,
                title: title,
                body: body
            }
            Axios.post('https://jsonplaceholder.typicode.com/posts', {
                data
            })
                .then((res) => {
                    props.history.push('/customer');
                })
                .catch((err) => {
                    console.log('error', err);
                })

        }
    }

    const handleTextChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: name });
    };

    return (
        <div>
            <Navbar />
            <Container component="main" maxWidth="md" style={{ padding: '4%' }}>
                <div className={classes.paper}>
                    <form className={classes.form}>
                        <Row>
                            <Col>
                                {props.match.params.id ? <h1>Edit Customer</h1> : <h1>Add Customer</h1>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextareaAutosize
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ width: '100%', height: '110px', overflow: 'auto' }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextareaAutosize
                                    placeholder="Body"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    style={{ width: '100%', height: '110px', overflow: 'auto' }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="add-style">
                                <Button style={{ backgroundColor: '#6384f9', width: '18%' }}
                                    onClick={() => saveHandler()}
                                >Add</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <Button style={{ backgroundColor: '#6384f9' }}
                                    onClick={() => props.history.push('/customer')}
                                >Cancel</Button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        list: state.customer.customerDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...action
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
