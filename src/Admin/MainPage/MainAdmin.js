import React from 'react'
import Admin from '../Dashboard/Admin'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default function MainAdmin() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/admin">
                        <Admin />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
