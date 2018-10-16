<h1 align="center">CS10-Labor POS</h1>
<div align="center"> <img src="client/public/goldraccoon.png" alt="License:This icon is provided by Tae S. Yang as Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International" title="License:  This icon is provided by Tae S. Yang as Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International"/></div>

<div align="center"><h2>Brought to you by:</h2>

<a href="https://github.com/wajnurfes">Zach Campbell</a>

<a href="https://github.com/nphillips78">Cole Phillips</a>

<a href="https://github.com/AmyShackles">Amy Shackles</a>

</div>
<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![Python](https://img.shields.io/badge/python-3.7-blue.svg)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
  - [Frontend Built Using](#frontend-built-using)
  - [Backend Built Using](#backend-built-using)
  - [Reasoning](#reasoning)
- [Security](#security)
  - [Authentication](#authentication)
  - [Authorization](#authorization)
  - [Form Validation](#form-validation)
  - [OWASP Top 10 Application Security Risks 2017](#owasp-top-10-application-security-risks-2017)
    - [Injection](#injection)
    - [Broken Authentication](#broken-authentication)
    - [Sensitive Data Exposure](#sensitive-data-exposure)
    - [XML External Entities](#xml-external-entities)
    - [Broken Access Control](#broken-access-control)
    - [Security Misconfiguration](#security-misconfiguration)
    - [Cross-Site Scripting](#cross-site-scripting)
    - [Insecure Deserialization](#insecure-deserialization)
    - [Using Components with Known Vulnerabilities](#using-components-with-known-vulnerabilities)
    - [Insufficient Logging and Monitoring](#insufficient-logging-and-monitoring)
  - [Additional Security Threats](#additional-security-threats)
    - [CSRF](#csrf)
    - [Clickjacking](#clickjacking)
- [Testing](#testing)
- [Improving Performance](#improving-performance)
- [Installation Instructions](#installation-instructions)
  - [Environment Variables](#environment-variables)
  - [Using the Application](#using-the-application)
- [Contributing](#contributing)
- [Documentation](#documentation)
  - [Database](#database)
    - [Models](#models)
      - [User Model](#user-model)
      - [Client Model](#client-model)
      - [Job Model](#job-model)
      - [Part Model](#part-model)
      - [Note Model](#note-model)
      - [Tag Model](#tag-model)
  - [GraphQL](#graphql)
    - [Queries](#queries)
      - [On User Model](#on-user-model)
      - [On Client Model](#on-client-model)
      - [On Job Model](#on-job-model)
      - [On Note Model](#on-note-model)
      - [On Part Model](#on-part-model)
    - [Mutations](#mutations)
      - [User Mutations](#user-mutations)
        - [Create User](#create-user)
        - [Edit User](#edit-user)
        - [Delete User](#delete-user)
      - [Client Mutations](#client-mutations)
        - [Create Client](#create-client)
        - [Edit Client](#edit-client)
        - [Delete Client](#delete-client)
      - [Job Mutations](#job-mutations)
        - [Create Job](#create-job)
        - [Edit Job](#edit-job)
        - [Delete Job](#delete-job)
      - [Note Mutatons](#note-mutations)
        - [Create Note](#create-note)
        - [Edit Note](#edit-note)
        - [Delete Note](#delete-note)
      - [Part Mutations](#part-mutations)
        - [Create Part](#create-part)
        - [Edit Part](#edit-part)
        - [Delete Part](#delete-part)
      - [Auth Mutations](#auth-mutations)
        - [Token Auth](#token-auth)
        - [Verify Token](#verify-token)
        - [Refresh Token](#refresh-token)
      - [Tag Mutations](#tag-mutations)
        - [Create Tag](#create-tag)
        - [Edit Tag](#edit-tag)
        - [Delete Tag](#delete-tag)
  - [Sendgrid](#sendgrid)
  - [Stripe](#stripe)
  - [Free vs Premium](#free-vs-premium)
  - [Design](#design)
    - [Original Wireframe](#original-wireframe)
    - [Extending the Wireframe](#extending-the-wireframe)
    - [Styles and Theming](#styles-and-theming)

## Tech Stack

### Frontend built using:

- React.js
- Material Design
- GraphQL & Apollo
- Netlify

Deployed [here](https://bestpos.netlify.com/)

### Backend built using:

- PostgresQL
- GraphQL & Graphene
- bcrypt
- Heroku

Deployed [here](https://dashboard.heroku.com/apps/labs7-posserver)

### Reasoning:

- React.js

  - We selected React as our frontend framework because we knew with the application we were planning on building, there were going to be a lot of reusable components all interacting with each other.

- Material Design

  - The styling of Material UI components has always appealed to our team, so we jump at any opportunity to integrate it into our varied projects. Our goal for this application was to be utilitarian without seeming as though we were making no effort on improving user experience, so Material UI just seemed like the good fit.

- GraphQL/Apollo Client

  - We made the decision early on to attempt to make this application with GraphQL instead of REST as none of the team had worked on a GraphQL project of this scale and we were all keen to learn what we could learn from being in the thick of it, as it were. We also realized that a lot of the data we would need from our server would be subject to change over time and that editing queries and mutations in GraphQL is a lot simpler than rewriting REST endpoints.

- Netlify

  - In a bid to reduce the number of independent variables at play in the application (as a lot of the decisions we made early on about tech stack choice were with the intent of learning a lot of new technology), we opted to deploy using a platform we had all independently been successful at deploying from at some point or another.

- PostgresQL

  - We chose a SQL database database because we felt that the necessary components of our application related to each other and would be best implemented in a relational database. We chose PostgresQL specifically because it was the backend support most recommended by Django, which we had already decided would be our backend framework, for its support of schemas.

- Django

  - We knew that with an application of this size and structure and with the intent to use GraphQL, we would be needing to check our data thoroughly and often. The built-in admin interface through Django was a big selling point in our decision to use Django, believing that it would save us a lot of time upfront due to the increased speed of testing.

- GraphQL

  - We knew that the models we were dealing with were very closely related to each other and that the way in which we wanted to display that data to users called for a lot of connected queries to the database. Using GraphQL in lieu of REST (while having an initial setup cost of having to make sense of the various documentation) has made a lot of the communication between client and server more efficient.

- Graphene

  - As we had made the decision to use GraphQL and Django, Graphene was kind of a necessary technology as it helped to bridge the gap between Django and GraphQL.

- Bcrypt

  - Django's default hashing algorithm is PBKDF2 but we were more familiar with bcrypt password hashing, having implemented it in every security-based project, so felt safer using it as our password hashing algorithm.

- Heroku
  - We chose Heroku for roughly the same reason we chose Netlify, with the addendum that we also wanted a deployment site that would interact well with a Postgres database.

---

# Security

### Authentication:

Authentication is being handled with the use of JSON Web Tokens through graphql_jwt.

### Authorization:

Authorization is handled on the model level, with each model query checking to see if the requesting party is anonymous, restricting access if they are, and filtering responses to limit access to only those items the particular requesting party has created.

### Form Validation

Form validation was done on this application through the use of Formik and yup. With yup, we were able to write our own schemas to validate our forms against and Formik did the validation logic and provided us with really informative error handling capabilities on all of our fields.

### OWASP Top 10 Application Security Risks 2017:

#### Injection

- Django querysets are protected from SQL injections as the query's SQL code is defined separately from its parameters and parameters are escaped by the underlying driver.

#### Broken Authentication

- Authentication is being managed through the use of JSON web tokens. On the front-end, the token is being saved to local storage and is then sent along with every header. As soon as a user without a token clicks on a link on the webpage which would initiate a query to the database, they are immediately logged out of the website and returned back to the sign-in page. The query they were in the process of sending never gets executed.

#### Sensitive Data Exposure

- All passwords are hashed and salted before being saved to the database.
- Password fields on the website are given 'password' as their input type in order to prevent those around a user from being able to see what they are inputting.
- Passwords are not a queryable field through our GraphQL queries or mutations
- Credit card information is being handled by Stripe and not directly by our backend server.

#### XML External Entities

- We are not using XML.

#### Broken Access Control

- Premium access is established through the use of a Boolean field on the User model. When a user makes a Stripe purchase, a mutation is sent to the backend server to change fields in the database accordingly. If the user clicked on the monthly option, the premium flag is set to True and the paid_until field is given the value of `timezone.now() + relativedelta(month=1)`. If the user clicked on the yearly option, the premium flag is set to True and the paid_until field is given the value of `timezone.now() + relativedelta(month=12)`.
- The value of the premium Boolean is then sent to the frontend where it is stored in local storage, allowing the user to access premium features without having to sign out of the application.

#### Security Misconfiguration

- We feel that this application is configured as well as we could think to make it. There are a number of different security middlewares in place to ensure that different attack risks are mitigated and we are not exposing more surface area than we feel we should be.
- We have made efforts to remove frameworks and packages that we were no longer actively using in the project as the project has progressed.

#### Cross-site Scripting

- Django templates implement character escaping to minimize the risk of cross-site-scripting.
  Characters escaped include: <br>
  < is converted to \&lt; <br>
  \> is converted to \&gt; <br>
  ' is converted to \&#39; <br>
  " is converted to \&quot; <br>
  & is converted to \&amp;

- In React, React DOM escapes any values embedded in JSX before render.

#### Insecure Deserialization

- We incorporated field validation to all forms where users would input data which ensures a strict type checking of the data being sent to the server. GraphQL queries and mutations also only accept valid types as described in their associated schemas.

#### Using Components with Known Vulnerabilities

- During the making of this application, Django 2.1.1 was found to have security vulnerabilities and we made it a point to upgrade to 2.1.2 as soon as it became available.

#### Insufficient Logging and Monitoring

- Queries from unauthorized users are not sent to the server as JSON webtokens are checked for before the sending of queries and mutations.
- All forms are validated and unable to be submitted with invalid data.
- If we had more time, we would implement better error and access logging. We had been logging http requests in the terminal and used DevTools in order to inspect network requests whenever testing the application.

### Additional Security Threats

#### CSRF

- It is our understanding that through storing our JWT on local storage, we are protecting against CSRF attacks and that the risk of doing so is that that token is then vulnerable to being accessed through cross-site-scripting. As we are protecting against cross-site-scripting, we feel as though this is an acceptable security decision.

#### Clickjacking

- We are making use of X-Frame-Options middleware to prevent our site from being rendered inside of a frame.

## Testing

This application was tested at every step in the development process manually through the use of the GraphiQL interface, the Django admin page, terminal logging, and Chrome DevTools. Testing was done by each contributor prior to each pull request to the Development branch and after each merge to ensure that no environment differences were negatively affecting the code.

We were continuously deploying to Netlify and Heroku and so had checks on every pull request to verify whether or not the code about to be merged would break the build.

All pull requests were reviewed by one or more team members and merged by someone other than the individual making the pull request (except in cases where all parties were in a Zoom and had agreed upon the merge).

Some tests were created and can be found in the `client/src/tests` folder.

## Improving Performance

We noticed that the amount of time the code took to compile was far greater than earlier projects we had worked on. In an attempt to improve the performance of the app and to speed up the rate at which we could test and integrate code, we did some research into code bloat.

We used the `react-loadable` package in order to code split by route. Any component not directly mounted to a view was then removed from the index.js file in the components folder and loaded asynchronously with the help of the Loadable component.

Though there were gains in performance with the use of code-splitting where it could be easily implemented, we still saw a significant size in one of the main chunks.

We then installed `source-map-explorer` in order to add an analyze script to our package.json in order to get a better sense of what was taking up the most real estate in our build.

It turned out that the majority of the size was @material-ui/icons. We had made the mistake of importing them as named imports rather than default imports and had accidentally been importing the entire icon library at each import instead of the one or two icons we had meant to import.

Changing the named imports to file-specific dynamic imports took our largest build size down from 578.34 KB to 258.53 KB and drastically improved compile time.

# Installation Instructions

### Environment Variables

In order to come up with a `SECRET_KEY`, enter a python shell and run this script:

```
import random
''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)') for i in range(50)])
```

Then take the value of that comamnd and assign it to the value of `SECRET_KEY`. For example: `SECRET_KEY='auhuayfgugafugdfudihaf7673r6tg7yufkjajgafghfa78fahfhfagaggagaaj'` - yes, I did just mash the keyboard <br><br>
`ALLOWED_HOSTS` is a comma separated list of domain names that the Django server can serve. <br>For example: `127.0.0.1, localhost, somerandomplace.net`<br><br>
`DEBUG` is a Boolean and can be either `True` or `False`<br><br>
`USER` is the name of a database user (string)<br><br>
`PASSWORD` is the password for said user (string)<br><br>
`PORT` is the port your database is running on - an example port can be found in `settings.py` in `POSserver`<br><br>
`DBNAME` is the name of the database you will use for this project<br><br>
`SENDGRID_API_KEY` is going to be the key you get after signing up for Sendgrid<br><br>
`EMAIL_HOST_USER` will be the email address you intend to be sending emails from (string)<br><br>
`CORS_ORIGIN_WHITELIST` will be a comma separated list similar to ALLOWED_HOSTS<br>

### Using the application

- You will need:
  - python 3.7
  - pipenv (recommended)
    - While it is possible to run this app without making use of pipenv, it is recommended in order to keep your dependency tree free from other packages that may have unforseen interactions.
  - Node
  - A package manager for Node (recommended)
    - This project was built using `yarn` commands and that is what the maintainers of this application would recommend if you would like to test or contribute to the project.
- Once you have those dependencies:
  - Fork and clone repo
  - Add environment variables to a `.env` folder at the root of the project folder. Please see [Environment Variables](#environment-variables) section for how to configure envrionment variables for this project. This file will be ignored by git unless you modify the .gitignore
  - Open a pipenv environment by typing `pipenv --three`
  - If your OS does not automatically open a pipenv shell, type `pipenv shell` in order to enter the newly created virtual environment
  - Type `pipenv install` in order to install dependencies for the backend server
  - Once the dependencies have been installed, `cd` into `POSserver` before typing `./manage.py migrate`
  - Type `./manage.py runserver` in order to start the Django server
  - If no errors have occurred, `cd ..` back out into the root directory and `cd` into `client`.
  - From there, run a `yarn` or `yarn install` command to install node_modules required for the project.
  - Type `yarn start` to start the React application.

# Contributing

If you would like to contribute to the project, please see our <a href=".github/CONTRIBUTING.md">Contributing Guidelines</a> which include issue templates for submitting <a href=".github/ISSUE_TEMPLATE/feature_request.md">feature requests</a>, <a href=".github/ISSUE_TEMPLATE/bug_report.md">bug fixes</a>, and a template for submitting <a href=".github/pull_request_template.md">pull requests</a>.

# Documentation

### Models

#### User Model

Using AbstractUser() to extend Django User in order to add fields to the User model without stepping on its toes. It is important to not accidentally duplicate fields already on the Django User model as that shifts the responsibility of password hashing and validation over to you. This model represents the user of the application.

Fields being used from Django User model:

```
- username
- password
- email
```

Fields added to the User model:

```
- first_name = models.CharField(max_length=30)
- last_name = models.CharField(max_length=150)
- street_address = models.CharField(max_length=100)
- city = models.CharField(max_length=70)
- state models.CharField(max_length=2, choices=state_choices)
- state choices = (
  ("AL", "Alabama"),
  ("AK", "Alaska"),
  ("AZ", "Arizona"),
  ("AR", "Arkansas"),
  ("CA", "California"),
  ("CO", "Colorado"),
  ("CT", "Connecticut"),
  ("DC", "District of Columbia"),
  ("DE", "Delaware"),
  ("FL", "Florida"),
  ("GA", "Georgia"),
  ("HI", "Hawaii"),
  ("ID", "Idaho"),
  ("IL", "Illinois"),
  ("IN", "Indiana"),
  ("IA", "Iowa"),
  ("KS", "Kansas"),
  ("KY", "Kentucky"),
  ("LA", "Louisiana"),
  ("ME", "Maine"),
  ("MD", "Maryland"),
  ("MA", "Massachusetts"),
  ("MI", "Michigan"),
  ("MN", "Minnesota"),
  ("MS", "Mississippi"),
  ("MO", "Missouri"),
  ("MT", "Montana"),
  ("NE", "Nebraska"),
  ("NV", "Nevada"),
  ("NH", "New Hampshire"),
  ("NJ", "New Jersey"),
  ("NM", "New Mexico"),
  ("NY", "New York"),
  ("NC", "North Carolina"),
  ("ND", "North Dakota"),
  ("OH", "Ohio"),
  ("OK", "Oklahoma"),
  ("OR", "Oregon"),
  ("PA", "Pennsylvania"),
  ("RI", "Rhode Island"),
  ("SC", "South Carolina"),
  ("SD", "South Dakota"),
  ("TN", "Tennessee"),
  ("TX", "Texas"),
  ("UT", "Utah"),
  ("VT", "Vermont"),
  ("VA", "Virginia"),
  ("WA", "Washington"),
  ("WV", "West Virginia"),
  ("WI", "Wisconsin"),
  ("WY", "Wyoming"),
  ("PR", "Puerto Rico"),
  ("VI", "Virgin Islands"),
  ("GU", "Guam"),
  )
- zipcode = models.CharField(max_length=10)
- business_name = models.CharField(max_length=100, null=True, blank=True, default="")
- modified_at = models.DateTimeField(auto_now=True))
- premium = models.BooleanField(default=False, blank=True, null=True))
- paid_until = models.DateTimeField(blank=True, null=True))
```

#### Client Model

Client model is the overarching model for contracts the user has. They may have several jobs under the same client, so there are jobs linked to the client model.

Fields on the Client model:

```
- user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
- business_name = models.CharField(max_length=100, null=True, blank=True, default="")
- first_name = models.CharField(max_length=100, default="")
- last_name models.CharField(max_length=100, default="")
- email = models.EmailField(max_length=70, default="")
- street_address = models.CharField(max_length=100, default="")
- city = models.CharField(max_length=70, default="")
- state = models.CharField(max_length=2, choices=state_choices)
- state_choices = (
        ("AL", "Alabama"),
        ("AK", "Alaska"),
        ("AZ", "Arizona"),
        ("AR", "Arkansas"),
        ("CA", "California"),
        ("CO", "Colorado"),
        ("CT", "Connecticut"),
        ("DC", "District of Columbia"),
        ("DE", "Delaware"),
        ("FL", "Florida"),
        ("GA", "Georgia"),
        ("HI", "Hawaii"),
        ("ID", "Idaho"),
        ("IL", "Illinois"),
        ("IN", "Indiana"),
        ("IA", "Iowa"),
        ("KS", "Kansas"),
        ("KY", "Kentucky"),
        ("LA", "Louisiana"),
        ("ME", "Maine"),
        ("MD", "Maryland"),
        ("MA", "Massachusetts"),
        ("MI", "Michigan"),
        ("MN", "Minnesota"),
        ("MS", "Mississippi"),
        ("MO", "Missouri"),
        ("MT", "Montana"),
        ("NE", "Nebraska"),
        ("NV", "Nevada"),
        ("NH", "New Hampshire"),
        ("NJ", "New Jersey"),
        ("NM", "New Mexico"),
        ("NY", "New York"),
        ("NC", "North Carolina"),
        ("ND", "North Dakota"),
        ("OH", "Ohio"),
        ("OK", "Oklahoma"),
        ("OR", "Oregon"),
        ("PA", "Pennsylvania"),
        ("RI", "Rhode Island"),
        ("SC", "South Carolina"),
        ("SD", "South Dakota"),
        ("TN", "Tennessee"),
        ("TX", "Texas"),
        ("UT", "Utah"),
        ("VT", "Vermont"),
        ("VA", "Virginia"),
        ("WA", "Washington"),
        ("WV", "West Virginia"),
        ("WI", "Wisconsin"),
        ("WY", "Wyoming"),
        ("PR", "Puerto Rico"),
        ("VI", "Virgin Islands"),
        ("GU", "Guam"),
    )
- zipcode = models.CharField(max_length=10)
- created_at = models.DateTimeField(auto_now_add=True)
- modified_at = models.DateTimeField(auto_now=True)
- deadline = models.DateField(blank=True, null=True)
```

#### Job Model

We envision jobs to be broken down pieces of contracts that may have different deadlines and requirements than each other.

Fields on the Job model:

```
- user = models.ForeignKey(settings.AUTH_USER, on_delete=models.CASCADE)
- client = models.ForeignKey(Client, on_delete=models.CASCADE)
- name = models.CharField(max_length=200)
- complete = models.BooleanField(default=False)
- labor = models.DecimalField(decimal_places=2, max_digits=5, null=True)
- description = models.TextField(null=True)
- created_at = models.DateTimeField(auto_now_add=True)
- modified_at = models.DateTimeField(auto_now=True)
- deadline = models.DateField(blank=True, null=True)
```

#### Part Model

Parts are things that can be added to a job to further describe the work being completed and are what combine to allow us to form an invoice for the user.

Fields on the Part Model:

```
- user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
- job = models.ForeignKey(Job, on_delete=models.CASCADE)
- name = models.CharField(max_length=100)
- description = models.TextField()
- cost = models.DecimalField(decimal_places=2, max_digits=15)
```

#### Note Model

The ability for our users to add notes to jobs, clients, and in general (attached to no other model).

Fields on the Note Model:

```
- user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
- client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
- job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True, blank=True)
- title = models.CharField(max_length=200)
- content = models.TextField()
- created_at = models.DateTimeField(auto_now_add=True)
- modified_at = models.DateTimeField(auto_now=True)
```

#### Tag Model

NOT CURRENTLY IMPLEMENTED

- Included in documentation in the hope that a contributor in the future makes use of it

- user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
- job = models.ForeignKey("Job", on_delete=models.CASCADE, blank=True, null=True)
- note = models.ForeignKey("Note", on_delete=models.CASCADE, blank=True, null=True)
- part = models.ForeignKey("Part", on_delete=models.CASCADE, blank=True, null=True)
- name = models.CharField(max_length=128)
- description = models.TextField(blank=True)
- created_at = models.DateTimeField(auto_now_add=True)
- modified_at = models.DateTimeField(auto_now=True)

## GraphQL

### Queries

#### On User Model:

- user(id: ID!) query will search for a single id and return the client with that id (can also return clientSet, jobSet, noteSet, tagSet, and partSet - so edge/node returns of associated items(which can be filtered))
- allUsers query will return all users (this is for our testing, not for the frontend - filtering by logged in user will be in place after testing)

#### On Client Model:

- client(id: ID!) query will search for a single id and return the client with that id(can also return jobSet and noteSet - so edge/node returns of associated items (which can be filtered))
- allClients query will return all clients for the logged in User

#### On Job Model:

- job(id: ID!) query will search for a single id and return the job with that id(can also return noteSet, tagSet, and partSet - so edge/node returns of associated items (which can be filtered))
- allJobs query will return all jobs for the logged in User

#### On Note Model:

- note(id: ID!) query will search for a single id and return the note with that id (can also return tagSet)
- allNotes query will return all notes for the logged in User

#### On Part Model:

- part(id: ID!) query will search for a single id and return the part with that id (can also return jobSet and tagSet)
- allParts query will return all parts for the logged in User

### Mutations:

#### User Mutations:

##### Create User

```
const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $email: String!
    $businessName: String
    $city: String!
    $firstName: String!
    $lastName: String!
    $state: String!
    $streetAddress: String!
    $zipcode: String!
  ) {
    createUser(
      username: $username
      password: $password
      email: $email
      businessName: $businessName
      city: $city
      firstName: $firstName
      lastName: $lastName
      state: $state
      streetAddress: $streetAddress
      zipcode: $zipcode
    ) {
      user {
        id
      }
      token
    }
  }
`;
```

##### Edit User

```
const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String
    $newPassword: String
    $oldPassword: String
    $email: String
    $firstName: String
    $lastName: String
    $businessName: String
    $streetAddress: String
    $city: String
    $state: String
    $zipcode: String
    $subscription: String
  ) {
    updateUser(
      id: $id
      username: $username
      newPassword: $newPassword
      oldPassword: $oldPassword
      email: $email
      firstName: $firstName
      lastName: $lastName
      businessName: $businessName
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipcode: $zipcode
      subscription: $subscription
    ) {
      user {
        id
        __typename
      }
      __typename
    }
  }
`;
```

##### Delete User

```
const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      status
    }
  }
`;
```

#### On Client Model:

##### Create Client

```
const CREATE_CLIENT = gql`
  mutation createClient(
    $businessName: String
    $firstName: String!
    $lastName: String!
    $email: String!
    $streetAddress: String!
    $city: String!
    $state: String!
    $zipcode: String!
    $deadline: Date
  ) {
    createClient(
      businessName: $businessName
      firstName: $firstName
      lastName: $lastName
      email: $email
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipcode: $zipcode
      deadline: $deadline
    ) {
      client {
        id
      }
    }
  }
`;
```

##### Edit Client

```
const UPDATE_CLIENT = gql`
  mutation updateClient(
    $id: ID!
    $businessName: String
    $firstName: String
    $lastName: String
    $email: String
    $streetAddress: String
    $city: String
    $state: String
    $zipcode: String
    $deadline: Date
  ) {
    updateClient(
      id: $id
      businessName: $businessName
      firstName: $firstName
      lastName: $lastName
      email: $email
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipcode: $zipcode
      deadline: $deadline
    ) {
      client {
        id
      }
    }
  }
`;
```

##### Delete Client

```
const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      ok
    }
  }
`;
```

#### Job Mutations:

##### Create Job

```
const CREATE_JOB = gql`
  mutation createJob(
    $client: ID!
    $name: String!
    $labor: Float
    $description: String!
    $deadline: Date
    $complete: Boolean
  ) {
    createJob(
      client: $client
      name: $name
      labor: $labor
      description: $description
      deadline: $deadline
      complete: $complete
    ) {
      job {
        name
      }
    }
  }
`;
```

##### Edit Job

```
const UPDATE_JOB = gql`
  mutation updateJob(
    $id: ID!
    $name: String
    $labor: Float
    $description: String
    $deadline: Date
    $complete: Boolean
  ) {
    updateJob(
      id: $id
      name: $name
      labor: $labor
      description: $description
      deadline: $deadline
      complete: $complete
    ) {
      job {
        name
        id
      }
    }
  }
`;
```

##### Delete Job:

```
const DELETE_JOB = gql`
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id) {
      ok
    }
  }
`;
```

#### Note Mutations:

##### Create Note

```
const CREATE_NOTE = gql`
  mutation createNote(
    $client: ID
    $content: String!
    $job: ID
    $title: String!
  ) {
    createNote(client: $client, content: $content, job: $job, title: $title) {
      note {
        id
      }
    }
  }
`;
```

##### Edit Note

```
const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $content: String, $title: String) {
    updateNote(id: $id, content: $content, title: $title) {
      note {
        id
      }
    }
  }
`;
```

##### Delete Note

```
const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id) {
      ok
    }
  }
`;
```

#### Part Mutations

##### Create Part

```
const CREATE_PART = gql`
  mutation createPart(
    $cost: Float!
    $description: String!
    $name: String!
    $job: ID!
  ) {
    createPart(cost: $cost, name: $name, description: $description, job: $job) {
      part {
        id
      }
    }
  }
`;
```

##### Edit Part

```
const UPDATE_PART = gql`
  mutation(
    $cost: Float
    $description: String
    $id: ID!
    $job: ID
    $name: String
  ) {
    updatePart(
      cost: $cost
      description: $description
      id: $id
      job: $job
      name: $name
    ) {
      part {
        id
      }
    }
  }
`;
```

##### Delete Part

```
mutation deletePart($id: ID!) {
deletePart(id: $id) {
ok
const DELETE_PART = gql`
  mutation deletePart($id: ID!) {
    deletePart(id: $id) {
      ok
    }
  }
`;
```

#### Auth Mutations

##### Token Auth

```
tokenAuth(username: String!, password: String!) {
  token
  user {
    id
  }
}
```

##### Verify Token

```
verifyToken(token: String!) {
  payload
}
```

##### Refresh Token

```
refreshToken(token: String!) {
  payload
}
```

#### Tag Mutations

NOT CURRENTLY IMPLEMENTED

- If any contributor in the future would like to make use of them, we would welcome the contribution!

##### Create Tag

```
const CREATE_TAG = gql`
  mutation createTag(
    $job: ID
    $note: ID
    $part: ID
    $name: String!
    $description: String
  ) {
    createTag(
      job: $job
      note: $note
      part: $part
      name: $name
      description: $description
    ) {
      tag {
        id
      }
    }
  }
`;
```

##### Edit Tag

```
const UPDATE_TAG = gql`
  mutation updateTag(
    $id: ID!
    $job: ID
    $note: ID
    $part: ID
    $name: String
    $description: String
  ) {
    updateTag(
      id: $id
      job: $job
      note: $note
      part: $part
      name: $name
      description: $description
    ) {
      tag {
        id
      }
    }
  }
`;
```

##### Delete Tag

```
const DELETE_TAG = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id) {
      ok
    }
  }
`;
```

## Sendgrid

This application integrates with the Sendgrid API so that when a user signs up for an account, an email is sent to the email address they provided welcoming them to Contract Alchemy.

This logic can be found in the User.py file in the models folder of server:

```
    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def welcome_mail(sender, instance, **kwargs):
        if kwargs["created"]:
            # model = get_user_model()
            user_email = instance.email
            sg = sendgrid.SendGridAPIClient(apikey=config("SENDGRID_API_KEY"))
            from_email = Email("nphillip78@gmail.com")
            to_email = Email(user_email)
            subject = "Welcome to contractAlchemy!"
            content = Content(
                "text/plain",
                "contractAlchemy is a tool that organizes your clients, jobs, parts, and invoices all in one place.\n\
                Premium users gain access to all of our features with an unlimited number of records.\n\
                Premium membership also includes the ability to select different themes for the website layout.\n\
                Our free membership includes access to all features for up to 8 records at a time.\n\
                You can upgrade to premium at any time.",
            )
            mail = Mail(from_email, subject, to_email, content)
            sg.client.mail.send.post(request_body=mail.get())
```

## Stripe:

We are using Stripe in order to accept payments from users of the application. We are utilizing `react-checkout` in order to accomplish this feat. When the user completes checkout, a request is then sent to the server with updateUser mutation and the type of subscription the user selected. The updateUser mutation then changes the user's premium status Boolean to true and sets their paid_until field to the specified time from the moment they made the purchase (either a month or year from the current time).

## Free vs Premium

Free users of the application are allowed to create eight items of a given type at any one time.

Premium plans cost .99c for monthly and $9.99 for an entire year. The perks of such a membership include unlimited creation privileges and the ability to change the themes on the application. We are constantly adding new themes for users to choose from and are excited to offer this as a perk!

## Design:

<details>
<summary> <b> Original Wireframe (click to view):</b>
</summary>

<h2 align="center">
  Landing Page:
</h2>

![LandingPageWireframe](/client/page_layout/LandingPageWireframe.png)

<h2 align="center">
  Job View:
</h2>

![JobViewWireframe](/client/page_layout/JobViewWireframe.png)

<h2 align="center">
  Add a job:
</h2>

![AddJobWireframe](/client/page_layout/AddJobWireframe.png)

<h2 align="center">
  Jobs View:
</h2>

![JobsViewWireframe](/client/page_layout/JobsViewWireframe.png)

<h2 align="center">
  Job View:
</h2>

![JobView2Wireframe](/client/page_layout/JobViewWireframe2.png)

<h2 align="center">
  Job Edit Modal:
</h2>

![JobEditModalWireframe](/client/page_layout/JobEditModalWireframe.png)

<h2 align="center">
  Billing:
</h2>

![BillingWireframe](/client/page_layout/BillingWireframe.png)

<h2 align="center">
  Settings:
</h2>

![SettingsWireframe](/client/page_layout/SettingsWireframe.png)

</details>
<br>
<details>
<summary> <b>Extending the Wireframe (click to view):</b>

</summary>

<h2 align="center">
  Home Page:
</h2>

![Home](/client/page_layout/HomeScreen.png)

<h2 align="center">
  Client Creation:
</h2>

![ClientCreation](/client/page_layout/ClientCreation.png)

<h2 align="center">
  Client Edit:
</h2>

![ClientEdit](/client/page_layout/ClientEdit.png)

<h2 align="center">
  Clients Page:
</h2>

![ClientsPage](/client/page_layout/ClientPage.png)

<h2 align="center">
  Client View:
</h2>

![ClientView](/client/page_layout/ClientView.png)

<h2 align="center">Job Creation:
</h2>

![JobCreation](/client/page_layout/JobCreation.png)

<h2 align="center">
  Job Edit:
</h2>

![JobEdit](/client/page_layout/JobEdit.png)

<h2 align="center">
  Jobs Page:
</h2>

![JobsPage](/client/page_layout/JobsPage.png)

<h2 align="center">
  Job View:
</h2>

![JobView](/client/page_layout/JobView.png)

<h2 align="center">
  Note Creation:
</h2>

![NoteCreation](/client/page_layout/NoteCreation.png)

<h2 align="center">
  Notes Page:
</h2>

![NotesPage](/client/page_layout/NotesPage.png)

<h2 align="center">
  Note View and Edit:
</h2>

![NoteViewAndEdit](/client/page_layout/NoteViewAndEdit.png)

<h2 align="center">
  Part Creation:
</h2>

![PartCreation](/client/page_layout/PartCreation.png)

<h2 align="center">
  Parts Page:
</h2>

![PartsPage](/client/page_layout/PartsPage.png)

<h2 align="center">
  Part View and Edit:
</h2>

![PartViewAndEdit](/client/page_layout/PartViewAndEdit.png)

<h2 align="center">Settings Page:</h2>

![SettingsPage](/client/page_layout/SettingsPage.png)

<h2 align="center">Billing:</h2>

![Billing](/client/page_layout/Billing.png)

</details>

### Styles and Theming

This project uses the Material Ui theme provider which cascades the defined theme down to all material ui components.

The theme choice is saved on localstorage and localstorage is checked for a theme choice on reload.
