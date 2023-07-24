USE employees_db;

INSERT INTO department (department_name)
 VALUES ('sound design'),
        ('graphic design'),
        ('team lead'),
        ('UI artist');


INSERT INTO roles ( title, salary, department_id)
 VALUES ('web design', 50.000, 2),
        ('project manager', 100.000, 3),
        ('audio effects', 58.000, 1),
        ('UX/UI design', 48.000, 4);



INSERT INTO employee_name (first_name, last_name, role_id, manager_id)
 VALUES ('Mike', 'Brown', 3, NULL),
        ('Sarah','Davis', 2, NULL),
        ('Steve','Organ', 1, 1),
        ('Cat','Fran', 4, NULL);

