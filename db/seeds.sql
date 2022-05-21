INSERT INTO department (name)
VALUES
('Electrical'),
('Hardware'),
('Automotive')

INSERT INTO role (title, salary, department_id)
VALUES
('Electrical Sales Manager', '75000.00', 1),
('Hardware Sales Manager', '80000.00', 2),
('Automotive Sales Manager', '77000.00', 3),
('Electrical Sales Rep', '45000.00', 1),
('Hardware Sales Rep', '50000.00', 2),
('Automotive Sales Rep', '47000', 3);

INSERT INTO employee (first_name, second_name, role_id, manager_id)
VALUES 
('Mary', 'Davis', 1, NULL),
('Sam', 'Smith', 2, NULL),
('Dave', 'Brown', 3, NULL),
('Anne', 'Barrow', 4, 1),
('Dylan', 'Gray', 5, 2),
('Hector', 'Black', 6, 3),
('Leona', 'Lane', 6, 3),
('John', 'Roe', 4, 1),
('Morgan', 'Rex', 5, 2);

