Backend API 
===================
To run: 

1. Install dependencies: `npm install`
2. Build the database: `node db_builder.js drop`
  This will drop the database and rebuild it with a single user.
3. Run the server: `node index.js`

Routes
===================
User Routes missing for now

Restaurant Routes  
Types are Strings unless otherwise specified
-------------------
`POST /api/restaurant/register` - Register a new restaurant  
  Request: 
  ```
  {
    "name": "Restaurant Name",
    "description": "Restaurant Description Ex: A restaurant that serves italian food",
    "logo": "Link to image for logo",
    "owner_id": INT "User ID of owner account. Can use 1 for the default user"",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "restaurant_id": INT "ID of the restaurant created Ex. 1"
  }
  ```
`POST /api/restaurant/update` - Update a restaurant. Must Pass in all attributes. If you arent changing one, pass in the old value.  
  Request: 
  ```
  {
    "id": INT "ID of the restaurant to update Ex. 1",
    "name": "Restaurant Name",
    "description": "Restaurant Description Ex: A restaurant that serves italian food",
    "logo": "Link to image for logo",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```

`POST /api/restaurant/delete` - Delete a restaurant by ID  
  Request: 
  ```
  {
    "id": INT "ID of the restaurant to delete Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```
`POST /api/restaurant/get` - Get a restaurant by ID  
  Request: 
  ```
  {
    "id": INT "ID of the restaurant to get Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "restaurant": {
        "id": INT "ID of the restaurant created Ex. 1",
        "name": "Restaurant Name",
        "description": "Restaurant Description Ex: A restaurant that serves italian food",
        "logo": "Link to image for logo",
        "owner_id": INT "User ID of owner account. Can use 1 for the default user"",
        "creation_time": TIMESTAMP "Time the restaurant was created",
        "update_time": TIMESTAMP "Time the restaurant was last updated",
      }
  }
  ```
`POST /api/restaurant/getByOwnerID` - Get a restaurant by ID of the User that owns it  
  Request: 
  ```
  {
    "id": INT "ID of the user to get Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400/404,
    "Message": "Success/Error Message/No restaurant found for that user"",
    if sucessful:
      "restaurant": {
        "id": INT "ID of the restaurant created Ex. 1",
        "name": "Restaurant Name",
        "description": "Restaurant Description Ex: A restaurant that serves italian food",
        "logo": "Link to image for logo",
        "owner_id": INT "User ID of owner account. Can use 1 for the default user"",
        "creation_time": TIMESTAMP "Time the restaurant was created",
        "update_time": TIMESTAMP "Time the restaurant was last updated",
      }
  }
```
`POST /api/restaurant/getAll` - Get all restaurants  
  Request: 
  ```
  {
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "restaurants": [
        {
          "id": INT "ID of the restaurant created Ex. 1",
          "name": "Restaurant Name",
          "description": "Restaurant Description Ex: A restaurant that serves italian food",
          "logo": "Link to image for logo",
          "owner_id": INT "User ID of owner account. Can use 1 for the default user"",
          "creation_time": TIMESTAMP "Time the restaurant was created",
          "update_time": TIMESTAMP "Time the restaurant was last updated",
        },
        {
          "id": INT "ID of the restaurant created Ex. 1",
          "name": "Restaurant Name",
          "description": "Restaurant Description Ex: A restaurant that serves italian food",
          "logo": "Link to image for logo",
          "owner_id": INT "User ID of owner account. Can use 1 for the default user"",
          "creation_time": TIMESTAMP "Time the restaurant was created",
          "update_time": TIMESTAMP "Time the restaurant was last updated",
        },
        ...
      ]
  }
  ```

Menu Routes  
Types are Strings unless otherwise specified
-------------------
`POST /api/restaurant/menu/add` - Add a new menu item  
  Request: 
  ```
  {
    "name": "Item Name",
    "description": "Item Description Ex: A delicious pizza",
    "price": "Price of the item Ex. 12.99",
    "image": "Link to image",
    "restaurant_id": INT "ID of the restaurant to add the menu item to Ex. 1",
    "categories": [strings...] or "string, separated, by, commas",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "menu_id": INT "ID of the menu item created Ex. 1"
  }
  ```
