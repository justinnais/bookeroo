# Bookeroo 🦘

### The number one bookstore on this side of the equator

Bookeroo is an online bookstore, providing users a place to browse, trade and buy their favourite books.

> Created for Software Engineering: Process and Tools major project, RMIT 2021.

## Tech Stack
<p>
<img alt="React" src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black" />
<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
<img alt="Java" src="https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white" />
<img alt="Spring" src="https://img.shields.io/badge/-Spring-6DB33F?style=flat-square&logo=spring&logoColor=white" />
<img alt="AWS" src="https://img.shields.io/badge/-AWS-ff9900?style=flat-square&logo=amazonaws&logoColor=white" />
<img alt="Docker" src="https://img.shields.io/badge/-Docker-46a2f1?style=flat-square&logo=docker&logoColor=white" />
<img alt="CircleCI" src="https://img.shields.io/badge/-CircleCI-343434?style=flat-square&logo=circleCI&logoColor=white" />
<img alt="PayPal" src="https://img.shields.io/badge/-PayPal-F3BA38?style=flat-square&logo=PayPal&logoColor=white" />
</p>

## Dev Team

| [Daniel Mills](https://github.com/s3843035) | [Diana Louise](https://github.com/s3668134) | [Josh Mackay](https://github.com/s3782125) | [Justin Naismith](https://github.com/justinnais) |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------ | ------------------------------------------------ |

## Links

- [Website](https://bookeroo.danieljmills.com)

## Release Notes

### Release 0.3.0 - 23 October 2021

- Business accounts can now sign up - please wait for an admin to approve your account
- Admin users now have greater control - approve, ban, reject users
- Users can now review their favourite books and other users
- More information about books is provided through table of contents and category tags
- Admins can print off their reports in CSV format, users can print their order history too
- Users can now purchase books. Please checkout with PayPal
- NGINX routing has been improved
- Deployment is fully automated by CircleCI
- Pagination of book displays
- Updates to authentication and security
- Created GenericTable
- **Breaking change** - API endpoints were refactored to be more consistent between microservices

### Release 0.2.0 - 18 September 2021

- Setup CircleCI for deployment and testing
- Microservices for Book, Listing and Transaction
- Testing for microservices
- Book display `/books`
- View individual books `/book/{isbn}`
- Automatic deployment to AWS using docker
- Search bar and search result page `/search/?={query}`
- Admin portal `/admin`
- User profile page `/profile/{displayName}`
- Transaction API
- Shopping cart and checkout
- Skeleton loading placeholders
- Deploy scripts
- React Query to cache API requests
- Global alert toast

### Release 0.1.0 - 4 September 2021

- Landing page
- Account creation
- Login microservice
- Contact us page
