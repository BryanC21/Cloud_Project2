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
    "category": [strings...] or "string, separated, by, commas",
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