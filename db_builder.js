const mysql = require('mysql');
const path = require('path');
require('dotenv').config();
var drop = process.argv[2] === 'drop'; //node db_builder.js drop

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PWD || 'root',
    port: process.env.DATABASE_PORT || 3306,
});

var dbName = process.env.DATABASE_DATABASE || 'cloud2';

con.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

if (drop == true) {
    var sql = `DROP DATABASE IF EXISTS ${dbName}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("DATABASE dropped");
    });

    var sql = `CREATE DATABASE ${dbName}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("DATABASE created");
    });
}
con.changeUser({ database: dbName }, function (err) {
    if (err) throw err;
    console.log("Switched to database " + dbName);
});

/**
 * User:
id
First name
Last name
Phone number (Saved as a string because its simpler)
password
creation time
 */
var sql = "CREATE TABLE User (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(255) NOT NULL, \
last_name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, \
creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id)) ";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE USER created");
});

/**
 * Restaurant:
id (mandatory)
name (mandatory)
description
restaurant logo s3 link 
creation time
owner id (User it belongs to) (mandatory)
--add in later
    restaurant hours (open/close)
    restaurant address
    restaurant phone number
    active (boolean) (if the restaurant wants to be closed but not deleted so they can reopen later)
 */
var sql = "CREATE TABLE Restaurant (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, \
description VARCHAR(255), \
logo VARCHAR(255), \
owner_id INT NOT NULL, \
creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
updatetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
PRIMARY KEY (id), FOREIGN KEY (owner_id) REFERENCES User(id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Restaurant created");
});

/**
 * Menu_Item:
id (mandatory)
name (mandatory)
description
s3 image location (could be null)
price (mandatory)
restaurant id (Restaurant it belongs to) (mandatory)
--add in later 
    spice level
    allergens
    ingredients
    category
*/
var sql = "CREATE TABLE Menu_Item (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, \
description VARCHAR(255), \
image VARCHAR(255), \
price VARCHAR(255) NOT NULL, \
restaurant_id INT NOT NULL, \
creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
PRIMARY KEY (id), FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Menu_Item created");
});

//ordering in component 2
  //make order
  //update order
  //archive order
//table management in component 2
  //add table
  //update table
  //delete table

//Inserts
var sql = "INSERT INTO User (first_name, last_name, phone_number, password) VALUES ('John', 'Doe', '1234567890', 'password')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});

con.end();