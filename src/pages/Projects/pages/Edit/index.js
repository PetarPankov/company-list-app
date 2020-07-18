import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getProjectById, onFieldChange, editProject } from './actions';

class EditProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    onFieldChange = event => {
        const { id, value } = event.target;
        this.props.onFieldChange(value, id);
    };

    componentDidMount = () => {
        const { projectId }= this.props.history.location.state;
        this.props.getProjectById(projectId);
    };

    render() {
        const { project } = this.props;

        return (
            <div>
                <h1>Edit Project</h1>
                <form noValidate autoComplete="off">
                    <TextField id="name" label="Name" value={project.name} onChange={this.onFieldChange} />
                    <TextField id="department" label="Department"  value={project.department} onChange={this.onFieldChange} />
                </form>

                <Button variant="contained" color="primary" onClick={() => this.props.editProject(project)}>
                    Edit
                </Button>
            </div>

        )
    };
}

EditProject.propTypes = {
    selectedProject: PropTypes.array.isRequired
};

export default withRouter(
    connect(
        state => {
            return {
                project: state.projects.getIn(['editProject', 'selectedProject']).toJS()
            };
        },
        {
            getProjectById,
            onFieldChange,
            editProject
        }
    )(EditProject));