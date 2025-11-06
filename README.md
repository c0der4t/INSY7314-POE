# INSY7314-POE

## Team Members
- **Hannah Terblanche** - ST10148146  
- **Christopher Bartie** - ST10033223  
- **Monte Ekron** - ST10405522  

## Roles and Responsibilities

### Hannah Terblanche
- Front-end development  
- Documentation  
- Security: Protection against attacks 

### Christopher Bartie
- Part 3: Admin and Employee endpoints  
- Password hashing and salting  
- Input validation using Regex  

### Monte Ekron
- SSL Certificate implementation  
- Hosting setup and deployment  
- Code quality and analysis with SonarQube  
- MongoDB database setup and management  

## Project Overview

We have been tasked with creating a portal for an **online financial institution**, where users can manage transactions, and employees/admins can manage approvals and user accounts.

### User Portal
Users can:
- Create an account  
- Log in  
- Create payment requests  

### Employee/Admin Portal
Employees can:
- Log in  
- Approve or reject pending transactions  
- View the history of all accepted or rejected transactions  

Admins can:
- Create new employees  
- View all employees  
- Delete employees  

## Features
- Secure login and authentication for users and employees  
- Role-based access control (User, Employee, Admin)  
- Transaction approval workflow  
- Full transaction history for auditing purposes  

## Security Overview
We implemented several measures to protect the portal against common web security attacks:

| Attack Type                    | Prevention Measures Implemented                                                                 |
|--------------------------------|------------------------------------------------------------------------------------------------|
| **Session Hijacking**           | - Set expiration times on session tokens  <br> - Validate session data frequently  <br> - TSL/SSL |
| **Clickjacking**                | - Content Security Policy (`frame-ancestors`)  <br> - Helmet middleware  <br> - Frame-buster script |
| **SQL Injection Attacks**       | - Object-based query usage to prevent NoSQL injection attacks  <br> - Input validation using RegEx patterns |
| **Cross-Site Scripting (XSS)** | - Helmet middleware  <br> - Input sanitization  <br> - RegEx patterns for validation |
| **Man-in-the-Middle (MITM)**   | - TSL/SSL encryption                                                                              |
| **DDoS Attacks**                | - Rate limiting using Express Rate Limit middleware                                             |

These measures collectively ensure that user data, transactions, and authentication flows remain secure against common web attack vectors.


