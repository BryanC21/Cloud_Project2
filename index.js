require('dotenv').config();
var port = process.env.PORT || 4080;
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const con = require('./db_connect.js');
const multiparty = require("multiparty");
const AWS = require('aws-sdk');
const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-west-1',
});

const DB_HOST = process.env.DATABASE_HOST
const DB_USER = process.env.DATABASE_USER
const DB_PASSWORD = process.env.DATABASE_PWD
const DB_DATABASE = process.env.DATABASE_DATABASE
const DB_PORT = process.env.DATABASE_PORT
const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
})

var app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Somewhere in lambda function at the moment
function generateAccessToken(user) {
  const token = jwt.sign(
    {
      user: user

    },
    process.env.JWT_KEY,
    {
      expiresIn: "12h"
    }
  );
  return token;
}

app.put("/logout", function (req, res) {
  res.cookie("jwt", '', { maxAge: 1 })
  //res.redirect('/');
  res.status(200).send({ code: 200, message: "Logged out" })

});
function datetime() {
  let dt = new Date();
  let date = ("0" + dt.getDate()).slice(-2);
  let month = (dt.getMonth() + 1);
  let year = dt.getFullYear();
  let hours = dt.getHours();
  let minutes = dt.getMinutes();
  let seconds = dt.getSeconds();
  var output = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  return output;
}

//Require authentication to access api

const checkAuth = (req, res, next) => {
  const token = req.body.token;
  console.log("----------------verifying");
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.body.decoded = decode;
      console.log("verified successfully");
      next();
    } catch (err) {
      console.log("Error in verifying");
      res.json({
        login: false,
        message: "Error in verifying"
      });
    }
  }
  else {
    res.json(
      {
        login: false,
        data: 'No token provided.'
      })
  }
};

//Require authentication to access api
app.post("/verify", (req, res) => {
  const token = req.body.token;
  console.log("----------------verifying");
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_KEY);
      console.log("verified successfully");
      res.json({
        login: true,
        message: "verified successfully",
        data: decode
      });
    } catch (err) {
      console.log("Error in verifying");
      res.json({
        login: false,
        message: "Error in verifying",
        data: err
      });
    }
  }
  else {
    res.json(
      {
        login: false,
        message: 'No token',
        data: {}
      })
  }
});

//login route 
//LOGIN (AUTHENTICATE USER, and return accessToken)
app.post("/login", (req, res) => {
  const phone_number = req.body.phone_number;
  const password = req.body.password
  db.getConnection(async (err, connection) => {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to login", error: err })
    }
    const sql_Search = "Select * from user where phone_number = ?"
    const search_query = mysql.format(sql_Search, [phone_number])
    await connection.query(search_query, async (err, result) => {
      connection.release()

      //if (err) throw (err)
      if (err) {
        res.send("user not exist");
      }

      if (result.length == 0) {

        res.json({ code: 400, message: "user not exist" });
        console.log("--------> User does not exist")
      }
      else {
        const hashedPassword = result[0].password;
        const first_name = result[0].first_name;
        const last_name = result[0].last_name;
        const id = result[0].id;
        const level = result[0].level;
        //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {

          console.log("---------> Login Successful")
          // res.json({"user info": result})
          console.log("---------> Generating accessToken")
          const token = generateAccessToken({ phone_number: phone_number, id: id, first_name: first_name, last_name: last_name, level: level })
          console.log(token)
          res.json({ code: 200, message: "login successful and token generated", accessToken: token, userinfo: result })
          // res.json({"user info": result})
        } else {
          res.status(400).send({ code: 400, message: "Password Incorrect" })
          console.log("incorrect password")
        } //end of Password incorrect
      }//end of User exists
    }) //end of connection.query()
  }) //end of db.connection()
}) //end of app.post()


//register route
//CREATE USER

