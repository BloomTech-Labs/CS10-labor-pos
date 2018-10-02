<h1 align="center">
CS10-Labor POS
</h1>

<div align="center"> <img src="client/public/goldraccoon.png" alt="License:This icon is provided by Tae S. Yang as Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International" title="License:This icon is provided by Tae S. Yang as Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International"/></div>

<div align="center">
<h2>Brought to you by:</h2><br>

<a href="https://github.com/wajnurfes">Zach Campbell</a>

<a href="https://github.com/nphillips78">Cole Phillips</a>

<a href="https://github.com/AmyShackles">Amy Shackles</a>

## </div>

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
  - [Frontend Built Using](#frontend-built-using)
  - [Backend Built Using](#backend-built-using)
  - [Reasoning](#reasoning)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Security](#security)
- [Rough Page Layout](#rough-page-layout)
  - [Home Page](#home-page)
  - [Client Views](#client-views)
  - [Invoice Pages](#invoice-pages)
  - [Job Views](#job-views)
  - [Note Views](#note-views)
  - [Part Views](#part-views)
  - [Tag Views](#tag-views)
  - [Settings](#settings)
  - [Billing](#billing)
- [Models](#models)
  - [User Model](#user-model)
  - [Client Model](#client-model)
  - [Job Model](#job-model)
  - [Part Model](#part-model)
  - [Note Model](#note-model)
  - [Tag Model](#tag-model)
- [Queries](#queries)
  - [On User Model](#on-user-model)
  - [On Client Model](#on-client-model)
  - [On Job Model](#on-job-model)
  - [On Note Model](#on-note-model)
  - [On Part Model](#on-part-model)
  - [On Tag Model](#on-tag-model)
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
  - [Tag Mutations](#tag-mutations)
    - [Create Tag](#create-tag)
    - [Edit Tag](#edit-tag)
    - [Delete Tag](#delete-tag)
  - [Auth Mutations](#auth-mutations)
    - [Token Auth](#token-auth)
    - [Verify Token](#verify-token)
    - [Refresh Token](#refresh-token)
  - [Styles and Theming](#styles-and-theming)
    - [Light and Dark Themes](#light-and-dark-themes)

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

  - We selected React as our frontend framework because we knew with the application we were planning on building, there were going to be a lot of reusable components all interacting with each other. We had initially thought that the way that the application would need to be built, there would not be a high need for a global shared state within the application. If we needed to make use of a more globally available state, we reasoned, we could just pull in from the new context API. If we were to start the project from scratch, we might think a little longer on the decision of whether or not to implement Redux.

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

  - Django's default hashing algorithm is PBKDF2 but we were more familiar with bcrypt password hashing, having implemented it it every security-based project, so felt safer using it as our password hashing algorithm.

- Heroku
  - We chose Heroku for roughly the same reason we chose Netlify, with the addendum that we also wanted a deployment site that would interact well with a Postgres database.

---

# Authentication:

Authentication is being handled with the use of JSON Web Tokens through graphql_jwt.

# Authorization:

Authorization is handled on the model level, with each model query checking to see if the requesting party is anonymous, restricting access if they are, and filtering responses to limit access to only those items the particular requesting party has created.

# Security:

- Work on security is ongoing.

# Rough Page Layout (click to view):

<details>
<summary>

## Home Page:</summary>

![Home](/client/page_layout/HomeScreen.png)

</details>

<details>
<summary>

## Client Views:

</h2></summary>
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

</details>

<details>
<summary>

## Invoice Pages:

</h2></summary>

![Invoices](/client/page_layout/InvoicesPage.png)

<h2 align="center">
  Invoice View:
</h2>

![InvoiceView](/client/page_layout/InvoiceView.png)

</details>

<details>
<summary>

## Job Views:

</summary>

<h2 align="center">Creation:
</h2>

![JobCreation](/client/page_layout/JobCreation.png)

<h2 align="center">
  Job Edit:
</h2>

![JobEdit](/client/page_layout/JobEdit.png)

<h2 align="center">
  Jobs Page (click to view):
</h2>

![JobsPage](/client/page_layout/JobsPage.png)

<h2 align="center">
  Job View (click to view):
</h2>

![JobView](/client/page_layout/JobView.png)

</details>

<details>
<summary>

## Note Views:

</summary>
<h2 align="center">
  Note Creation:
</h2>

![NoteCreation](/client/page_layout/NoteCreation.png)

<h2 align="center">
  Notes Page (click to view):
</h2>

![NotesPage](/client/page_layout/NotesPage.png)

<h2 align="center">
  Note View and Edit (click to view):
</h2>

![NoteViewAndEdit](/client/page_layout/NoteViewAndEdit.png)

</details>

<details>
<summary>

## Part Views:

</summary>

<h2 align="center">
  Part Creation:
</h2>

![PartCreation](/client/page_layout/PartCreation.png)

<h2 align="center">
  Parts Page (click to view):
</h2>

![PartsPage](/client/page_layout/PartsPage.png)

<h2 align="center">
  Part View and Edit (click to view):
</h2>

![PartViewAndEdit](/client/page_layout/PartViewAndEdit.png)

</details>

<details>
<summary>

## Tag Views:

</summary>

<h2 align="center">
  Tag Creation (click to view):
</h2>

![TagCreation](/client/page_layout/TagCreation.png)

<h2 align="center">
  Tags Page (click to view):
</h2>

![TagsPage](/client/page_layout/TagsPage.png)

<h2 align="center">
  Tag View and Edit (click to view):
</h2>

![TagViewAndEdit](/client/page_layout/TagViewAndEdit.png)

</details>

<details><summary>

## Settings:

</summary>

<h2 align="center">Settings Page:</h2>

![SettingsPage](/client/page_layout/SettingsPage.png)

</details>
<details><summary>

## Billing:

</summary>

<h2 align="center">Billing:</h2>

![Billing](/client/page_layout/Billing.png)

</details>

## Models

### User Model

Using AbstractUser() to extend Django User in order to add fields to the User model without stepping on its toes. This model represents the user of the application.

Fields being used from Django User model:

```
- username
- password
- email
```

Fields added to the User model:

```
- first_name (CharField(max_length=30))
- last_name (CharField(max_length=150))
- street_address (CharField(max_length=100))
- city (CharField(max_length=70))
- state (CharField(max_length=50, choices=state_choices))
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
- zipcode (CharField(max_length=10))
- business_name (CharField(max_length=100, null=True, blank=True, default=""))
- modified_at (DateTimeField(auto_now=True))
- premium = (BooleanField(default=False, blank=True, null=True))
- paid_until = (DateTimeField(blank=True, null=True))
```

### Client Model

Client model is the overarching model for contracts the user has. They may have several jobs under the same client, so there are jobs linked to the client model.

Fields on the Client model:

```
- user (ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE ))
- business_name (CharField(max_length=100, null=True, blank=True, default=""))
- first_name (CharField(max_length=100, default=""))
- last_name (CharField(max_length=100, default=""))
- email = EmailField(max_length=70, default="")
- street_number = CharField(max_length=10, default="")
- unit_number = CharField(max_length=10, null=True, blank=True, default="")
- street_name = CharField(max_length=100, default="")
- city = CharField(max_length=70, default="")
- state = CharField(max_length=2, choices=state_choices)
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
- zipcode = CharField(max_length=10)
- created_at = DateTimeField(auto_now_add=True)
- modified_at = DateTimeField(auto_now=True)
- deadline = DateField(blank=True, null=True)
```

### Job Model

We envision jobs to be broken down pieces of contracts that may have different deadlines and requirements than each other.

Fields on the Job model:

```
- user = ForeignKey(settings.AUTH_USER, on_delete=models.CASCADE)
- client = ForeignKey(Client, on_delete=models.CASCADE)
- name = CharField(max_length=200)
- description = TextField(null=True)
- complete = BooleanField(default=False)
- labor = DecimalField(decimal_places=2, max_digits=5, null=True)
- created_at = DateTimeField(auto_now_add=True)
- modified_at = DateTimeField(auto_now=True)
- deadline = DateField(blank=True, null=True)
```

### Part Model

Parts are things that can be added to a job to further describe the work being completed and are what combine to allow us to form an invoice for the user.

Fields on the Part Model:

```
- user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
- job = ForeignKey(Job, on_delete=models.CASCADE)
- name = CharField(max_length=100)
- description = TextField()
- cost = DecimalField(decimal_places=2, max_digits=5)
```

### Note Model

The ability for our users to add notes to jobs and clients.

Fields on the Note Model:

```
- user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
- client = ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
- job = ForeignKey(Job, on_delete=models.CASCADE, null=True, blank=True)_
- title = CharField(max_length=200)
- content = TextField()
- created_at = DateTimeField(auto_now_add=True)
- modified_at = DateTimeField(auto_now=True)
```

### Tag Model

The ability to add a tag to a note, client, part, or job - our plans are to enable searching by tag if time allows.

Fields on the Tag Model:

```
- user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
- job = ForeignKey(Job, on_delete=models.CASCADE, blank=True, null=True)
- note = ForeignKey(Note, on_delete=models.CASCADE, blank=True, null=True)
- part = ForeignKey(Part, on_delete=models.CASCADE, blank=True, null=True)
- name = CharField(max_length=128)
- description = TextField(blank=True)
- created_at = DateTimeField(auto_now_add=True)
- modified_at = DateTimeField(auto_now=True)
```

## Queries

### On User Model:

- user(id: ID!) query will search for a single id and return the client with that id (can also return clientSet, jobSet, noteSet, tagSet, and partSet - so edge/node returns of associated items(which can be filtered))
- allUsers query will return all users (this is for our testing, not for the frontend - filtering by logged in user will be in place after testing)

### On Client Model:

- client(id: ID!) query will search for a single id and return the client with that id(can also return jobSet and noteSet - so edge/node returns of associated items (which can be filtered))
- allClients query will return all clients for the logged in User

### On Job Model:

- job(id: ID!) query will search for a single id and return the job with that id(can also return tagSet, noteSet, and partSet - so edge/node returns of associated items (which can be filtered))
- allJobs query will return all jobs for the logged in User

### On Note Model:

- note(id: ID!) query will search for a single id and return the note with that id (can also return tagSet)
- allNotes query will return all notes for the logged in User

### On Part Model:

- part(id: ID!) query will search for a single id and return the part with that id (can also return associated jobs and associated tags
- allParts query will return all parts for the logged in User

### On Tag Model:

- tag(id: ID!) query will search for a single id and return the tag with that id (can also return associated jobs, notes, and parts)
- allTags query will return all tags for the logged in User

## Mutations:

### User Mutations:

#### Create User:

```
createUser(username: String!, password: String!, email: String!, businessName: String, city: String!, firstName: String!, lastName: String!, streetAddress: String!, city: String!, state: String!, zipcode: String!) {
  user {
    id
  }
}
```

- updateUser (WIP)
- premiumMonthly (WIP)
- premiumYearly (WIP)
- deleteUser (WIP)

### On Client Model:

#### Create Client:

```
createClient(businessName: String, firstName: String!, lastName: String!, streetNumber: String!, unitNumber: String!, streetName: String!, city: String!, state: String!, zipcode: String!, deadline: Date) {
  client {
    // Whatever arguments the client wants to receive from the mutation
  }
}
```

#### Update Client:

```
updateClient(id: ID!, businessName: String, firstName: String, lastName: String, streetNumber: String, unitNumber: String, streetName: String, city: String, state: String, zipcode: String, deadline: Date) {
  client {
    // Whatever arguments the client wants to receive from the mutation
  }
}
```

#### Delete Client:

```
deleteClient(id: ID!) {
  status {
    // should return "{first_name} {last_name} deleted"
  }
}
```

### Job Mutations:

#### Create Job:

```
createJob(client: ID!, labor: Float, name: String!, description: String, deadline: Date, complete: Boolean) {
  job {
    // whatever arguments client wants to receive from the mutation
  }
}
```

#### Update Job:

```
updateJob(id: ID!, client: ID!, labor: Float, name: String!, description: String, deadline: Date, complete: Boolean) {
  job {
    // whatever arguments client wants to receive from the mutation
  }
}
```

#### Delete Job:

```
deleteJob(id: ID!) {
  status {
    // should return "{name} deleted"
  }
}
```

### Note Mutations:

#### Create Note:

```
createNote(client: ID, job: ID, title: String!, content: String!) {
  note {
    // whatever arguments client wants to receive from mutation
  }
}
```

#### Update Note:

```
updateNote(id: ID!, title: String, content: String) {
  note {
    // whatever arguments client wants to receive from mutation
  }
}
```

#### Delete Note:

```
deleteNote(id: ID!) {
  status {
    // should return "{title} deleted"
  }
}
```

### Part Mutations

#### Create Part:

```
createPart(job: ID!, name: String!, description, cost: Float) {
  part {
    // whatever arguments client wants from mutation
  }
}
```

#### Edit Part:

WIP

#### Delete Part:

WIP

### Tag Mutations

#### Create Tag:

```
createTag(job: ID, note: ID, part: ID, name: String!, description: String) {
  tag {
    // whatever arguments client wants from mutation
  }
}
```

#### Edit Tag:

WIP

#### Delete Tag:

WIP

### Auth Mutations

#### Token Auth

```
tokenAuth(username: String!, password: String!) {
  token
}
```

#### Verify Token

```
verifyToken(token: String!) {
  payload
}
```

#### Refresh Token

```
refreshToken(token: String!) {
  payload
}
```

# Styles and Theming

This project uses the Material Ui theme provider which cascades the defined theme down to all material ui components.
Theme can be viewed and edited in App.js

## Light and Dark Themes

Once logged in, the user can click a switch in the sidenav to switch between a light colored and dark colored theme.
The theme choice is saved on localstorage and localstorage is checked for a theme choice on reload.

# Installation Instructions

- Coming soon to a README near you!
