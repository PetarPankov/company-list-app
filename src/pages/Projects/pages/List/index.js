import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MaterialTable from 'material-table';

class ProjectsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Department', field: 'department' },
                { title: 'Employees', field: 'employees' }
            ]
        };
    }

    render() {
        const { projects } = this.props;
        const { columns } = this.state;
        return (
            <div>
                <MaterialTable
                    title="Editable Example"
                    columns={columns}
                    data={projects}
                />
            </div>
        )
    };
}

ProjectsList.propTypes = {
    projects: PropTypes.array.isRequired
};

export default connect(
    state => {
        return {
            projects: state.companiesList.get('selectedProjects').toJS()
        };
    },
    {

    }
)(ProjectsList);