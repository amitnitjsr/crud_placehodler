import React from 'react';
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as action from '../Action';
import Navbar from '../../../Component/Navbar/Navbar';
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

    textHandler = (e) => {
        this.setState({ searchValues: e.target.value })
    }

    searchHandler = (e) => {

    }

    render() {
        const { list } = this.state;
        return (
            <div>
                <Navbar />
                <div style={{ padding: '5%' }}>
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
                    <input type="text" value={this.state.searchValues}
                        onChange={(e) => this.textHandler(e)}
                        onKeyDown={(e) => this.searchHandler(e)}
                    />
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
                                // width: 100
                            },
                            {
                                Header: () => <div className="Header" >Body</div>,
                                accessor: 'body',
                                foldable: true,
                                className: 'text-center',
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
                                                onClick={() => this.props.deleteCustomer({ 'id': row.row._original.userId })}
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