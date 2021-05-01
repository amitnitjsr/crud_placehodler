import React from 'react';
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as action from '../Action';
import Navbar from '../../../Component/Navbar/Navbar';
import SearchComponent from './searchComponent';
import Axios from 'axios';
import './Table.css';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            searchValues: ''
        }
    }

    componentDidMount() {
        this.getDataList();
    }

    getDataList = () => {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res) => {
                console.log('res', res)
                this.setState({ list: res.data });
                this.props.updateCustomerRedux({ data1: res.data });
            })
            .catch((err) => {
                console.log('error', err);
            })
    }

    deleteCustomer = (id) => {
        Axios.delete('https://jsonplaceholder.typicode.com/posts/' + id)
            .then((res) => {
                console.log('...', res)
            })
            .catch((err) => {
                console.log('error', err);
            })
    }

    textHandler = (e) => {
        console.log('textHandler', this.state.searchValues)
        this.setState({ searchValues: e.target.value })
    }

    searchHandler = (values) => {

    }

    render() {
        const { list } = this.state;
        return (
            <div>
                <Navbar />
                <div style={{ padding: '5%' }}>
                    <div>
                        <Button style={{
                            left: ' 2%',
                            position: 'relative'
                        }}
                            onClick={() =>
                                this.props.history.push(
                                    '/customer/new'
                                )}
                        >
                            <i className="zmdi zmdi-account-add zmdi-hc-lg"></i>&nbsp;
                    Add Customer
                </Button>
                    </div>
                    <div>
                        <div className="search">
                            <div className="search-input">
                                <SearchComponent
                                    searchHandler={this.searchHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <ReactTable
                        data={list ? list : []}
                        columns={[
                            {
                                Header: () => <div className="ID">User ID</div>,
                                accessor: 'userId',
                                className: 'text-center',
                                sortable: false,
                                filterable: false,
                                foldable: true,
                                width: 75
                            },
                            {
                                Header: () => <div className="Header" >Title</div>,
                                accessor: 'title',
                                className: 'text-center',
                                foldable: true,
                                style: { 'whiteSpace': 'unset' }
                                // width: 100
                            },
                            {
                                Header: () => <div className="Header" >Body</div>,
                                accessor: 'body',
                                foldable: true,
                                className: 'text-center',
                                style: { 'whiteSpace': 'unset' }
                                // width: 100
                            },
                            {
                                Header: () => <div className="Header" >Action</div>,
                                sortable: false,
                                filterable: false,
                                className: 'Action',
                                id: 'button',
                                width: 150,
                                Cell: (row) => {
                                    return (
                                        <span className="action">
                                            <IconButton
                                                onClick={() =>
                                                    this.props.history.push(
                                                        '/customer/edit/' + row.row._original.userId + '/'
                                                    )}
                                            >
                                                <i className="zmdi zmdi-edit zmdi-hc-fnewstatusw table-icon" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => this.deleteCustomer(row.row._original.userId)}
                                            >
                                                <i className="zmdi zmdi-delete zmdi-hc-fw table-icon" />
                                            </IconButton>
                                        </span>
                                    );
                                }
                            },
                        ]}
                        pageSize={list && list.length}
                        showPaginationBottom={false}
                    />
                </div >
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table))