SELECT role.id, role.title, role.salary, department.name AS department
FROM role
INNER JOIN department ON role.department_id = department.id;

INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);