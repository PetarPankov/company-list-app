import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { getProjectById, onFieldChange, editProject, getAllEmployees, handleToggle, assignEmployeesToProject, removeEmployeesFromProject } from './actions';

import EmployeesList from '../../components/EmployeesList';

class EditProject extends Component {

    handleCheckedRight = () => {
        this.props.removeEmployeesFromProject();
    };

    handleCheckedLeft = () => {       
        this.props.assignEmployeesToProject();
    };

    handleToggle = (id, type) => {
        this.props.handleToggle(id, type);
    };

    onFieldChange = event => {
        const { id, value } = event.target;
        this.props.onFieldChange(value, id);
    };

    componentDidMount = async () => {
        const { projectId } = this.props.history.location.state;
        await this.props.getProjectById(projectId);
        await this.props.getAllEmployees();
    };

    render() {
        const { project, allEmployees, assignedEmployees, checkedEmployees } = this.props;

        return (
            <div>
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid container direction="column" alignItems="center">
                        <h1>Edit Project</h1>

                        <TextField style={{margin: '5px 0'}} id="name" label="Name" value={project.name} onChange={this.onFieldChange} />
                        <TextField style={{margin: '5px 0'}} disabled id="department" label="Department" value={project.department} onChange={this.onFieldChange} />
                    </Grid>
                </Grid>

                <Grid style={{marginTop: '30px'}} container spacing={2} justify="center" alignItems="center">
                    <Grid item>
                        <EmployeesList type='assignedEmployees' checkedEmployees={checkedEmployees} handleToggle={this.handleToggle} items={assignedEmployees} />
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={this.handleCheckedRight}
                                style={{margin: '5px'}}
                                disabled={checkedEmployees.assignedEmployees.length === 0}
                                aria-label="move selected right"
                            >
                                Remove Employees
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={this.handleCheckedLeft}
                                style={{margin: '5px'}}
                                disabled={checkedEmployees.newEmployees.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <EmployeesList type='newEmployees' checkedEmployees={checkedEmployees} handleToggle={this.handleToggle} items={allEmployees} />
                    </Grid>
                </Grid>

                <Grid style={{marginTop: '30px'}} container spacing={2} justify="center" alignItems="center">
                    <Grid container direction="column" alignItems="center">
                        <Button variant="contained" color="primary" onClick={() => this.props.editProject(project)}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>

            </div>

        )
    };
}

EditProject.propTypes = {
    selectedProject: PropTypes.array.isRequired,
    allEmployees: PropTypes.array.isRequired
};

export default withRouter(
    connect(
        state => {
            return {
                project: state.projects.getIn(['editProject', 'selectedProject']).toJS(),
                allEmployees: state.projects.getIn(['editProject', 'allEmployees']).toJS(),
                assignedEmployees: state.projects.getIn(['editProject', 'assignedEmployees']).toJS(),
                checkedEmployees: state.projects.getIn(['editProject', 'checkedEmployees']).toJS()
            };
        },
        {
            getProjectById,
            onFieldChange,
            editProject,
            getAllEmployees,
            handleToggle,
            assignEmployeesToProject,
            removeEmployeesFromProject
        }
    )(EditProject));