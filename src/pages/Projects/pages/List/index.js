import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import { deleteProject, getProjectsByCompanyId } from './actions';

import { getRouteLink } from '../../../../utils/router';

class ProjectsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Department', field: 'department' },
                { title: 'Employees', field: 'employees' }
            ],
            selectedRowId: '',
            selectedProjectName: '',
            open: false
        };
    }

    componentDidMount = async () => {
        const { companyId } = this.props.history.location.state;
        await this.props.getProjectsByCompanyId(companyId);
    };

    deleteProject = async () => {
        await this.props.deleteProject(this.state.selectedRowId);

        this.setState({
            open: true
        })
        
    };

    onRowClick = (event, RowData) => {
        this.setState({
            selectedRowId: RowData.id,
            selectedProjectName: RowData.name
        });
    };

    handleClose = async () => {
        await this.props.getProjectsByCompanyId(this.props.companyId);
        this.setState({
            open: false,
            selectedRowId: '',
            selectedProjectName: ''
        })
    }

    render() {
        const { projects } = this.props;
        const { columns, selectedRowId, selectedProjectName, open } = this.state;

        return (
            <div>
                <Button style={{ margin: '40px' }} variant="contained" color="primary" onClick={() => this.props.history.push(
                    getRouteLink('project-create')
                )}>
                    Create
                        </Button>

                <div>
                    <MaterialTable
                        title="Editable Example"
                        columns={columns}
                        data={projects}
                        onRowClick={this.onRowClick}
                    />
                </div>
                {!!selectedProjectName && <div style={{ marginTop: '40px' }}> <ListItemText primary={selectedProjectName} /></div>
                }
                {!!selectedRowId && <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid container direction="row" alignItems="center">
                        <Button style={{ margin: '40px' }} variant="contained" color="primary" onClick={() => this.props.history.push(
                            getRouteLink('project-edit'),
                            { projectId: selectedRowId }
                        )}>
                            Edit
                        </Button>

                        <Button style={{ margin: '40px' }} variant="contained" color="primary" onClick={this.deleteProject}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
                }

                <Dialog onClose={this.handleClose} aria-labelledby="Delete" open={open}>
                    <DialogTitle id="Delete">Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This project was deleted
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>                      
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>

        )
    };
}

ProjectsList.propTypes = {
    projects: PropTypes.array.isRequired
};

export default withRouter(
    connect(
        state => {
            return {
                projects: state.projects.getIn(['listProjects', 'projects']).toJS(),
                companyId: state.projects.getIn(['listProjects','companyId'])
            };
        },
        {
            deleteProject,
            getProjectsByCompanyId
        }
    )(ProjectsList));