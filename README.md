# Finly: A Digital Finance Application  

## Introduction  

In the ever-evolving world of financial technology, building a digital finance application offers a tremendous learning opportunity. I embarked on this project to enhance my skills in JavaScript while exploring the intricacies of managing financial workflows.  

To achieve this, I chose **Next.js** as the framework for its powerful features and **Tailwind CSS** for styling. The goal was not only to build a functional application but also to understand the architecture and operations behind digital financial platforms.  

---

## Key Features of Finly  

- **User-Friendly Interface**: Intuitive dashboard for users and merchants to manage transactions.  
- **Money Transfer**: Send money to other users or merchants.  
- **Withdrawals**: Users and merchants can withdraw funds to their linked bank accounts.  
- **Bank Integration**: Seamless communication with banking systems via APIs and webhooks.  
- **Real-Time Updates**: Ensure immediate notifications for successful transactions or issues.  

---

## Architecture  

### Main Components  

#### Main Website (Finly)  
The core platform where users interact with the app. It handles:  
- User registration and authentication.  
- Viewing transaction history.  
- Sending money and withdrawing funds.  

#### Bank APIs and Webhooks  
Banks provide APIs and webhooks to facilitate transactions. Finly integrates with these services to handle:  
- Deposits and withdrawals.  
- Real-time balance updates via webhooks.  

#### Backend Services  
- Handles encryption, validation, and communication with bank systems.  
- Processes incoming webhooks for synchronization with banking services.  

#### Database  
- Stores user details, transaction history, and balances.  
- Modern databases like MongoDB or PostgreSQL ensure scalability and performance.  

---

## Core Functionalities  

### 1. Send Money to Someone  
Users can send money to others. The process involves:  
- Verifying recipient details and sufficient balance.  
- Logging transactions in the database.  
- Webhook notifications for successful transactions.  

### 2. Withdraw Balance (Merchant or User)  
Merchants or users can request withdrawals, which are:  
- Verified by the backend.  
- Processed through the bank’s API.  
- Updated via webhooks upon success.  

### 3. Webhooks for Incoming Transfers  
When users deposit money, bank webhooks notify Finly:  
- The backend validates the webhook and updates user balances.  
- Real-time updates ensure seamless experience.  

---

## Hooks in Finly  

### Frontend Hooks  
- **`useSession`**: Manages user authentication.  
- **`useEffect`**: Listens for real-time updates.  
- **`useState`**: Handles UI state.  

### Backend Hooks  
- Custom hooks streamline API requests, webhook validation, and transaction logging.  

---

## Instructions to Clone and Set Up  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/finly.git
   cd finly
   ```
2. **Install Dependencies**
  - Navigate to the root directory and install dependencies:

    ```bash
    Copy code
    npm install
    ```
3. **Database Configuration**
- Go to the packages/db/prisma folder.
  Open the schema.
- prisma file.
- Replace the placeholder database URL with your
- Prisma database connection URL:
- prisma
- Copy code
    ```
    datasource db {
      provider = "postgresql" // or your preferred provider
      url      = "postgresql://<username>:<password>@<host>:<port>/<database>"
    }
    ```
- Run Prisma Migrations
- Initialize the database schema:

  ```bash
  npx prisma migrate dev --name init
  ```
Start the Application
Navigate to the root directory and run the application at localhost:3000