app.post("/createUser", async (req, res) => {
  console.log("user registration");
  const time = datetime();
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const password = req.body.password;
  const reenter_password = req.body.reenter_password;
  const level = req.body.level;
  if (phone_number.length != 10) {
    return res.send("phone number should be 10 digits")
  }
  if (!first_name || !last_name || !phone_number || !password || !reenter_password || !level) {
    return res.send(401, {
      code: 401, message: 'required all the fields',

    })
  }
  if (reenter_password != password) {
    return res.send(401, {
      code: 401, message: 'password do not match',

    })
  }
  if (password.length < 6) {
    return res.send(401, {
      code: 400, message: 'password should be at least 6 characters',
    })
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  db.getConnection(async (err, connection) => {
    if (err) throw (err)
    const sqlSearch = "SELECT * FROM user WHERE phone_number = ?"
    const search_query = mysql.format(sqlSearch, [phone_number])
    const sqlInsert = "INSERT INTO user VALUES (0,?,?,?,?,?,?)"
    const insert_query = mysql.format(sqlInsert, [first_name, last_name, phone_number, hashedPassword, time, level])
    await connection.query(search_query, async (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "failed to query", error: err })
      }
      console.log("------> Search Results")
      if (result.length != 0) {
        connection.release()
        console.log("------> User already exists")
        res.send({ "code": 400, "message:": "user already exists" });
      }
      else {

        await connection.query(insert_query, (err, result) => {
          connection.release()
          if (err) {
            console.log(err)
            res.send(400).send({ code: 400, message: "failed to insert query", error: err })
          }
          console.log("--------> Registered successfully")
          console.log("result: " + JSON.stringify(result))
          connection.query(search_query, async (err, result) => {
            if (err) {
              console.log(err);
              res.status(400).send({ code: 400, message: "failed to search query", error: err })
            }
            message = { "first_name": first_name, "last_name": last_name, "password": password, "phone_number": phone_number, "level": level, "creation_time": time }
            console.log(message)
            res.send({ code: 200, message, "message": "registration successfull" });
          })
          //res.sendStatus(201)
        })//end of connection.search_query()
      }
    }) //end of connection.query()
  }) //end of db.getConnection()
}) //end of app.post()




//restaurant register
app.post('/api/restaurant/register', checkAuth, function (req, res) {
  console.log("Restaurant register");
  //console.log(JSON.stringify(req.body));
  let name = req.body.name;
  let description = req.body.description;
  let logo = req.body.logo;
  let owner_id = req.body.owner_id;
  let sql = `INSERT INTO Restaurant (name, description, logo, owner_id) VALUES ('${name}', '${description}', '${logo}', '${owner_id}')`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to register restaurant", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.affectedRows != 0) {
        let restaurant = result.insertId;
        let sql = `INSERT INTO ResTable (restaurant_id, name, status, description, capacity) VALUES ('${result.insertId}', 'PICKUP', 'In_Use', 'Pickup', '9999999')`;
        con.query(sql, function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send({ code: 400, message: "Failed to register restaurant", error: err });
          } else {
            console.log("Result: " + JSON.stringify(result));
            res.status(200).send({ code: 200, message: "Restaurant Register Successful", restaurant_id: restaurant });
          }
        });

      } else {
        res.status(400).send({ code: 400, message: "Restaurant Register Failed" });
      }

    }
  });
});

//update restaurant
app.post('/api/restaurant/update', checkAuth, function (req, res) {
  console.log("Restaurant update");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  let name = req.body.name;
  let description = req.body.description;
  let logo = req.body.logo;
  let sql = `UPDATE Restaurant SET name = '${name}', description = '${description}', logo = '${logo}' WHERE id = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to update restaurant", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.affectedRows != 0) {
        res.status(200).send({ code: 200, message: "Restaurant Update Successful" });
      } else {
        res.status(400).send({ code: 400, message: "Restaurant Update Failed" });
      }
    }
  });
});

//delete restaurant
app.post('/api/restaurant/delete', checkAuth, function (req, res) {
  console.log("Restaurant delete");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  let sql = `DELETE FROM Restaurant WHERE id = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to delete restaurant", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.affectedRows != 0) {
        res.status(200).send({ code: 200, message: "Restaurant Delete Successful" });
      } else {
        res.status(400).send({ code: 400, message: "Restaurant Delete Failed" });
      }
    }
  });
});

