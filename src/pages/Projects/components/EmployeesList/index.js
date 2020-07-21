import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

class EmployeesList extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { items, handleToggle, checkedEmployees, type } = this.props;
        return (
            <Paper style={{
                width: 200,
                height: 230,
                overflow: 'auto'
            }}>
                <List dense component="div" role="list">
                    {items.map((emp) => {
                        const labelId = `transfer-list-item-${emp.id}-label`;
                        const isDisabled = !!emp.isAssign
                        return (
                            <ListItem key={emp.id} role="listitem" button onClick={() => {
                                if (isDisabled) {
                                    return
                                }
                                handleToggle(emp.id, type)
                            }}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checkedEmployees[type].indexOf(emp.id) !== -1}
                                        disabled={isDisabled}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={emp.firstName} />
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
            </Paper>
        )
    };
}

EmployeesList.propTypes = {
    items: PropTypes.array.isRequired,
    checkedEmployees: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};

export default EmployeesList;