import React, { Component } from 'react';
import './searchComponent.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    handleSearch = (value) => {
        this.setState({ search: value }, () => {
            if (!this.state.search) {
                this.searchhandlerData(this.state.search);
            }
        })
    }

    enterPressHandler = (e) => {
        if (e.key === 'Enter') {
            this.searchhandlerData(this.state.search);
        }
    }

    searchhandlerData = (value) => {
        this.props.searchHandler(value);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.search}
                    onChange={(e) => this.handleSearch(e.target.value)}
                    onKeyDown={(e) => this.enterPressHandler(e)}
                />
                {
                    this.state.search !== "" ? <i className="zmdi zmdi-close search-icon"
                        onClick={() => this.handleSearch("")} /> :
                        <i className="zmdi zmdi-search search-icon" />
                }
            </div>
        )
    }
}

export default Search;