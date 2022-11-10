require('dotenv').config();
var port = process.env.PORT || 4080;
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const con = require('./db_connect.js');


var app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Somewhere in lambda function at the moment
//login route 
//register route
//logout route

//restaurant register
app.post('/api/restaurant/register', function (req, res) {
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
        res.status(200).send({ code: 200, message: "Restaurant Register Successful", restaurant_id: result.insertId });
      } else {
        res.status(400).send({ code: 400, message: "Restaurant Register Failed" });
      }

    }
  });
});

//update restaurant
app.post('/api/restaurant/update', function (req, res) {
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
app.post('/api/restaurant/delete', function (req, res) {
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
        res.status(400).send({ code: 400, message: "Restaurant Get Failed" });
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
        res.status(404).send({ code: 404, message: "Restaurant Not Found" });
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
      if (result.length != 0) {
        res.status(200).send({ code: 200, message: "Restaurant Get All Successful", restaurants: result });
      } else {
        res.status(400).send({ code: 400, message: "Restaurant Get All Failed" });
      }
    }
  });
});

//add restaurant menu item
app.post('/api/restaurant/menu/add', function (req, res) {
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
app.post('/api/restaurant/menu/update', function (req, res) {
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
app.post('/api/restaurant/menu/updateWithCategory', function (req, res) {
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
app.post('/api/restaurant/menu/delete', function (req, res) {
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
        res.status(400).send({ code: 400, message: "Menu Item Get Failed" });
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
        res.status(400).send({ code: 400, message: "Menu Item Get Failed" });
      }
    }
  });
});

app.post('/api/restaurant/category/get', function (req, res) {
  console.log("Restaurant category get");
  //console.log(JSON.stringify(req.body));
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
        res.status(400).send({ code: 400, message: "Category Get Failed" });
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
        res.status(400).send({ code: 400, message: "Menu Item Get All For Restaurant Failed" });
      }
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