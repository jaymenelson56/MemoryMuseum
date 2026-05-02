# Memory Museum

In the future, A.I. will run everything, and the things we enjoy will be a distant memory. With this Memory Museum application we can turn our collections of everything we enjoy about this century, and perfectly preserve it online with a description of what it meant to us, to give the future a peek into the window of our lives back then. This museum will house exhibits that will demonstrate what objects of our time mean to us. Registered users can...

* View the various exhibits
* View the various items within the exhibit
* Create their own exhibit
* Submit items to other users' exhibits
* Approve/Reject items submitted to their exhibit
* Delete their own exhibits
* Upload their own items
* Edit their own items
* Delete their own Items
* Rate other users Exhibits
* View the average rating of your exhibit

As an Admin you can do all this plus...

* Deactivate active users and reactivate deactivated users
* View list of deactivated users
* View and manage reports made by other users
* Manage your team of moderators with other Administrators

## Prerequisites

Make sure the following are installed on your machine before continuing:

| Tool | Download |
|------|----------|
| VSCode | [code.visualstudio.com](https://code.visualstudio.com/) |
| pgAdmin 4 | [pgadmin.org/download](https://www.pgadmin.org/download/) |
| Git | [git-scm.com/downloads](https://git-scm.com/downloads) |
| PostgreSQL | [postgresql.org/download](https://www.postgresql.org/download/) |
| .NET 8 SDK | [dotnet.microsoft.com/download/dotnet/8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) |
| Node.js (includes npm) | [nodejs.org/en/download](https://nodejs.org/en/download) |

## How to Install

1. Open your terminal and clone the repository: `git clone git@github.com:jaymenelson56/MemoryMuseum.git`
2. Navigate into the project directory and run `dotnet user-secrets init`
3. Install the Entity Framework CLI tools: `dotnet tool install --global dotnet-ef`
4. Run `dotnet user-secrets set MusuemMemoryDbConnectionString "Host=localhost;Port=5432;Username=postgres;Password=<your password>;Database=MuseumMemory"` — replace `<your password>` with your PostgreSQL password
5. Run `dotnet user-secrets set AdminPassword password` to set the first two accounts' password to "password" (change it to whatever you prefer)
6. Run `dotnet ef migrations add InitialCreate`
7. Run `dotnet ef database update`
8. Run `code .` inside the MemoryMuseum directory to open it in VSCode
9. Navigate to the Run and Debug menu in VSCode and make sure **.NET Core** is selected as your debugger
10. Run the debugger
11. In a new terminal, `cd` into the `client` folder and run `npm run dev`
12. Once in, follow the prompts, register, and enjoy the site
