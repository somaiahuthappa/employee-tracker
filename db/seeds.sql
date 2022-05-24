INSERT INTO department (id, name)
VALUES
(1, 'Electrical'),
(2, 'Hardware'),
(3, 'Automotive');

COMMIT;

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'Electrical Sales Manager', '75000.00', 1),
(2, 'Hardware Sales Manager', '80000.00', 2),
(3, 'Automotive Sales Manager', '77000.00', 3),
(4, 'Electrical Sales Rep', '45000.00', 1),
(5, 'Hardware Sales Rep', '50000.00', 2),
(6, 'Automotive Sales Rep', '47000.', 3);

COMMIT;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'Mary', 'Davis', 1, NULL),
(2, 'Sam', 'Smith', 2, NULL),
(3, 'Dave', 'Brown', 3, NULL),
(4, 'Anne', 'Barrow', 4, 1),
(5, 'Dylan', 'Gray', 5, 2),
(6, 'Hector', 'Black', 6, 3),
(7, 'Leona', 'Lane', 6, 3),
(8, 'John', 'Roe', 4, 1),
(9,'Morgan', 'Rex', 5, 2);

