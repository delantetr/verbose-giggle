SELECT
  e.id,
  e.first_name,
  e.last_name,
  role.title,
  department.name AS department,
  role.salary,
  CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role ON e.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee m ON e.manager_id = m.id;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);

UPDATE employee
SET role_id = new_role_id
WHERE id = employee_id;