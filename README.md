## Memory Museum

In the future, A.I. will run everything, and the things we enjoy will be a distant memory. With this Memory Museum application we can turn our collections of everything we enjoy about this century, and perfectly preserve it online with a description of what it meant to us, to give the future a peek into the window of our lives back then. This museum will house exhibits that will demonstrate what objects of our time mean to us.  As a registered user you can...

* View the various exhibits
* View the various items within the exhibit
* Create their own exhibit
* Delete their own exhibits
* Upload their own items
* Edit their own items
* Delete their own Items
* Rate other users Exhibits
* View the average rating of your exhibit

## How to install
To install follow the steps below
1. Make sure bot VSCode and pgAdmin4 are installed on your machine.
1. To pull this on your machine, open your terminal, and use the command "git clone git@github.com:jaymenelson56/MemoryMuseum.git"
1. Run "dotnet user-secrets init"
1. Run "dotnet user-secrets set MusuemMemoryDbConnectionString "Host=localhost;Port=5432;Username=postgres;Password=<your password>;Database=MuseumMemory", instead of "<your password> enter your postgres password
1. Run "dotnet user-secrets set AdminPassword password" to set the first two accounts' password as "password", feel free to change it to whatever you please
1. Run "dotnet ef migrations add InitialCreate" in your terminal.
1. Run  "dotnet ef database update" in your terminal.
1. Run "code ." inside the MemoryMuseum directory
1. navgiate to the run and debug menu in vscode and make sure .NET Core is selected as your debugger.
1. Run the debugger.
1. In your terminal cd into the client folder.
1. Run npm run dev in your terminal.
1. Once in, follow the prompts, register, and enjoy the site.