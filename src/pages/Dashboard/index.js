import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { getRouteLink } from '../../utils/router';

import ListItemText from '@material-ui/core/ListItemText';

class Dashboard extends Component {

    componentDidMount = async () => {
        // this is for testing purposes because my server is sleeping some times
        await axios.get('https://companies-app-prod.herokuapp.com/get-companies')
    };

    render() {
        return (
            <div className="App">
                <div style={{margin: '0 auto'}}>
                    <ListItemText
                        primary={"Hi Tick 42 Dev's!"}
                    />

                    <Button variant="contained" color="primary" onClick={() => {
                        this.props.history.push(
                            getRouteLink('companies-list')
                        );
                    }}>
                        Go to companies list
                    </Button>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);
