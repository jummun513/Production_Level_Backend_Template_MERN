# Production_Level_Backend_Template

## Basic Functionalities of branches

### starter_pack

- CRUD operations (Users) with basic setup and error handling (user).
- isDeleted=true data prevent to send (mongoose post middleware or service level findById system).

### query_pack

- CRUD operations and Query data (Products) with queryBuilder function with limit and pagination.
- isDeleted=true data prevent to send (mongoose post middleware or service level findById system).
- Pipeline and Aggregation, use mongoose post middleware to send specific data to the response.

### firebase_auth_pack

- CRUD operations (User login and registration)
- Auto userId generation
- JWT access or refresh token with queryBuilder function.
- isDeleted=true data prevent to send (mongoose post middleware or service level findById system).

### authentication_pack

- CRUD operations (User login and registration)
- isDeleted=true data prevent to send (mongoose post middleware or service level findById system).
- User Uniqueness check using instance or static method (user) or mongoose pre middleware or service file level findById() system.
- Password hashing (mongoose middleware pre) and bcrypt.
- Prevent password send to the client with the get response.
- Auto userId generation.
- Email verification with nodemailer.
- Password reset and change.

### authorization_pack

- Start after the `authentication_pack`
- JWT access or refresh token.
- Protecting routes (Role base authentication) with authGuard middleware.
