import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Card from './components/Card'

import './styles/style.scss'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/card/:ownerName/:name">
                    <Card />
                </Route>
            </Switch>
        </div>
    )
}

export default App
