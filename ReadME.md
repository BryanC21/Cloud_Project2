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
    "restaurant_id": INT "ID of the restaurant to update Ex. 1",
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
  }
  ```

`GET /api/restaurant/delete` - Delete a restaurant by ID  
  Request: 
  ```
  {
    "restaurant_id": INT "ID of the restaurant to delete Ex. 1",
  }
  ```
  Response: 
  ```
  {
    "code": 200/400,
    "Message": "Success/Error Message"",
  }
  ```
