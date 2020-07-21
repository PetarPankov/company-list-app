import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

class TreeViewComponent extends Component {

    generateJobAreaItems = selectedCompanyEmployees => {
        if (selectedCompanyEmployees.length > 0) {
            let areaObject = {};

            selectedCompanyEmployees.map(employee => {
                const jobAreaObj = areaObject[employee.jobArea];
                if (!jobAreaObj) {
                    areaObject[employee.jobArea] = [employee];
                }
                else {
                    areaObject[employee.jobArea].push(employee);
                }
            });

            return areaObject;
        }
        else {
            return {};
        }
    };

    render() {
        const { companies, selectedEmployees } = this.props;
        return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {companies.length > 0 && (
                    companies.map(company => {
                        const selectedCompanyEmployees = selectedEmployees[company.id] || [];
                        const areaObject = this.generateJobAreaItems(selectedCompanyEmployees, company.id);

                        return <div>
                            <TreeItem nodeId={company.id} label={company.name} onClick={() => this.props.getCompanyInfoById(company.id)}>
                                {Object.keys(areaObject).length !== 0 ? Object.keys(areaObject).map(key => {
                                    const employees = areaObject[key];

                                    return <TreeItem nodeId={key + '_' + company.id} label={`${key} (${employees.length})`}>
                                        {employees.map(employee => {
                                            return <TreeItem nodeId={employee.id} onClick={() => this.props.getEmployeeDetails(employee.id)} label={`${employee.firstName} ${employee.lastName}`} />
                                        })
                                        }
                                    </TreeItem>
                                }) : <div />}
                            </TreeItem>
                        </div>
                    })
                )}

            </TreeView>
        )
    };
}

TreeViewComponent.propTypes = {
    companies: PropTypes.array.isRequired,
    selectedEmployees: PropTypes.object.isRequired,
    getCompanyInfoById: PropTypes.func.isRequired,
    getEmployeeDetails: PropTypes.func.isRequired
};

export default TreeViewComponent;