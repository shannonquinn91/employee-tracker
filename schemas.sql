drop database employee_DB;

create database employee_DB;

use employee_DB;


create table department(
department_id integer auto_increment,
name varchar(30),
primary key (department_id)
);

create table role(
role_id integer auto_increment, 
title varchar(30),
salary decimal(10,2), 
department_id int,
foreign key (department_id) references department(department_id),
primary key (role_id)
);

create table employee(
id integer auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int,
foreign key (role_id) references role(role_id),
primary key (id)
);