`POST /api/restaurant/menu/update` - Update a menu item. Must Pass in all attributes. If you arent changing one pass in the old one. Update with attributes is different route below 
  Request: 
  ```
  {
    "id": INT "ID of the menu item to update Ex. 1",
    "name": "Item Name",
    "description": "Item Description Ex: A delicious pizza",
    "price": "Price of the item Ex. 12.99",
    "image": "Link to image",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```
`POST /api/restaurant/menu/delete` - Delete a menu item by ID  
  Request: 
  ```
  {
    "id": INT "ID of the menu item to delete Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```
`POST /api/restaurant/menu/get` - Get a menu item by ID  
  Request: 
  ```
  {
    "id": INT "ID of the menu item to get Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "menu_item": {
        "id": INT "ID of the menu item created Ex. 1",
        "name": "Item Name",
        "description": "Item Description Ex: A delicious pizza",
        "price": "Price of the item Ex. 12.99",
        "image": "Link to image",
        "restaurant_id": INT "ID of the restaurant to add the menu item to Ex. 1",
        "creation_time": TIMESTAMP "Time the menu item was created",
        "update_time": TIMESTAMP "Time the menu item was last updated",
      }
  }
  ```
`POST /api/restaurant/menu/getAllForRestaurant` - Get all menu items. DOESNT INCLUDE CATEGORIES  
  Request: 
  ```
  {
    "restaurant_id": INT "ID of the restaurant to get menu items for Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "menus_items": [
        {
          "id": INT "ID of the menu item created Ex. 1",
          "name": "Item Name",
          "description": "Item Description Ex: A delicious pizza",
          "price": "Price of the item Ex. 12.99",
          "image": "Link to image",
          "restaurant_id": INT "ID of the restaurant to add the menu item to Ex. 1",
          "creation_time": TIMESTAMP "Time the menu item was created",
          "update_time": TIMESTAMP "Time the menu item was last updated",
        },
        {
          "id": INT "ID of the menu item created Ex. 1",
          "name": "Item Name",
          "description": "Item Description Ex: A delicious pizza",
          "price": "Price of the item Ex. 12.99",
          "image": "Link to image",
          "restaurant_id": INT "ID of the restaurant to add the menu item to Ex. 1",
          "creation_time": TIMESTAMP "Time the menu item was created",
          "update_time": TIMESTAMP "Time the menu item was last updated",
        },
        ...
      ]
  }
  ```
`New Menu Routes that include Categories`

`POST /api/restaurant/category/get` - returns all the categories for a restaurant  
  Request: 
  ```
  {
    "id": INT "ID of the restaurant to get categories for Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200,
    "message": "Menu Item Get Successful",
    "menu_item": [
        {
            "name": "Recommended",
        },
        {
            "name": "Sides",
        },
        ...
    ]
}
  ```

`POST /api/restaurant/menu/updateWithCategory` - Same as update but with an extra parameter for category  
  Request: 
  ```
  {
    "id": INT "ID of the menu item to update Ex. 1",
    "name": "Item Name",
    "description": "Item Description Ex: A delicious pizza",
    "price": "Price of the item Ex. 12.99",
    "image": "Link to image",
    "restaurant_id": INT "ID of the restaurant. Need this because of how categories are stored", 
    "category": [strings...] or "string, separated, by, commas",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```
  
  `POST /api/restaurant/menu/getSorted` - Get all menu items for a restaurant along with categories  
  Request: 
  ```
  {
    "id": INT "ID of the restaurant to get menu items for Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "menus_items": [
        {
          "category": "Recommended",
          "id": INT "ID of the menu item created Ex. 1",
          "name": "Item Name",
          "description": "Item Description Ex: A delicious pizza",
          "price": "Price of the item Ex. 12.99",
          "image": "Link to image",
          "restaurant_id": INT "ID of the restaurant to add the menu item to Ex. 1",
          "creation_time": TIMESTAMP "Time the menu item was created",
          "update_time": TIMESTAMP "Time the menu item was last updated",
        },
        {
          "category": "Sides",
          "id": INT "ID of the menu item created Ex. 1",
          "name": "Item Name",
          "description": "Item Description Ex: A delicious pizza",
          "price": "Price of the item Ex. 12.99",
          "image": "Link to image",
          "restaurant_id": INT "ID of the restaurant to add the menu item to Ex. 1",
          "creation_time": TIMESTAMP "Time the menu item was created",
          "update_time": TIMESTAMP "Time the menu item was last updated",
        },
        ...
      ]
  }
```

