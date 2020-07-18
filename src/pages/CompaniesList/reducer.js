import { defaultState } from './defaultState';
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const companiesList = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_COMPANIES: {
            if (action.state === 'finished') {
                return state
                    .set('companies', action.response)
            }

            return state;
        }
        case actionTypes.GET_EMPLOYEES_BY_COMPANY_ID: {
			/* if (action.state === 'finished') {
				return state
					.set('companies', action.response)
			} */
            return state
                .set('selectedEmployees', fromJS([{
                    "id": "58c69299-ace4-47a9-b4f5-9374ee1d7c6e",
                    "firstName": "Elmer",
                    "lastName": "Purdy",
                    "dateOfBirth": "1991-01-27T15:52:46.305Z",
                    "companyId": "87815355-d092-428a-81f4-e3fd574056aa",
                    "jobTitle": "Investor Group Administrator",
                    "jobArea": "Accountability",
                    "jobType": "Engineer"
                },
                {
                    "id": "764fa253-05b2-4dee-bc11-cae08df6dcb6",
                    "firstName": "Tyrese",
                    "lastName": "Christiansen",
                    "dateOfBirth": "1988-09-11T15:17:10.705Z",
                    "companyId": "a2c39255-202a-4239-8a9f-5de62629ece0",
                    "jobTitle": "Lead Accounts Analyst",
                    "jobArea": "Applications",
                    "jobType": "Developer"
                },
                {
                    "id": "c6b8a365-8920-4aaf-b2fd-c4373a1a8698",
                    "firstName": "Cedrick",
                    "lastName": "McKenzie",
                    "dateOfBirth": "1987-01-22T10:40:20.760Z",
                    "companyId": "07c9ca30-e7dc-4eac-b4ae-36b4ae2acf73",
                    "jobTitle": "Direct Configuration Supervisor",
                    "jobArea": "Directives",
                    "jobType": "Technician"
                }]));            
        }
        case actionTypes.GET_PROJECTS_BY_COMPANY_ID: {
			/* if (action.state === 'finished') {
				return state
					.set('companies', action.response)
			} */
            return state
                .set('selectedCompanyId', action.companyId)
                .set('selectedProjects', fromJS([{
                    "id": "eec9dfc5-3e34-4992-9751-f7d8c650f1de",
                    "name": "Unbranded Frozen Car",
                    "department": "Garden",
                    "employeesId": ["1504fe2c-325d-445b-9278-cdd23f6a1317"],
                    "companyId": "8cd78042-6990-483f-8d22-7a32e5c75606"
                },
                {
                    "id": "0b08928d-4244-4d76-b7ac-72e17183247a",
                    "name": "Sleek Concrete Shoes",
                    "department": "Kids",
                    "employeesId": [],
                    "companyId": "3c26ed77-821c-4fc8-91d3-034ccfdc2179"
                },
                {
                    "id": "c6d11bec-ae50-4837-8adf-be301bee9039",
                    "name": "Unbranded Granite Soap",
                    "department": "Books",
                    "employeesId": [
                        "2a32c2a6-2bd5-4f94-aa44-f4d3179bd320",
                        "89f5dfdd-58f2-44d3-b2f9-32aa49206ada"
                    ],
                    "companyId": "975335ac-85b4-4740-b1fa-c88cdb5798e1"
                }]));
        }
        case actionTypes.GET_COMPANY_ADDRESS: {
			/* if (action.state === 'finished') {
				return state
					.set('companies', action.response)
			} */
            return state
                .set('selectedCompanyAddress', fromJS({
                    "id": "5e3fcddd-048f-4aa6-bc38-d2c26c6ed9dd",
                    "city": "South Olin",
                    "country": "Albania",
                    "street": "56709 Heidenreich Track",
                    "state": "Kansas",
                    "companyId": "2b1780f7-052d-4bf2-ac6f-886651c0dfde"
                }));
        }
    }

    return state;
};

export default companiesList;
