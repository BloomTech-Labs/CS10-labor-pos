<pre><h1 align="center">CS10-Labor POS</h1>
<img src="client/page_layout/smallraccoon.svg"/></pre>

<div align="center"><h2>Brought to you by:</h2>

<a href="https://github.com/wajnurfes">Zach Campbell</a>

<a href="https://github.com/nphillips78">Cole Phillips</a>

<a href="https://github.com/AmyShackles">Amy Shackles</a>

</div>

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
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
- Node
- bcrypt
- Heroku

Deployed [here](https://dashboard.heroku.com/apps/labs7-posserver)

---

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

# Installation Instructions

- Coming soon to a README near you!
