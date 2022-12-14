## API Endpoints
#### Product
- Index (/product) Get
- Show  (/product/:id) Get
- Create (/product)post  [token required]
- delete (/product) delete  [token required]
#### User
- Index (/user) Get [token required]
- Show (/user/:id) Get [token required]
- Create (/user)post 
- delete (/user) delete [token required]
- login (/user/authen) post [token required]

#### Order
- create (/order)post [token required]
- Index (/order) Get 
- show (/order/:id) Get
- delete (/order) delete [token required]
#### order_details
- Index (/order_details) Get
- show (/order_details/:id) Get
- create (/orders/:id/products) post
- delete (/order_details) delete
#### authentication
- (username,password)
- (/user/authen) post

## Data Shapes
#### Product
-  id
- product_name
- price


#### UserS
- id
- username
- password_digest

#### Orders
- id
- user_id
- status_order (active or complete)
#### order_details
- order_id
- id of each product in the order
- quantity of each product in the order
#### DATABASE 
# Product
   Column     |          Type          | Collation | Nullable | Default
--------------+------------------------+-----------+----------+---------
 id           | integer                |           | not null |
 product_name | character varying(255) |           | not null |
 price        | integer                |           | not null |

# UserS
     Column      |          Type          | Collation | Nullable | Default
-----------------+------------------------+-----------+----------+---------
 id              | integer                |           | not null |
 username        | character varying(255) |           | not null |
 password_digest | character varying(255) |           | not null |

# Orders
   Column     |          Type          | Collation | Nullable | Default
--------------+------------------------+-----------+----------+---------
 id           | integer                |           | not null |
 user_id      | character varying(255) |           | not null |
 status_order | enum                   |           | not null |

# order_details
   Column               |  Type   | Collation | Nullable | Default
------------------------+---------+-----------+----------+---------
 order_id               | integer |           | not null |
 id_product_order       | integer |           | not null |
 quantity_product_order | integer |           | not null |