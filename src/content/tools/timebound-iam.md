---
name: "Timebound IAM"
tagline: "An MCP Server that gives Claude Code timebound scoped credentials for AWS"
author: "Rahul Singh"
author_github: "arrsingh"
github_url: "https://github.com/builder-magic/timebound-iam"
thumbnail: "/thumbnails/timebound-iam.png"
website_url: "https://timebound-iam.com"
tags: ["mcp", "aws", "iam", "aws-sts", "claude-code"]
language: "Go"
license: "Apache-2.0"
theme: "None"
date_added: "2026-02-19"
featured: false
---

I've been running all my infra in AWS and last week I started just asking claude code to provision, manage and configure a lot of it. The issue I ran into was that claude code needed permissions for all sorts of things and I was constantly adding, removing or editing IAM policies by hand in my AWS Account which quickly became tedious.

Also I ended up with a bunch of IAM policies and all sorts of permissions granted to my user that it was a mess.

So I built an MCP server that sits between AWS STS (Security Token Service) and allows Claude code to ask for temporary AWS Credentials with scoped permissions to a specific service. After a fixed amount of time the credentials expire and all my AWS Accounts now have zero IAM policies.