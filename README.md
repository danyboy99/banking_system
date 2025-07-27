# Banking System API

A comprehensive RESTful API for a banking system built with Node.js, TypeScript, Express.js, and PostgreSQL. This system provides secure authentication, account management, and transaction processing for both clients and bankers.

## 🚀 Features

### Client Features

- **Account Management**: Create and manage client accounts
- **Secure Authentication**: JWT-based authentication with Argon2 password hashing
- **Transaction Processing**: Deposit and withdrawal operations
- **Transaction History**: View personal transaction records
- **Account Balance**: Real-time balance tracking

### Banker Features

- **Banker Authentication**: Secure login system for bank employees
- **Client Management**: Create and manage client accounts
- **Transaction Oversight**: View all transactions and client activities
- **Administrative Access**: Access to system-wide banking operations

### Security Features

- **Password Hashing**: Argon2 encryption for secure password storage
- **JWT Authentication**: Token-based authentication system
- **Input Validation**: Comprehensive request validation
- **Protected Routes**: Middleware-based route protection

## 🛠️ Technology Stack

- **Backend**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Argon2
- **Validation**: Validator.js
- **Development**: Nodemon, ts-node

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd banking_system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Create a PostgreSQL database named `banking-system-main-api`
2. Update database credentials in `server/config/databaseConnect.ts`:

```typescript
export const databaseConnect = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5500, // Your PostgreSQL port
  username: "your_username",
  password: "your_password",
  database: "banking-system-main-api",
  entities: [Client, Banker, Transaction],
  synchronize: true, // Set to false in production
});
```

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=7300
JWT_SECRET=your_jwt_secret_key
DB_HOST=localhost
DB_PORT=5500
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=banking-system-main-api
```

### 5. Build and Run

```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm start
```

## 📚 API Documentation

### Base URL

```
http://localhost:7300
```

### Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: your_jwt_token
```

### Client Endpoints

#### 1. Create Client Account

```http
POST /api/client/createclient
```

**Request Body:**

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "balance": 1000,
  "card_number": "1234567890",
  "account_manager": "manager_id"
}
```

**Response:**

```json
{
  "status": "success",
  "msg": "client created successfully!",
  "token": "jwt_token_here"
}
```

#### 2. Client Login

```http
POST /api/client/login
```

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "status": "success",
  "msg": "login successfully",
  "token": "jwt_token_here"
}
```

#### 3. Create Transaction (Protected)

```http
POST /api/client/createtransaction/
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "type": "deposit", // or "withdraw"
  "amount": 500
}
```

**Response:**

```json
{
  "status": "success",
  "msg": "transaction created successfully!",
  "transactionDetails": {
    "id": "transaction_id",
    "type": "deposit",
    "amount": 500,
    "client": "client_id"
  }
}
```

#### 4. Get All User Transactions (Protected)

```http
GET /api/client/getalltransac
Authorization: Bearer <token>
```

**Response:**

```json
{
  "status": "success",
  "msg": "transaction found successfully!",
  "transactionDetails": [
    {
      "id": "transaction_id",
      "type": "deposit",
      "amount": 500,
      "client": "client_id"
    }
  ]
}
```

### Banker Endpoints

#### 1. Create Banker Account (Protected)

```http
POST /api/banker/createbanker
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane.smith@bank.com",
  "password": "bankerpassword123",
  "card_number": "0987654321",
  "employees_number": "EMP001"
}
```

#### 2. Banker Login

```http
POST /api/banker/login
```

**Request Body:**

```json
{
  "email": "jane.smith@bank.com",
  "password": "bankerpassword123"
}
```

#### 3. Get All Transactions

```http
GET /api/banker/clienttransac
```

#### 4. Get All Bankers

```http
GET /api/banker/getallbanker
```

#### 5. Get All Clients

```http
GET /api/banker/getallclient
```

#### 6. Get Banker's Client Transactions

```http
GET /api/banker/getmyusertransaction
```

## 🗂️ Project Structure

```
banking_system/
├── server/                     # Source code
│   ├── config/                # Configuration files
│   │   ├── databaseConnect.ts # Database connection setup
│   │   ├── keys.ts           # JWT secret configuration
│   │   └── verifyToken.ts    # JWT verification middleware
│   ├── controller/           # Request handlers
│   │   ├── Client.ts        # Client controller
│   │   └── banker.ts        # Banker controller
│   ├── entities/            # Database entities
│   │   ├── client.ts       # Client entity
│   │   ├── banker.ts       # Banker entity
│   │   └── transactions.ts # Transaction entity
│   ├── router/             # Route definitions
│   │   ├── Client.ts      # Client routes
│   │   └── banker.ts      # Banker routes
│   ├── services/          # Business logic
│   │   ├── client.ts     # Client services
│   │   ├── banker.ts     # Banker services
│   │   └── transaction.ts # Transaction services
│   ├── validate_input/    # Input validation
│   │   ├── isEmpty.ts    # Empty value checker
│   │   ├── loginInput.ts # Login validation
│   │   ├── clientSignup.ts # Client signup validation
│   │   ├── bankerSignup.ts # Banker signup validation
│   │   └── createTransac.ts # Transaction validation
│   └── index.ts          # Main application entry point
├── types/                # TypeScript type definitions
│   └── express/
│       └── index.d.ts   # Express interface extensions
├── build/               # Compiled JavaScript files
├── package.json        # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── ormconfig.json     # TypeORM configuration
└── README.md         # Project documentation
```

## 🚦 Available Scripts

```bash
# Development
npm run start:dev          # Start development server with hot reload

# Production
npm run build             # Build TypeScript to JavaScript
npm start                # Start production server

# Utilities
npm run tsc:version      # Check TypeScript version
npm run tsc:config       # Show TypeScript configuration
```

## 🔒 Security Considerations

- **Password Security**: All passwords are hashed using Argon2
- **JWT Tokens**: Secure token-based authentication with 2-hour expiry
- **Input Validation**: All inputs are validated before processing
- **SQL Injection Protection**: TypeORM provides built-in protection
- **Environment Variables**: Sensitive data stored in environment variables

## 🧪 Testing

Currently, the project uses manual testing. To test the API:

1. Use tools like **Postman**, **Insomnia**, or **curl**
2. Start with creating a client or banker account
3. Use the returned JWT token for protected routes
4. Test all CRUD operations

## 🚀 Deployment

### Environment Setup

1. Set `synchronize: false` in database configuration for production
2. Use environment variables for all sensitive data
3. Set up proper database migrations
4. Configure reverse proxy (nginx) for production

### Database Migration

```bash
# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**danyboy99**

## 🙏 Acknowledgments

- TypeORM for excellent database ORM
- Express.js for the robust web framework
- Argon2 for secure password hashing
- JWT for authentication tokens

## 📞 Support

If you have any questions or need help with setup, please create an issue in the repository.

---

**Happy Banking! 🏦**
