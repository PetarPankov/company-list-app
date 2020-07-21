import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListItemText from '@material-ui/core/ListItemText';

import { getCompanies, getEmployeesByCompanyId, getProjectsByCompanyId, getCompanyAddress, getEmployeeDetails } from './actions';

import TreeViewComponent from './components/TreeViewComponent';
import ProjectsInfo from './components/ProjectsInfo';
import EmployeeDetails from './components/EmployeeDetails';

class CompaniesList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = () => {
        this.props.getCompanies();
    };

    getCompanyInfoById = async companyId => {
        await this.props.getEmployeesByCompanyId(companyId);
        await this.props.getProjectsByCompanyId(companyId);
        await this.props.getCompanyAddress(companyId);
    };

    render() {
        const { companies, selectedEmployees, selectedProjects, selectedCompanyAddress, selectedCompanyId, employeeDetails } = this.props;

        const { city, country, street, state } = selectedCompanyAddress;
        const selectedCompanyProjects = selectedProjects[selectedCompanyId] || [];

        return (
            <div>
                <div style={{ display: 'flex', margin: '60px' }}>
                    <div style={{ flexGrow: 1 }}>
                        <TreeViewComponent
                            getCompanyInfoById={this.getCompanyInfoById}
                            selectedEmployees={selectedEmployees}
                            companies={companies}
                            getEmployeeDetails={this.props.getEmployeeDetails}
                        />
                    </div>

                    <div style={{ flexGrow: 2 }}>

                        <div>
                            {!!selectedCompanyId && <div>
                                <div style={{ marginBottom: '50px' }}>
                                    <ListItemText
                                        primary={`${city} ${country} ${street} ${state}`}
                                    />
                                </div>
                                {selectedCompanyProjects.length > 0 ?
                                    <ProjectsInfo companyId={selectedCompanyId} projects={selectedCompanyProjects} /> : <div>
                                        <ListItemText
                                            primary={`No projects found`}
                                        />
                                    </div>
                                }
                            </div>
                            }
                        </div>

                        <div>
                            {Object.keys(employeeDetails).length !== 0 && <div style={{ marginTop: '50px' }}>
                                <EmployeeDetails employeeDetails={employeeDetails} />
                            </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

CompaniesList.propTypes = {
    getCompanies: PropTypes.func.isRequired
};

export default connect(
    state => {
        return {
            companies: state.companiesList.get('companies').toJS(),
            selectedProjects: state.companiesList.get('selectedProjects').toJS(),
            selectedEmployees: state.companiesList.get('selectedEmployees').toJS(),
            selectedCompanyAddress: state.companiesList.get('selectedCompanyAddress').toJS(),
            selectedCompanyId: state.companiesList.get('selectedCompanyId'),
            employeeDetails: state.companiesList.get('employeeDetails').toJS()
        };
    },
    {
        getCompanies,
        getEmployeesByCompanyId,
        getProjectsByCompanyId,
        getCompanyAddress,
        getEmployeeDetails
    }
)(CompaniesList);
