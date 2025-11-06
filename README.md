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
- Log out 

### Employee/Admin Portal
Employees can:
- Log in  
- Approve or reject pending transactions  
- View the history of all accepted or rejected transactions  
- Log out 

Admins can:
- Log in  
- Create new employees  
- View all employees  
- Delete employees  
- Log out 

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

## Change Log


## References

- Khatri, S. (2017). *Answer to “Passing headers with axios POST request”*. [Online]. Available at: https://stackoverflow.com/a/44617848/11914974 [Accessed 10 October 2025].

- McCreary, J. *Username validation regex*. StackOverflow. Available at: https://stackoverflow.com/questions/9628879/javascript-regex-username-validation [Accessed 10 October 2025].

- Stribizew, W. *Password validation regex*. StackOverflow. Available at: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a [Accessed 10 October 2025].

- Ishettyl. *ID number validation regex*. StackOverflow. Available at: https://stackoverflow.com/questions/29383955/how-to-write-a-regex-javascript-for-an-id-validation [Accessed 10 October 2025].

- Eddy. *Account number validation regex*. StackOverflow. Available at: https://stackoverflow.com/questions/22749891/regex-validate-an-account-number-with-two-different-patterns [Accessed 10 October 2025].

- Ball, M. *Amount validation regex*. StackOverflow. Available at: https://stackoverflow.com/questions/7689817/javascript-regex-for-amount [Accessed 10 October 2025].

- blhsing. *ISO currency regex*. StackOverflow. Available at: https://stackoverflow.com/questions/57663902/regex-with-iso-currency-and-string-match [Accessed 10 October 2025].

- Klesun. *SWIFT code regex*. StackOverflow. Available at: https://stackoverflow.com/questions/3028150/what-is-proper-regex-expression-for-swift-codes [Accessed 10 October 2025].

- Cow. *Email address regex*. StackOverflow. Available at: https://stackoverflow.com/questions/50330109/simple-regex-pattern-for-email [Accessed 10 October 2025].

- React protected routes in 4 minutes (2024). [Online]. Available at: https://www.youtube.com/watch?v=pyfwQUc5Ssk [Accessed 10 October 2025].

- SnykSec (2025). *Validating and Sanitizing Data in JavaScript* [video]. Available at: https://www.youtube.com/shorts/La8_1AqVyUE [Accessed 10 October 2025].

- Raddy Z. (2022). *NodeJs Limiting Network Traffic - Express, Express Rate Limit* [video]. YouTube. Available at: https://www.youtube.com/watch?v=VZZLiVccwKk&t=213s [Accessed 10 October 2025].

## YouTube Videos

Part 2 demonstration video:

Part 3 demonstration video:

