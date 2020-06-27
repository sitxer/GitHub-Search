import React, { Component } from 'react';
import { debounce } from 'lodash';
import moment from 'moment';

import { searchRepo } from '../../api.js';
import './style.scss';
import searchIcon from '../../img/search.svg';

// ** name, stargazers_count, updated_at, html_url ** //

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
        Promise.resolve(searchRepo(this.state.term, this.state.page))
            .then(
                val => this.setState({ repos: val.items }),
            );
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
                    <input
                        type='text'
                        className={'Home__search-input'}
                        placeholder={'Search'}
                        onChange={(e) => {
                            this.handleSearchInput(e.target.value);
                        }}
                    />
                    <img className={'Home__search-icon'} src={searchIcon} alt='search'/>
                </div>
                <ul className={'Home__list'}>
                    {repos.map(({ name, stargazers_count, updated_at, html_url }, key) => {
                        const date = moment(updated_at).format('D MMM')
                        return (
                            <li className={'Home__list-item'} key={key}>
                                <div className='Home__list-item-top'>
                                    <span className={'Home__list-name'}>{name}</span>
                                    <a href={html_url} className={'Home__list-link'} target='_blank'
                                       title='GitHub link'>[Link]
                                    </a>
                                </div>
                                <div className='Home__list-item-bottom'>
                                    <div className={'Home__list-stars'}>
                                        <svg className='Home__list-stars-icon' viewBox='0 0 16 16' version='1.1'
                                             aria-hidden='true'>
                                            <path fillRule='evenodd'
                                                  d='M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z'/>
                                        </svg>
                                        {stargazers_count}
                                    </div>
                                    <div className={'Home__list-date'}>Updated {date}</div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Home;
