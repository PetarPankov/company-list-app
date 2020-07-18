import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Button from '@material-ui/core/Button';

import { getRouteLink } from '../../../../utils/router';

class ProjectsInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { projects } = this.props;
        return (
            <div>
                <List>
                    {projects.map(project =>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={project.name}
                                secondary={project.department}
                            />
                            <Button variant="contained" color="primary" onClick={() => {
                                this.props.history.push(
                                    getRouteLink('project-edit'),
                                    { projectId: project.id }
                                );
                            }}>
                                View Project Info
                            </Button>
                        </ListItem>
                    )}
                </List>

                <Button variant="contained" color="primary" onClick={() => {
                    this.props.history.push(
                        getRouteLink('projects-list')
                    );
                }}>
                    View All Projects
                </Button>
            </div>
        )
    };
}

ProjectsInfo.propTypes = {
    projects: PropTypes.array.isRequired,
    history: PropTypes.object,
};

export default withRouter(ProjectsInfo);