app.post('/api/restaurant/get', function (req, res) {
  console.log("Restaurant get");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  let sql = `SELECT * FROM Restaurant WHERE id = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to get restaurant", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.length != 0) {
        res.status(200).send({ code: 200, message: "Restaurant Get Successful", restaurant: result[0] });
      } else {
        res.status(200).send({ code: 200, message: "No restaurant found by id", restaurant: {} });
      }
    }
  });
});

app.post('/api/restaurant/getByOwnerID', function (req, res) {
  console.log("Restaurant get");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  let sql = `SELECT * FROM Restaurant WHERE owner_id = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to get restaurant", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.length != 0) {
        res.status(200).send({ code: 200, message: "Restaurant Get Successful", restaurant: result[0] });
      } else {
        res.status(200).send({ code: 200, message: "Restaurant Not Found", restaurant: {} });
      }
    }
  });
});

app.post('/api/restaurant/getAll', function (req, res) {
  console.log("Restaurant getAll");
  //console.log(JSON.stringify(req.body));
  let sql = `SELECT * FROM Restaurant`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to get all restaurants", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      res.status(200).send({ code: 200, message: "Restaurant Get All Successful", restaurants: result });
    }
  });
});

//add restaurant menu item
app.post('/api/restaurant/menu/add', checkAuth, function (req, res) {
  console.log("Restaurant menu add");
  console.log(JSON.stringify(req.body));
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let image = req.body.image;
  let restaurant_id = req.body.restaurant_id;
  let categories = req.body.categories; //an array of strings
  //If a string gets sent in instead of an array, it will be converted to an array
  if (typeof categories === 'string') {
    categories = categories.replace(/\s/g, '');
    categories = categories.split(',');
  }
  //Cant allow empty categories
  if (typeof categories == 'undefined' || !categories || categories.length == 0) {
    res.status(400).send({ code: 400, message: "Failed to add menu item, no categories" });
  }
  let sql = `INSERT INTO Menu_Item (name, description, price, image, restaurant_id) VALUES ('${name}', '${description}', '${price}', '${image}', '${restaurant_id}')`;

  con.query(sql, function (err, result) {

    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to add menu item", error: err });
    }
    else {
      //console.log("Result: " + JSON.stringify(result));
      if (result.affectedRows != 0) {
        let sql = `INSERT INTO Category (menuitem, restaurant, name) VALUES `;

        for (let cat of categories) {
          sql += `('${result.insertId}', '${restaurant_id}', '${cat}'),`;
        }

        sql = sql.substring(0, sql.length - 1); //Removes Trailing Comma
        sql += `;`;

        let menuitem_id = result.insertId;

        con.query(sql, function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send({ code: 400, message: "Failed to add menu item", error: err });
          } else {
            res.status(200).send({ code: 200, message: "Menu Item Add Successful", menu_id: menuitem_id });
          }
        });

      }
      else {
        res.status(400).send({ code: 400, message: "Menu Item Add Failed" });
      }
    }
  });
});

