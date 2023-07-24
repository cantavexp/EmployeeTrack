SELECT
  department_name AS name, employee_name.title AS title
FROM department
JOIN employee_name ON title.id=employee_name.id;
