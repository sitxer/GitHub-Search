import React, {Component} from 'react';

import {searchRepo} from '../api.js'
import './style.scss';

// ** name, stargazers_count, updated_at, html_url ** //

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            term: '',
            page: 1,
        }

        this.search = this.search.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    componentDidMount() {
        this.search()
    }

    search() {
        // Promise.resolve(searchRepo(this.state.term, this.state.page))
        //     .then(
        //         val => this.setState({repos: val.items})
        //     );
    }

    handleSearchInput(e) {
        this.setState({term: e.target.value}, () => {
            this.search()
        })
    }

    render() {
        const {term, repos} = this.state;

        return (
            <div>
                <input type="text" onChange={this.handleSearchInput}/>
                <ul>
                    {repos.map((item, key) => {
                        const {name, stargazers_count, updated_at, html_url} = item;
                        return <li key={key}>{name}, {stargazers_count}, {updated_at}, {html_url}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Home;