//update restaurant menu item
app.post('/api/restaurant/menu/update', checkAuth, function (req, res) {
  console.log("Restaurant menu update");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let image = req.body.image;
  let sql = `UPDATE Menu_Item SET name = '${name}', description = '${description}', price = '${price}', image = '${image}' WHERE id = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to update menu item", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.affectedRows != 0) {
        res.status(200).send({ code: 200, message: "Menu Item Update Successful" });
      } else {
        res.status(400).send({ code: 400, message: "Menu Item Update Failed" });
      }
    }
  });
});

//update restaurant menu item
app.post('/api/restaurant/menu/updateWithCategory', checkAuth, function (req, res) {
  console.log("Restaurant menu update with category");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  /*if(typeof id == 'string'){
    id = parseInt(id);
  }*/
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let image = req.body.image;
  let restaurant_id = req.body.restaurant_id;
  let categories = req.body.categories; //an array of strings
  //If a string gets sent in instead of an array, it will be converted to an array
  if (typeof categories === 'string') {
    categories = categories.replace(/\s/g, '');
    categories = categories.split(',');
  }
  //Cant allow empty categories
  if (typeof categories == 'undefined' || !categories || categories.length == 0) {
    res.status(400).send({ code: 400, message: "Failed to update menu item, no categories" });
  }
  let sql = `UPDATE Menu_Item SET name = '${name}', description = '${description}', price = '${price}', image = '${image}' WHERE id = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to update menu item", error: err });

    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.affectedRows != 0) {

        let sql = `DELETE FROM Category WHERE menuitem = '${id}'`;
        con.query(sql, function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send({ code: 400, message: "Failed to update menu item", error: err });
          } else {
            let sql = `INSERT INTO Category (menuitem, restaurant, name) VALUES `;

            for (let cat of categories) {
              sql += `('${id}', '${restaurant_id}', '${cat}'),`;
            }

            sql = sql.substring(0, sql.length - 1); //Removes Trailing Comma
            sql += `;`;

            con.query(sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to update menu item", error: err });
              } else {
                res.status(200).send({ code: 200, message: "Menu Item Update Successful" });
              }
            });

            //res.status(200).send({ code: 200, message: "Menu Item Update Successful" });
          }
        });
      } else {
        res.status(400).send({ code: 400, message: "Menu Item Update Failed" });
      }
    }
  });
});

//delete restaurant menu item
app.post('/api/restaurant/menu/delete', checkAuth, function (req, res) {
  console.log("Restaurant menu delete");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  let sql = `DELETE FROM Menu_Item WHERE id = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to delete menu item", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.affectedRows != 0) {
        res.status(200).send({ code: 200, message: "Menu Item Delete Successful" });
      } else {
        res.status(400).send({ code: 400, message: "Menu Item Delete Failed" });
      }
    }
  });
});

app.post('/api/restaurant/menu/get', function (req, res) {
  console.log("Restaurant menu get");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  let sql = `SELECT * FROM Menu_Item WHERE id = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to get menu item", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.length != 0) {
        res.status(200).send({ code: 200, message: "Menu Item Get Successful", menu_item: result[0] });
      } else {
        res.status(200).send({ code: 200, message: "No item found", menu_item: {} });
      }
    }
  });
});

app.post('/api/restaurant/menu/getSorted', function (req, res) {
  console.log("Restaurant menu get sorted by category");
  //console.log(JSON.stringify(req.body));
  let id = req.body.id;
  let sql = `SELECT Category.name AS category, Menu_Item.* FROM Category \
  INNER JOIN Menu_Item ON Category.menuitem = Menu_Item.id \
  WHERE Category.restaurant = ${id}`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to get menu item", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.length != 0) {
        //At this point loop and formtat the result
        res.status(200).send({ code: 200, message: "Menu Item Get Successful", menu_item: result });
      } else {
        res.status(200).send({ code: 200, message: "No menu items", menu_item: [] });
      }
    }
  });
});

app.post('/api/restaurant/category/get', function (req, res) {
  console.log("Restaurant category get");
  //console.log(JSON.stringify(req.body));
  console.log(req.body);
  let id = req.body.id;
  let sql = `SELECT DISTINCT(name) FROM Category WHERE restaurant = '${id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to get Category", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.length != 0) {
        res.status(200).send({ code: 200, message: "Category Get Successful", menu_item: result });
      } else {
        res.status(200).send({ code: 200, message: "No categories", menu_item: [] });
      }
    }
  });
});

app.post('/api/restaurant/menu/getAllForRestaurant', function (req, res) {
  console.log("Restaurant menu getAllForRestaurant");
  //console.log(JSON.stringify(req.body));
  let restaurant_id = req.body.restaurant_id;
  let sql = `SELECT * FROM Menu_Item WHERE restaurant_id = '${restaurant_id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to get all menu items for restaurant", error: err });
    } else {
      console.log("Result: " + JSON.stringify(result));
      if (result.length != 0) {
        res.status(200).send({ code: 200, message: "Menu Item Get All For Restaurant Successful", menu_items: result });
      } else {
        res.status(200).send({ code: 200, message: "No menu items found", menu_items: [] });
      }
    }
  });
});

