# RMIT SEPT 2021 Major Project

# Group 2 - Friday 10:30

## Members
* Dan - s3843035@student.rmit.edu.au
* Diana - s3668134@student.rmit.edu.au
* Josh - s3782125@student.rmit.edu.au
* Justin - s3605206@student.rmit.edu.au

## Links
* [Website](https://bookeroo.danieljmills.com)
* [GitHub](https://github.com/justinnais/eucalyptus-sept)
* [Jira](https://eucalyptus-sept.atlassian.net/jira/your-work)
* [Google Drive](https://drive.google.com/drive/u/1/folders/1OUPVo1OoOhK8me4Oc5aunNAdwj1d99aG)
* [CircleCI](https://app.circleci.com/pipelines/github/justinnais/eucalyptus-sept)
* [AWS](https://ap-southeast-2.console.aws.amazon.com/ec2/v2/home?region=ap-southeast-2#InstanceDetails:instanceId=i-0d6838f673f99cdf6)

## Run
To run the application locally : 
1) `cd ../frontend/bookeroo`
2) `npm install`
3) `npm run start`

Our backend is running on `https://bookeroo-api.danieljmills.com/api`.

	
## Release Notes
### Release 0.3.0 - 23 October 2021
* Buisiness accounts can now sign up - please wait for an admin to approve your account
* Admin users now have greater control - approve, ban, reject users
* Users can now review their favourite books and other users
* More information about books is provided through table of contents and category tags
* Admins can print off their reports in CSV format, users can print their order history too
* Users can now purchase books! Please checkout with PayPal
* BREAKING CHANGE - API endpoints were adjusted to be more consistent
* NGINX routing has been improved
* Deployment is fully automated by CircleCI
* Pagination of book displays
* Updates to authentication and security
* Created GenericTable

### Release 0.2.0 - 18 September 2021
* Setup CircleCI for deployment and testing
* Listing microservice created
* Transaction microservice created
* Added testing for login, transaction and listing microservices
* Acceptance testing
* Book microservice created
* Created display of books `/books`
* View individual books `/book/{isbn}`
* Automatic deployment to AWS using docker
* Search bar and search result page `/search/?={query}`
* Admin portal `/admin`
* User Profile page `/profile/{displayName}`
* Transaction API in testing
* Account approval
* Shopping cart and checkout 
* Skeleton loading placeholders `view using throttling - books page`
* Local deploy script
* React Query to cache API requests
* Global alert toast

### Release 0.1.0 - 4 September 2021
* Landing Page
* Account creation
* Login
* Contact page
  




