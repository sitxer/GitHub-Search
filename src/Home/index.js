import React, {Component} from 'react';
import {debounce} from 'lodash';

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
        this.handleSearchInput = debounce(this.handleSearchInput.bind(this), 500);
    }

    componentDidMount() {
        this.search()
    }

    search() {
        console.log(this.state.term);
        // Promise.resolve(searchRepo(this.state.term, this.state.page))
        //     .then(
        //         val => this.setState({repos: val.items})
        //     );
    }

    handleSearchInput(string) {
        this.setState({term: string}, () => {
            this.search()
        })
    }

    render() {
        const {term, repos} = this.state;

        return (
            <div>
                <input type="text" onChange={(e) => {
                    this.handleSearchInput(e.target.value)
                }}/>
                <ul>
                    {repos.map(({name, stargazers_count, updated_at, html_url}, key) => {
                        return <li key={key}>

                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Home;