app.post(`/api/uploadImage`, function (req, res) {
  console.log("Upload Image");
  var message;
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to upload image", error: err });
    }
    try {
      var fields_list = Object.entries(fields);
      var files_list = Object.entries(files);
      var file = files_list[0][1][0];
      //var description = fields_list[0][1];
      var file_name = fields_list[0][1][0];
      const file_content = fs.readFileSync(file.path);

      var rand = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 6; i++) {
        rand += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      file_name = rand + file_name;

      var params = {
        Body: file_content,
        Bucket: 'cloud-project2-bucket',
        Key: file_name
      };

      s3.upload(params, function (err, data) {
        if (err) {
          console.log(err);
          res.status(400).send({ code: 400, message: "Failed to upload image", error: err });
        }
        else {
          res.status(200).send({ code: 200, message: "Image upload successful", data: data });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ code: 400, message: "Failed to upload image", error: err });
    }
  });
});

//ordering 
//make order
app.post('/api/order/make', function (req, res) {
  console.log("Order make");
  //console.log(JSON.stringify(req.body));
  let restaurant_id = req.body.restaurant_id;
  let user_id = req.body.user_id;
  let table_id = req.body.table_id;
  let status = req.body.status;

  let order_items = req.body.order_items; //[] of objects

  let sql = `INSERT INTO ResOrder (restaurant_id, user_id, table_id, status) VALUES ('${restaurant_id}', '${user_id}', '${table_id}', '${status}')`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to make order", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //Order is made successfully. Time to add order items
        let order_id = result.insertId;
        let sql = `INSERT INTO Order_Item (order_id, item_id, quantity, status) VALUES ?`;
        let values = [];
        for (let i = 0; i < order_items.length; i++) {
          values.push([order_id, order_items[i].item_id, order_items[i].quantity, order_items[i].status]);
        }
        con.query(sql, [values], function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send({ code: 400, message: "Failed to make order", error: err });
          } else {
            console.log("Result: " + JSON.stringify(result));
            res.status(200).send({ code: 200, message: "Order make successful", order_id: order_id });
          }
        });

      }
    });
});

//update order
app.post('/api/order/update', function (req, res) {
  console.log("Order update");
  //console.log(JSON.stringify(req.body));
  let order_id = req.body.order_id;
  let status = req.body.status;

  let sql = `UPDATE ResOrder SET status = '${status}' WHERE id = '${order_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to update order", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send({ code: 200, message: "Order update successful" });
      }
    });
});

//delete order
app.post('/api/order/delete', function (req, res) {
  console.log("Order delete");
  //console.log(JSON.stringify(req.body));
  let order_id = req.body.order_id;
  let sql = `DELETE FROM ResOrder WHERE id = '${order_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to delete order", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send({ code: 200, message: "Order delete successful" });
      }
    });
});


//update order item
app.post('/api/order/item/update', function (req, res) {
  console.log("Order item update");
  //console.log(JSON.stringify(req.body));
  let order_item_id = req.body.order_item_id;
  let status = req.body.status;
  let quantity = req.body.quantity;

  let sql = `UPDATE Order_Item SET status = '${status}', quantity = '${quantity}' WHERE id = '${order_item_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to update order item", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send({ code: 200, message: "Order item update successful" });
      }
    });
});


//get order by id
app.post('/api/order/get', function (req, res) {
  console.log("Order get");
  //console.log(JSON.stringify(req.body));
  let order_id = req.body.order_id;
  let sql = `SELECT * FROM ResOrder WHERE id = '${order_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get order", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        let fullOrder = {
          order: result[0],
          order_items: []
        };
        let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
        Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
        FROM Order_Item \
        INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
        WHERE Order_Item.order_id = '${order_id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
        con.query
          (sql, function (err, result) {
            if (err) {
              console.log(err);
              res.status(400).send({ code: 400, message: "Failed to get order", error: err });
            } else {
              console.log("Result: " + JSON.stringify(result));
              fullOrder.order_items = result;
              res.status(200).send({ code: 200, message: "Order get successful", order: fullOrder });
            }
          });

      }
    });
});

