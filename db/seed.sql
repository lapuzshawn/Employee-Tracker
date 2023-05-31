use employees;

INSERT INTO department (name)
VALUES ('Marketing'), ('Human Resources'), ('Operations'), ('Research');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Marketing Manager', 90000, 1),
    ('Marketing Specialist', 70000, 1),
    ('HR Manager', 100000, 2),
    ('HR Coordinator', 60000, 2),
    ('Operations Manager', 110000, 3),
    ('Operations Analyst', 80000, 3),
    ('Research Manager', 95000, 4),
    ('Research Assistant', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Emily', 'Johnson', 1, NULL),
    ('David', 'Smith', 2, 1),
    ('Jennifer', 'Davis', 3, NULL),
    ('Michael', 'Wilson', 4, 3),
    ('Jessica', 'Anderson', 5, NULL),
    ('Christopher', 'Taylor', 6, 5),
    ('Stephanie', 'Moore', 7, NULL),
    ('Matthew', 'Thomas', 8, 7);