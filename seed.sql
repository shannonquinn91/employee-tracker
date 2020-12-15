use employee_DB;

insert into department (name)
values ("Management");
insert into department(name)
values("Accounting");
insert into department(name)
values ("Sales");
insert into department(name)
values ("Customer Service");
insert into department(name)
values ("Supplier Relations");
insert into department(name)
values ("Human Resources");
insert into department(name)
values ("Reception");
insert into department(name)
values ("Warehouse");

insert into role (title, salary, department_id)
values("CFO", 100000.00, 1);
insert into role (title, salary, department_id)
values ("VP", 95000.00, 1);
insert into role (title, salary, department_id)
values ("Regional Manager", 85000.00, 1);
insert into role (title, salary, department_id)
values ("Sales Representative", 75000.00, 3);
insert into role (title, salary, department_id)
values ("Senior Accountant", 80000.00, 2);
insert into role (title, salary, department_id)
values ("Accountant", 75000.00, 2);
insert into role (title, salary, department_id)
values ("HR Representative", 70000.00, 6);
insert into role (title, salary, department_id)
values ("Quality Control", 60000.00, 5);
insert into role (title, salary, department_id)
values ("CS Representative", 60000.00, 4);
insert into role (title, salary, department_id)
values ("Supplier Relations", 60000.00, 5);
insert into role (title, salary, department_id)
values ("Receptionist", 50000.00, 7);
insert into role (title, salary, department_id)
values ("Foreman", 55000.00, 8);
insert into role (title, salary, department_id)
values ("Warehouse Assistant", 50000.00, 8);

insert into employee (first_name, last_name, role_id)
values ("David", "Wallace", 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Jan", "Gould", 2, 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Michael", "Scott", 4, 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Dwight K.", "Schrute", 5, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Jim", "Halpert", 5, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Andy", "Bernard", 5, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Phyllis", "Lapin-Vance", 5, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Stanley", "Hudson", 5, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Angela", "Martin", 6, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Kevin", "Malone", 7, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Oscar", "Martinez", 7, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Creed", "Bratton", 9, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Meredith", "Palmer", 11, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Kelly", "Kapoor", 10, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Toby", "Flenderson", 8, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Holly", "Flax", 8, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Pam", "Beesly", 12, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Erin", "Hannon", 12, 4);
insert into employee (first_name, last_name, role_id, manager_id)
values ("Darryl", "Philbin", 13, 4);

