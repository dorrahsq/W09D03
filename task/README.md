# TodoList (React and Express)
Todo-List made In React and Node.js/Express with CRUD Functionality

## Table of Contents
1. [ User Stories. ](#userStor)
2. [ Admin Stories. ](#adminSto)
3. [ Frontend UML diagrm.](#frontUml)
4. [ Frontend Routes. ](#frontRoutes)
5. [ Backend ER diagrm.](#erb)
6. [ Backend UML diagrm.](#umlb)
7. [ Backend Models.  ](#backM)
8. [ Backend Routes.  ](#backR)




<a name="userStor"></a>
## User Stories
- Signup
- Login
- View your tasks
- Add a new task
- Update task
- Delete task
- Complete/Incomplete task

<a name="adminSto"></a>
## Admin Stories
- Login
- View all of the tasks for any user
- Delete users
- Add a new task for any user
- Update any task for any user
- Delete any task for any user
- View your tasks
- Add a new task
- Update task
- Delete task
- Complete/Incomplete task


## Frontend

<a name="frontUml"></a>
### UML diagrm:
![todos front UML drawio](https://user-images.githubusercontent.com/92247950/145228507-f4514d16-9471-4dbc-9f08-7216210da40a.png)


<a name="frontRoutes"></a>
### Routes
Component     |     Path      |  Permissions
------------- | -----------   | ------------
Login         | `/`           | everyone
SignUp        | `/signup`     | everyone
Home          | `/home`       | user + admin 
Users         | `/usres`      | admin only 
OneUser       | `/user/:id`   | admin only 

<a name="backM"></a>
## Backend

<a name="erb"></a>
### ER diagrm:
![todos ER drawio](https://user-images.githubusercontent.com/92247950/145214988-71c9bbc8-308c-4220-9f9f-da9cfc3cd89e.png)

<a name="umlb"></a>
### UML diagrm:
![todos UML drawio](https://user-images.githubusercontent.com/92247950/145215049-bf23d078-ff2b-4cd0-8dda-ed1fe79348a1.png)


### Models:
#### - Role model 
```
{
  role: { type: String, required: true },
  permissions: { type: Array, required: true },
}
```
#### - User model 
```
{
  email: { type: String, required: true, unique: true, validate: { validator: validator.isEmail, message: "{VALUE} is not a valid email"}},
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }
}
```
#### - Task model 
```
{
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
}
```
<a name="backR"></a>
### Routes
HTTP Method   | authorize     |    Path           |  Request Body         
------------- | -----------   | ------------      |---------------------- 
POST          | everyone      |`/user/create`     |{email, password, role}
POST          | everyone      |`/user/log`        |{email, password }     
GET           | admin only    |`/user/`           |                       
DELETE        | admin only    |`/user/`           |                       
GET           | admin + user  |`/task/:id`        | 
POST          | admin + user  |`/task/create`     |{user, name}
PUT           | admin + user  |`/task/update`     |{id, newName}
PUT           | admin + user  |`/task/delete`     |{id}
PUT           | admin + user  |`/task/complete`   |{id}
PUT           | admin + user  |`/task/inComplete` |{id}

