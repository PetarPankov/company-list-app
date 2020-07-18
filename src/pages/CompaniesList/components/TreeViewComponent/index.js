import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

class TreeViewComponent extends Component {

    render() {
        const { companies, selectedEmployees } = this.props;
        return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                multiSelect
            >
                {companies.length > 0 && (
                    companies.map(company => {
                        return <div>
                            <TreeItem nodeId={company.id} label={company.name} onClick={() => this.props.getCompanyInfoById(company.id)}>
                                {selectedEmployees.length > 0 ? (
                                    selectedEmployees.map(employee => {
                                        return <div>
                                            <TreeItem nodeId={employee.jobArea + employee.id} label={employee.jobArea}>
                                                <TreeItem nodeId={employee.id} label={`${employee.firstName} ${employee.lastName}`} />
                                            </TreeItem>
                                        </div>
                                    })
                                ) : (<div />)}
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
    selectedEmployees: PropTypes.array.isRequired,
    getCompanyInfoById: PropTypes.func.isRequired
};

export default TreeViewComponent;