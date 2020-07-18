import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCompanies, getEmployeesByCompanyId, getProjectsByCompanyId, getCompanyAddress } from './actions';

import TreeViewComponent from './components/TreeViewComponent';
import ProjectsInfo from './components/ProjectsInfo';

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
        const { companies, selectedEmployees, selectedProjects, selectedCompanyAddress } = this.props;

        const { city, country, street, state } = selectedCompanyAddress;

        return (
            <div>
                <div style={{ display: 'flex', margin: '60px' }}>
                    <div style={{ flexGrow: 1 }}>
                        <TreeViewComponent
                            getCompanyInfoById={this.getCompanyInfoById}
                            selectedEmployees={selectedEmployees}
                            selectedProjects={selectedProjects}
                            companies={companies}
                        />
                    </div>

                    <div style={{ flexGrow: 2 }}>
                        {selectedProjects.length > 0 &&
                            <div>
                                <div style={{ marginBottom: '50px' }}>{`${city} ${country} ${street} ${state}`}</div>

                                <ProjectsInfo projects={selectedProjects} />
                            </div>
                        }
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
            selectedCompanyAddress: state.companiesList.get('selectedCompanyAddress').toJS()
        };
    },
    {
        getCompanies,
        getEmployeesByCompanyId,
        getProjectsByCompanyId,
        getCompanyAddress
    }
)(CompaniesList);