//get all orders for restaurant
app.post('/api/order/getAllRestaurant', function (req, res) {
  console.log("Order get all restaurant");
  //console.log(JSON.stringify(req.body));
  let restaurant_id = req.body.restaurant_id;
  let sql = `SELECT * FROM ResOrder WHERE restaurant_id = '${restaurant_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get orders", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //res.status(200).send({ code: 200, message: "Orders get successful", orders: result });
        let fullOrders = [];
        let count = result.length;
        for (let i = 0; i < count; i++) {
          let fullOrder = {
            order: result[i],
            order_items: []
          };
          let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
          Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
          FROM Order_Item \
          INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
          WHERE Order_Item.order_id = '${result[i].id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
          con.query
            (sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to get order", error: err });
              } else {
                console.log("Result: " + JSON.stringify(result));
                fullOrder.order_items = result;
                fullOrders.push(fullOrder);
                if (fullOrders.length >= count) {
                  res.status(200).send({ code: 200, message: "Orders get successful", orders: fullOrders });
                }
              }
            });
        }
      }
    });
});

//get all incopmlete orders for a restaurant
app.post('/api/order/getAllIncompleteRestaurant', function (req, res) {
  console.log("Order get all restaurant incomplete");
  let restaurant_id = req.body.restaurant_id;
  let sql = `SELECT * FROM ResOrder WHERE restaurant_id = '${restaurant_id}' AND status == 'Waiting'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get orders", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //res.status(200).send({ code: 200, message: "Orders get successful", orders: result });
        let fullOrders = [];
        let count = result.length;
        for (let i = 0; i < count; i++) {
          let fullOrder = {
            order: result[i],
            order_items: []
          };
          let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
        Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
        FROM Order_Item \
        INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
        WHERE Order_Item.order_id = '${result[i].id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
          con.query
            (sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to get order", error: err });
              } else {
                console.log("Result: " + JSON.stringify(result));
                fullOrder.order_items = result;
                fullOrders.push(fullOrder);
                if (fullOrders.length >= count) {
                  res.status(200).send({ code: 200, message: "Orders get successful", orders: fullOrders });
                }
              }
            });
        }
      }
    });
});

//get all complete orders for a restaurant
app.post('/api/order/getAllCompleteRestaurant', function (req, res) {
  console.log("Order get all restaurant complete");
  let restaurant_id = req.body.restaurant_id;
  let sql = `SELECT * FROM ResOrder WHERE restaurant_id = '${restaurant_id}' AND status == 'Completed'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get orders", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //res.status(200).send({ code: 200, message: "Orders get successful", orders: result });
        let fullOrders = [];
        let count = result.length;
        for (let i = 0; i < count; i++) {
          let fullOrder = {
            order: result[i],
            order_items: []
          };
          let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
        Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
        FROM Order_Item \
        INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
        WHERE Order_Item.order_id = '${result[i].id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
          con.query
            (sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to get order", error: err });
              } else {
                console.log("Result: " + JSON.stringify(result));
                fullOrder.order_items = result;
                fullOrders.push(fullOrder);
                if (fullOrders.length >= count) {
                  res.status(200).send({ code: 200, message: "Orders get successful", orders: fullOrders });
                }
              }
            });
        }
      }
    });
});

//get all orders for a user
app.post('/api/order/getAllUser', function (req, res) {
  console.log("Order get all user");
  //console.log(JSON.stringify(req.body));
  let user_id = req.body.user_id;
  let sql = `SELECT * FROM ResOrder WHERE user_id = '${user_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get orders", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //res.status(200).send({ code: 200, message: "Orders get successful", orders: result });
        let fullOrders = [];
        let count = result.length;
        for (let i = 0; i < count; i++) {
          let fullOrder = {
            order: result[i],
            order_items: []
          };
          let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
          Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
          FROM Order_Item \
          INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
          WHERE Order_Item.order_id = '${result[i].id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
          con.query
            (sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to get order", error: err });
              } else {
                console.log("Result: " + JSON.stringify(result));
                fullOrder.order_items = result;
                fullOrders.push(fullOrder);
                if (fullOrders.length >= count) {
                  res.status(200).send({ code: 200, message: "Orders get successful", orders: fullOrders });
                }
              }
            });
        }
      }
    });
});

