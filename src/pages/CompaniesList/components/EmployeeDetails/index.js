import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const LABELS = {
    firstName: {
        label: 'First Name',
        type: 'text'
    },
    lastName: {
        label: 'Last Name',
        type: 'text'
    },
    dateOfBirth: {
        label: 'Date Of Birth',
        type: 'date'
    },
    jobTitle: {
        label: 'Job Title',
        type: 'text'
    },
    jobArea: {
        label: 'Job Area',
        type: 'text'
    },
    jobType: {
        label: 'Job Type',
        type: 'text'
    }
}

class EmployeeDetails extends Component {
    render() {
        const { employeeDetails } = this.props;
        return (
            <div>
                <List>
                    {Object.keys(employeeDetails).length !== 0 ?  Object.keys(employeeDetails).map(key => {
                        const info = employeeDetails[key];
                        if (LABELS[key]) {
                            return <ListItem>
                            <ListItemText
                                primary={LABELS[key].label}
                                secondary={info}
                            />
                        </ListItem>
                        }
                      
                     }) : <div />}
                </List>
            </div>
        )
    };
}

EmployeeDetails.propTypes = {
    employeeDetails: PropTypes.object.isRequired
};

export default EmployeeDetails;
