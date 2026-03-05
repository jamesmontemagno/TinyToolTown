---
name: "Oqtane Module Template"
tagline: "Scaffold Oqtane modules using the CLI instead of the Admin GUI"
author: "Mark Davis"
author_github: "markdav-is"
github_url: "https://github.com/markdav-is/Oqtane.Module"
website_url: "https://www.marks.wiki/p/a-dotnet-template-for-oqtane-modules"
tags: ["oqtane", "blazor", "dotnet"]
language: "c#"
license: "MIT"
date_added: "2026-03-05"
featured: false
---



Scaffolding Oqtane modules using the Admin GUI is fine, but sometime you want to script module creation or just use the CLI.  Here's a 'dotnet new' template to do just that.

MarkDav.Oqtane.Module.Template is a dotnet new item template. Install it once, then scaffold a complete Oqtane module from the command line.

'dotnet new install MarkDav.Oqtane.Module.Template'

'dotnet new oqtane-module -n MyModule --namespace MyCompany.MyModule'

That produces the full stack: Client Blazor components, Services, an ASP.NET Core controller, EF Core DbContext with migrations, repository, shared entity model and interface, and more. Fifteen-plus files, ready to go, without clicking through anything.