`POST /api/uploadImage` - upload an image to bucket and returns data along with direct link to image  
  Request: 
  ```
  {
    "file": file data,
    "file_name": "name of file plus extension",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "message": "Image upload successful",
    "data": { //raw response from aws
        "ETag": "\"something\"",
        "Location": "https://cloud-project2-bucket.s3.us-west-1.amazonaws.com/SU0DO2thing1.png"",
        "key": "SU0DO2thing1.png", //notice name has 6 random characters added to the front
        "Key": "SU0DO2thing1.png",
        "Bucket": "cloud-project2-bucket"
    }
  }
  ```

`POST /api/restaurant/table/add` - Add a table to a restaurant  
  Request: 
  ```
  {
    "restaurant_id": INT "ID of the restaurant to add the table to Ex. 1",
    "table_name": INT "Table number Ex. 1",
    "table_status": "Empty/In_Use", - if empty orders get declined. Res must set to In_Use when customer is seated to allow orders to pass
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "table": {
        "id": INT "ID of the table created Ex. 1",
        "restaurant_id": INT "ID of the restaurant to add the table to Ex. 1",
        "name": "name of table, Ex. Table 1",
        "status": "Table state, Ex. Empty",
      }
  }
  ```

`POST /api/restaurant/table/get` - Get all tables for a restaurant
  Request: 
  ```
  {
    "table_id": INT "ID of the table Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "table": [
        {
          "id": INT "ID of the table created Ex. 1",
          "restaurant_id": INT "ID of the restaurant to add the table to Ex. 1",
          "name": "name of table, Ex. Table 1",
          "status": "Table state, Ex. Empty",
        },
      ]
  }
  ```

`POST /api/restaurant/table/getAll` - get all tables for a restaurant
  Request: 
  ```
  {
    "restaurant_id": INT "ID of the restaurant to get tables for Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "table": [
        {
          "id": INT "ID of the table created Ex. 1",
          "restaurant_id": INT "ID of the restaurant to add the table to Ex. 1",
          "name": "name of table, Ex. Table 1",
          "status": "Table state, Ex. Empty",
        },
        ...
      ]
  }
  ```

`POST /api/restaurant/table/update` - Update a table for a restaurant
  Request: 
  ```
  {
    "table_id": INT "ID of the table Ex. 1",
    "table_name": INT "Table name Ex. Table1",
    "table_status": "Empty/In_Use", - if empty orders get declined. Res must set to In_Use when customer is seated to allow orders to pass
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    "table": [
        {
          "id": INT "ID of the table created Ex. 1",
          "restaurant_id": INT "ID of the restaurant to add the table to Ex. 1",
          "name": "name of table, Ex. Table 1",
          "status": "Table state, Ex. Empty",
        },
      ]
  }
  ```

`POST /api/restaurant/table/delete` - Delete a table for a restaurant
  Request: 
  ```
  {
    "table_id": INT "ID of the table Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```

`POST /api/order/make` - Create a new order  
  Request: 
  ```
  {
    "restaurant_id": INT "ID of the restaurant to add the order to Ex. 1",
    "table_id": INT "ID of the table to add the order to Ex. 1",
    "user_id": INT "ID of the user to add the order to Ex. 1",
    "status": "Completed, Waiting, Cancelled",
    "order_items": [
      {
        "item_id": INT "ID of the menu item to add to the order Ex. 1",
        "quantity": INT "Quantity of the menu item to add to the order Ex. 1",
        "status: "Completed, Waiting, Cancelled", 
      },
      ...
    ]
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "order_id": INT "ID of the order created Ex. 1",
  }
  ```
