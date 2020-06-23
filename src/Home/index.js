import React, { Component } from 'react';
import { debounce } from 'lodash';

import { searchRepo } from '../api.js';
import './style.scss';
import searchIcon from '../img/search.svg';

// ** name, stargazers_count, updated_at, html_url ** //

// ** {repos.map(({ name, stargazers_count, updated_at, html_url }, key) => {} )} ** //

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            term: '',
            page: 1,
        };

        this.search = this.search.bind(this);
        this.handleSearchInput = debounce(this.handleSearchInput.bind(this), 500);
    }

    componentDidMount() {
        this.search();
    }

    search() {
        // Promise.resolve(searchRepo(this.state.term, this.state.page))
        //     .then(
        //         val => this.setState({repos: val.items})
        //     );
    }

    handleSearchInput(string) {
        this.setState({ term: string }, () => {
            this.search();
        });
    }

    render() {
        const { term, repos } = this.state;

        return (
            <div className={'Home'}>
                <div className={'Home__search'}>
                    <input type='text'
                           className={'Home__search-input'}
                           placeholder={'Search'}
                           onChange={(e) => {
                               this.handleSearchInput(e.target.value);
                           }}
                    /> <img className={'Home__search-icon'} src={searchIcon} alt="search"/>
                </div>
                <ul>
                    <li className={'Home__list-item'}>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;
