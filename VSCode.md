# Using Visual Studio Code
## Download and install these tools first
- [NodeJS](https://nodejs.org/en/download/)
- SQL Server database (doesn't have to be local)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [.NET Core SDK](https://download.microsoft.com/download/B/9/F/B9F1AF57-C14A-4670-9973-CDF47209B5BF/dotnet-dev-win-x64.1.0.4.exe)
- LinkDev.CodeGenerator.exe
 
Using the project template:
- Download the project template from here: https://github.com/LinkDev/module-zero-core-template/archive/master.zip

- Run ReplaceInFiles to rename the project files and code namespaces from AbpCompanyName.AbpProjectName to something like LinkDev.MyProject
ReplaceInFiles.exe AbpCompanyName LinkDev AbpProjectName MyProject

## Build and run aspnet-core

- Adjust connection string to your SQL Database preferably an empty one at:
aspnet-core/src/AbpCompanyName.AbpProjectName.Migrator/appsettings.json
aspnet-core/src/AbpCompanyName.AbpProjectName.Web.Host/appsettings.json
aspnet-core/src/AbpCompanyName.AbpProjectName.Web.Mvc/appsettings.json

- Inside the EntityFrameworkCore folder run the following command:
`dotnet ef database update`

- Inside the aspnet-core/src/AbpCompanyName.AbpProjectName.Web.Host folder run the following commands:
`dotnet restore`
`dotnet build`
`dotnet run`

You can browse http://localhost:21021/ to see swagger UI for the WebAPIs available in this host.

## To build angular
Inside the angular folder run the following commands:

`npm install`
`nswag\refresh.bat` (optional) this updates the angular service proxies from the swagger interface running in the above steps
`npm start`

You can browse http://localhost:4200/ to see the Angular admin interface.

Login with:
username: admin
password: 123qwe

## Generate Code for your databse:
`LinkDev.CodeGenerator -namespace <namespace> -connectionString <connectionString> -directory <repo-root>`

[Check here](https://link-dev.visualstudio.com/Technology%20Team/_wiki?pagePath=/Welcome/LinkDev.CodeGenerator) for more documentation on using the Code Generator.