//get all incomplete orders for a user
app.post('/api/order/getAllIncompleteUser', function (req, res) {
  console.log("Order get all user incomplete");
  //console.log(JSON.stringify(req.body));
  let user_id = req.body.user_id;
  let sql = `SELECT * FROM ResOrder WHERE user_id = '${user_id}' AND status == 'Waiting'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get orders", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //res.status(200).send({ code: 200, message: "Orders get successful", orders: result });
        let fullOrders = [];
        let count = result.length;
        for (let i = 0; i < count; i++) {
          let fullOrder = {
            order: result[i],
            order_items: []
          };
          let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
            Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
            FROM Order_Item \
            INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
            WHERE Order_Item.order_id = '${result[i].id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
          con.query
            (sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to get order", error: err });
              } else {
                console.log("Result: " + JSON.stringify(result));
                fullOrder.order_items = result;
                fullOrders.push(fullOrder);
                if (fullOrders.length >= count) {
                  res.status(200).send({ code: 200, message: "Orders get successful", orders: fullOrders });
                }
              }
            });
        }
      }
    });
});

//get all complete orders for a user
app.post('/api/order/getAllCompleteUser', function (req, res) {
  console.log("Order get all user complete");
  //console.log(JSON.stringify(req.body));
  let user_id = req.body.user_id;
  let sql = `SELECT * FROM ResOrder WHERE user_id = '${user_id}' AND status == 'Complete'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get orders", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //res.status(200).send({ code: 200, message: "Orders get successful", orders: result });
        let fullOrders = [];
        let count = result.length;
        for (let i = 0; i < count; i++) {
          let fullOrder = {
            order: result[i],
            order_items: []
          };
          let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
            Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
            FROM Order_Item \
            INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
            WHERE Order_Item.order_id = '${result[i].id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
          con.query
            (sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to get order", error: err });
              } else {
                console.log("Result: " + JSON.stringify(result));
                fullOrder.order_items = result;
                fullOrders.push(fullOrder);
                if (fullOrders.length >= count) {
                  res.status(200).send({ code: 200, message: "Orders get successful", orders: fullOrders });
                }
              }
            });
        }
      }
    });
});

//get all orders for a table incomplete
app.post('/api/order/getAllIncompleteTable', function (req, res) {
  console.log("Order get all table incomplete");
  //console.log(JSON.stringify(req.body));
  let table_id = req.body.table_id;
  let sql = `SELECT * FROM ResOrder WHERE table_id = '${table_id}' AND status == 'Waiting'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get orders", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //res.status(200).send({ code: 200, message: "Orders get successful", orders: result });
        let fullOrders = [];
        let count = result.length;
        for (let i = 0; i < count; i++) {
          let fullOrder = {
            order: result[i],
            order_items: []
          };
          let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
            Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
            FROM Order_Item \
            INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
            WHERE Order_Item.order_id = '${result[i].id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
          con.query
            (sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to get order", error: err });
              } else {
                console.log("Result: " + JSON.stringify(result));
                fullOrder.order_items = result;
                fullOrders.push(fullOrder);
                if (fullOrders.length >= count) {
                  res.status(200).send({ code: 200, message: "Orders get successful", orders: fullOrders });
                }
              }
            });
        }
      }
    });
});

//get all orders for a table complete
app.post('/api/order/getAllCompleteTable', function (req, res) {
  console.log("Order get all table incomplete");
  //console.log(JSON.stringify(req.body));
  let table_id = req.body.table_id;
  let sql = `SELECT * FROM ResOrder WHERE table_id = '${table_id}' AND status == 'Completed'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get orders", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        //res.status(200).send({ code: 200, message: "Orders get successful", orders: result });
        let fullOrders = [];
        let count = result.length;
        for (let i = 0; i < count; i++) {
          let fullOrder = {
            order: result[i],
            order_items: []
          };
          let sql = `SELECT Order_Item.quantity, Order_Item.status, Order_Item.id as order_item_id, \
            Menu_Item.id as item_id, Menu_Item.name, Menu_Item.price, Menu_Item.description, Menu_Item.image \
            FROM Order_Item \
            INNER JOIN Menu_Item ON Order_Item.item_id = Menu_Item.id \
            WHERE Order_Item.order_id = '${result[i].id}' AND Order_Item.quantity > 0`; //quantity > 0 to avoid deleted items
          con.query
            (sql, function (err, result) {
              if (err) {
                console.log(err);
                res.status(400).send({ code: 400, message: "Failed to get order", error: err });
              } else {
                console.log("Result: " + JSON.stringify(result));
                fullOrder.order_items = result;
                fullOrders.push(fullOrder);
                if (fullOrders.length >= count) {
                  res.status(200).send({ code: 200, message: "Orders get successful", orders: fullOrders });
                }
              }
            });
        }
      }
    });
});

