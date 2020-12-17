drop database employee_DB;

create database employee_DB;

use employee_DB;


create table department(
id integer auto_increment,
name varchar(30),
primary key (id)
);

create table role(
id integer auto_increment, 
title varchar(30),
salary decimal(10,2), 
department_id int,
foreign key (department_id) references department(id),
primary key (id)
);

create table employee(
id integer auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int,
manager_id int default 1,
foreign key (role_id) references role(id),
foreign key (manager_id) references role(id),
primary key (id)
);

