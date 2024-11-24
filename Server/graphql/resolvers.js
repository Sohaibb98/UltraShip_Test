const Employee = require('../models/Employee');
const User = require('../models/User');
const { signToken, verifyPassword, hashPassword } = require('../utils/hashPassword');

const sortOrderMap = { ASC: 1, DESC: -1 };

const sortCriteria = (employeeSort = {}) =>
    Object.entries(employeeSort).reduce((criteria, [key, value]) => {
        criteria[key] = sortOrderMap[value];
        return criteria;
    }, {});

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

const fetchEmployees = async (filter = {}, limit = DEFAULT_LIMIT, page = DEFAULT_PAGE, sort = {}) => {
    const skipValue = (page - 1) * limit;
    const employees = await Employee.find(filter)
        .limit(limit)
        .skip(skipValue)
        .sort(sortCriteria(sort));
    return employees.map(employee => ({
        ID: employee._id.toString(),
        ...employee._doc,
    }));
};

module.exports = {
    Query: {
        async employee(_, { ID }) {
            const employee = await Employee.findById(ID);
            if (!employee) throw new Error("Employee not found");
            return { ID: employee._id.toString(), ...employee._doc };
        },
        async filterEmployees(_, { employeeFilter, limit, page, employeeSort }) {
            return fetchEmployees(employeeFilter, limit, page, employeeSort);
        },
        async getEmployees(_, { limit, page, employeeSort }) {
            return fetchEmployees({}, limit, page, employeeSort);
        },
    },
    Mutation: {
        async register (_, args) {
            const { password, ...rest } = args.input;
          
            const hashedPassword = await hashPassword(password);
          
            const result = await User.create({ ...rest, password: hashedPassword });
          
            return {
              id: result.id,
              username: result.username,
              password: result.password,
              token: signToken({ userId: result.id }),
            };
        },

        async login(_, args) {
            const { password, username } = args.input;

            const result = await User.findOne({ where: { username } });
          
            const isValidPassword = await verifyPassword(result.password, password);
          
            if (!isValidPassword) {
              throw new Error("Invalid password");
            }
          
            return {
              id: result.id,
              username: result.username,
              token: signToken({ userId: result.id }),
            };
        },

        async createEmployee(_, { employeeInput: { name, age, level, subjects, attendance } }) {
            const createdEmployee = new Employee({
                name,
                age,
                level,
                subjects,
                attendance: `${attendance}%`,
                createdAt: new Date().toISOString(),
            });
            const res = await createdEmployee.save();
            return { ID: res._id.toString(), ...res._doc };
        },
        async editEmployee(_, { ID, employeeInput }) {
            if ("attendance" in employeeInput) {
                employeeInput.attendance = `${employeeInput.attendance}%`;
            }
            const updatedEmployee = await Employee.findByIdAndUpdate(ID, { $set: employeeInput }, { new: true });
            if (!updatedEmployee) throw new Error("Employee not found");
            return { ID: updatedEmployee._id.toString(), ...updatedEmployee._doc };
        },
    },
};