//table management
//add table
app.post('/api/restaurant/table/add', checkAuth, function (req, res) {
  console.log("Restaurant table add");
  //console.log(JSON.stringify(req.body));
  let restaurant_id = req.body.restaurant_id;
  let table_name = req.body.table_name;
  let status = req.body.table_status;
  let description = req.body.description;
  let capacity = req.body.capacity;
  let sql = `INSERT INTO ResTable (restaurant_id, name, status, description, capacity) VALUES ('${restaurant_id}', '${table_name}', '${status}', '${description}', '${capacity}')`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to add table", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send({ code: 200, message: "Table Add Successful", table: result });
      }
    });
});

//update table
app.post('/api/restaurant/table/update', checkAuth, function (req, res) {
  console.log("Restaurant table update");
  //console.log(JSON.stringify(req.body));
  let table_id = req.body.table_id;
  let table_name = req.body.table_name;
  let status = req.body.table_status;
  let description = req.body.description;
  let capacity = req.body.capacity;
  let sql = `UPDATE ResTable SET name = '${table_name}', status = '${status}', description = '${description}', capacity = '${capacity}' WHERE id = '${table_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to update table", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send({ code: 200, message: "Table Update Successful", table: result });
      }
    });
});

//delete table
app.post('/api/restaurant/table/delete', checkAuth, function (req, res) {
  console.log("Restaurant table delete");
  //console.log(JSON.stringify(req.body));
  let table_id = req.body.table_id;
  let sql = `DELETE FROM ResTable WHERE id = '${table_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to delete table", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send({ code: 200, message: "Table Delete Successful", table: result });
      }
    });
});

// get table
app.post('/api/restaurant/table/get', function (req, res) {
  console.log("Restaurant table get");
  //console.log(JSON.stringify(req.body));
  let table_id = req.body.table_id;
  let sql = `SELECT * FROM ResTable WHERE id = '${table_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get table", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send({ code: 200, message: "Table Get Successful", table: result });
      }
    });
});

// get tables for restaurant
app.post('/api/restaurant/table/getAll', function (req, res) {
  console.log("Restaurant table get all");
  //console.log(JSON.stringify(req.body));
  let restaurant_id = req.body.restaurant_id;
  let sql = `SELECT * FROM ResTable WHERE restaurant_id = '${restaurant_id}'`;
  con.query
    (sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ code: 400, message: "Failed to get tables", error: err });
      } else {
        console.log("Result: " + JSON.stringify(result));
        res.status(200).send({ code: 200, message: "Tables Get Successful", tables: result });
      }
    });
});

app.get('/api', function (req, res) {
  res.send({
    "Output": "Default GET!"
  });
});

app.post('/api', function (req, res) {
  res.send({
    "Output": "Default POST!"
  });
});

app.get('*', function (req, res) {
  res.send({
    "Output": "This route doesnt exist!"
  });
});

app.listen(port, () => console.log(`app listening on http://localhost:${port}`));
module.exports = app;
