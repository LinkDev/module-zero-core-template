## Download and install these tools first
- [NodeJS](https://nodejs.org/en/download/)
- SQL Server database (doesn't have to be local)
<<<<<<< HEAD
- Visual Studio Code
- Git for Windows
- .NET Core SDK
- ReplaceInFiles.exe
- LinkDev.CodeGenerator.exe

=======
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Git for Windows](https://git-scm.com/download/win)
- [.NET Core SDK](https://download.microsoft.com/download/B/9/F/B9F1AF57-C14A-4670-9973-CDF47209B5BF/dotnet-dev-win-x64.1.0.4.exe)
- LinkDev.CodeGenerator.exe
 
>>>>>>> bdb3ec03b9ad1e2f1973b81e7ee32a94202fceb5
Using the project template:
- Download the project template from here: https://github.com/LinkDev/module-zero-core-template/archive/master.zip

- Run ReplaceInFiles to rename the project files and code namespaces from AbpCompanyName.AbpProjectName to something like LinkDev.MyProject
ReplaceInFiles.exe AbpCompanyName:LinkDev AbpProjectName:MyProject

## aspnet-core

- Adjust connection string to your SQL Database preferably an empty one at:
aspnet-core/src/AbpCompanyName.AbpProjectName.Migrator/appsettings.json
aspnet-core/src/AbpCompanyName.AbpProjectName.Web.Host/appsettings.json
aspnet-core/src/AbpCompanyName.AbpProjectName.Web.Mvc/appsettings.json

- Adjust nuget source
- dotnet build
- dotnet ef database update
- Adjust port configuration
- dotnet run

## angular

- npm install
- nswag\refresh.bat
- npm start

## browse
Open a browser on: http://localhost:4200/

Login with:
username: admin
password: 123qwe

## Generate Code for your databse:
- CodeGenerator.exe -namespace <namespace> -connectionString <connectionString> -directory <repo-root>
