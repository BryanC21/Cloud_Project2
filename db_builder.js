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
last_name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL,\
creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, level VARCHAR(10) NOT NULL, PRIMARY KEY(id)) ";
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
update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
PRIMARY KEY (id), FOREIGN KEY (owner_id) REFERENCES User(id) ON DELETE CASCADE)";
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
PRIMARY KEY (id), FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Menu_Item created");
});

/**
 *  Category:
 * id (mandatory) "Not really used much"
 * name (mandatory)
 * restaurant id (Restaurant it belongs to) (mandatory) This is for simpler queries when getting full menus for a restaurant
 * menu item id (Menu_Item it belongs to) (mandatory) 
 */
var sql = "CREATE TABLE Category (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, \
restaurant INT NOT NULL, menuitem INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (restaurant) REFERENCES Restaurant(id) \
ON DELETE CASCADE, FOREIGN KEY (menuitem) REFERENCES Menu_Item(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Category created");
});

//table table
// table status: closed (no one there decline orders), open (waiter opens the table for ordering because they have confirmed real people there), 
// restaurant id
// table_name
// id
var sql = "CREATE TABLE ResTable (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, \
capacity INT NOT NULL, description VARCHAR(255), \
restaurant_id INT NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id) \
ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Table created");
});

/**
* id
* user id (User it belongs to) (mandatory)
* restaurant id (Restaurant it belongs to) (mandatory)
user id
status: *Completed, waiting, cooking, Cancelled
creation time
total price
*/
var sql = "CREATE TABLE ResOrder (id INT NOT NULL AUTO_INCREMENT, creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
table_id INT NOT NULL, \
user_id INT NOT NULL, \
restaurant_id INT NOT NULL, status VARCHAR(255) NOT NULL, \
PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE, \
FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id) ON DELETE CASCADE, \
FOREIGN KEY (table_id) REFERENCES ResTable(id))";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Order created");
});

//order item MtoM
//order to item, many to many
//oprdrs to item with other stuff
//tables have order and tyhey hvave items_orders 
//id
//order id
//item id
//quantity
//status
var sql = "CREATE TABLE Order_Item (id INT NOT NULL AUTO_INCREMENT, order_id INT NOT NULL, \
item_id INT NOT NULL, quantity INT NOT NULL, status VARCHAR(255) NOT NULL, \
PRIMARY KEY (id), FOREIGN KEY (order_id) REFERENCES ResOrder(id) ON DELETE CASCADE, \
FOREIGN KEY (item_id) REFERENCES Menu_Item(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Order_Item created");
});

//Inserts

var sql = "INSERT INTO User (first_name, last_name, phone_number, password, level) VALUES ('John', 'Doe', '1231231231', '$2b$10$2Q0Nb2exzidQZMWBrHE5Q.BvJ2aKUx4VaZ4yAXcfPdrY3JKJboCjm', 'admin')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 User inserted");
});
var sql = "INSERT INTO User (first_name, last_name, phone_number, password, level) VALUES ('Doe', 'John', '1231231232', '$2b$10$2Q0Nb2exzidQZMWBrHE5Q.BvJ2aKUx4VaZ4yAXcfPdrY3JKJboCjm', 'user')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 User inserted");
});
var sql = "INSERT INTO User (first_name, last_name, phone_number, password, level) VALUES ('PICKUP', 'PICKUP', '0000000000', '$2b$10$2Q0Nb2exzidQZMWBrHE5Q.BvJ2aKUx4VaZ4yAXcfPdrY3JKJboCjm', 'user')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 User inserted");
});

var sql = "INSERT INTO Restaurant (name, description, logo, owner_id) VALUES ('Johns Restaurant', 'A restaurant', 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg', 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});

//var sql = "INSERT INTO Menu_Item (name, description, image, price, restaurant_id) VALUES ('Pizza', 'A pizza', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg', '10.00', 1)";
//con.query(sql, function (err, result) {
//    if (err) throw err;
//    console.log("1 record inserted");
//});

con.end();