`POST /api/order/update` - Update an order  
  Request: 
  ```
  {
    "order_id": INT "ID of the order to update Ex. 1",
    "status": "Completed, Waiting, Cancelled",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```

`POST /api/order/delete` - Delete an order - Avoid using this, want to keep records
  Request: 
  ```
  {
    "order_id": INT "ID of the order to delete Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```

`POST /api/order/item/update` - Update an order item  
  Request: 
  ```
  {
    "order_item_id": INT "ID of the item to update Ex. 1", //You can grab this where you get the order each order item has an ID
    "status": "Completed, Waiting, Cancelled",
    "quantity": INT "Quantity of the menu item to add to the order Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```
`POST /api/order/get` - returns an order by id
  Request: 
  ```
  {
    "order_id": INT "ID of the order to get Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "order": { //single object order
        "order": {
          "id": INT "ID of the order created Ex. 1",
          "restaurant_id": INT "ID of the restaurant to add the order to Ex. 1",
          "table_id": INT "ID of the table to add the order to Ex. 1",
          "user_id": INT "ID of the user to add the order to Ex. 1",
          "status": "Completed, Waiting, Cancelled",
          "creation_time": "Time the order was created Ex. 2020-04-20 12:00:00",
        }
        "order_items": [
          {
            "order_item_id": INT "ID of the orderitem"",
            "quantity": INT "Quantity of the menu item",
            "status: "Completed, Waiting, Cancelled", 
            "item_id": INT "ID of the menu item",
            "name": "Name of the menu item",
            "price": "Price of the menu item",
            "description": "Description of the menu item ",
            "image": "Image of the menu item link",
          },
          ...
        ]
      }
  }
  ```

`POST /api/order/getAllRestaurant` - returns all orders for a restaurant
  Request: 
  ```
  {
    "restaurant_id": INT "ID of the restaurant to get orders for Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "orders": [ // array of orders
        {
          "order": {
            "id": INT "ID of the order created Ex. 1",
            "restaurant_id": INT "ID of the restaurant to add the order to Ex. 1",
            "table_id": INT "ID of the table to add the order to Ex. 1",
            "user_id": INT "ID of the user to add the order to Ex. 1",
            "status": "Completed, Waiting, Cancelled",
            "creation_time": "Time the order was created Ex. 2020-04-20 12:00:00",
          }
          "order_items": [
            {
              "order_item_id": INT "ID of the orderitem"",
              "quantity": INT "Quantity of the menu item",
              "status: "Completed, Waiting, Cancelled", 
              "item_id": INT "ID of the menu item",
              "name": "Name of the menu item",
              "price": "Price of the menu item",
              "description": "Description of the menu item ",
              "image": "Image of the menu item link",
            },
            ...
          ]
        },
        ...
      ]
  }
  ```

`POST /api/order/getAllUser` - returns all orders for a user
  Request: 
  ```
  {
    "user_id": INT "ID of the user to get orders for Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
    if sucessful:
      "orders": [ // array of orders
        {
          "order": {
            "id": INT "ID of the order created Ex. 1",
            "restaurant_id": INT "ID of the restaurant to add the order to Ex. 1",
            "table_id": INT "ID of the table to add the order to Ex. 1",
            "user_id": INT "ID of the user to add the order to Ex. 1",
            "status": "Completed, Waiting, Cancelled",
            "creation_time": "Time the order was created Ex. 2020-04-20 12:00:00",
          }
          "order_items": [
            {
              "order_item_id": INT "ID of the orderitem"",
              "quantity": INT "Quantity of the menu item",
              "status: "Completed, Waiting, Cancelled", 
              "item_id": INT "ID of the menu item",
              "name": "Name of the menu item",
              "price": "Price of the menu item",
              "description": "Description of the menu item ",
              "image": "Image of the menu item link",
            },
            ...
          ]
        },
        ...
      ]
  }
  ```