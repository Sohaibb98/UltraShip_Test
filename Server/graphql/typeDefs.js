const { gql } = require('apollo-server')

module.exports = gql`

type Employee {
    ID: ID!,
    name: String,
    age: Int,
    level: String,
    subjects: [String],
    attendance: String
}

enum sortOrder {
    ASC,
    DESC
}

input EmployeeFilter {
    name: String,
    age: Int,
    level: String,
    subjects: [String],
    attendance: String
}

input EmployeeSort {
    name: sortOrder,
    age: sortOrder,
    level: sortOrder,
    subjects: sortOrder,
    attendance: sortOrder
}

input EmployeeInput {
    name: String,
    age: Int,
    level: String,
    subjects: [String],
    attendance: Int
}

input EditEmployeeInput {
    name: String,
    age: Int,
    level: String,
    attendance: Int,
    subjects: [String]
}

type Query {
    employee(ID: ID!): Employee!
    filterEmployees(employeeFilter: EmployeeFilter, limit: Int, page: Int, employeeSort: EmployeeSort): [Employee]
    getEmployees(limit: Int, page: Int, employeeSort: EmployeeSort): [Employee]
}

type Mutation {
    createEmployee(employeeInput: EmployeeInput): Employee!
    editEmployee(ID: ID!, employeeInput: EmployeeInput): Employee!
}
`