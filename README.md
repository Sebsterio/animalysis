# Animalysis

## Description

App that streamlines the process of reporting a pet's health problem and automates its analysis. The report is an interactive survey whose results are stored in the patient's file in the database and are accessible by a clinic chosen by the patient. The content of the survey is customizable by each clinic individually.

## How to use

```
# Development

$ npm i
$ npm run dev

# Deployment

$ heroku login
$ heroku git:remote -a animalysis  # Once
$ git add .
$ git commit -am "make it better"
$ git push heroku master

```

## TODO

- Sterilize user input
- Integrate Cloudinary with the back-end to support signed uploads - needed for overwriting existing files (to avoid accumulating obsolete files)

## Issues

- Tried code-spliting by lazy-loading pages in the `routes` files but they got bundled anyway
- Also tried lazy-loading the `routes` arrays but it didn't seem to be supported

## Licence

UNLICENCED

Copyright © 2020 Will Cadell
