# Database
This directory contains all of the code used to configure and interact with the database for this project. I setup the ORM [Sequelize](https://sequelize.org/) by using 
its [sequelize-cli](https://sequelize.org/docs/v7/cli/). I'd also like to shout out
[Classsed](https://www.youtube.com/@Classsed) for their 
[Sequelize ORM Tutorial](https://www.youtube.com/watch?v=3qlnR9hK-lQ&t=1s). This 
tutorial really helped me grasped the key concepts of using the ORM in a project. 

## Setup 
### Local PostgreSQL instance 
If you've forked this repo and are wondering how to setup the database aspect follow
the steps below to get started. I've provided the [`db_setup.sh`](./db_setup.sh) to help
automate the setup of PostgresQL in a Linux environment. I used it in my WSL 
installation but it will also work on any Linux instance. The script downloads, 
installs, and configures a PostgresQL 16 database along with role that can be used to 
connect to the database.

> I'll be working on way to run a PostgreSQL container via Docker later on down the line! 

### Sequalize database migrations and seeders
Once you have PostgreSQL running locally, presuming you've already initialised the 
project with `npm install`, run the following commands to run the database migrations 
and seeders. You'll need to be in the `./database` directory when running the following 
commands. 

`sequelize db:migrate`. This command sets up the tables that the projects requires. 
`sequelize db:seed:all`. This command inserts dummy data into the database. 

You can also run `sequelize db:seed:undo:all` and `sequelize db:migrate:undo:all` to revert the changes should you wish to start fresh. 

> I'll be working on a way to automate this process. For example, when running `npm test` I'll run the migrations and seeders to set up the test server and then revert the process when the testing/development has ended. 

### Session table 
This project uses `express-session` and `passportjs` for user authentication and user session information is stored in a table within the PostgreSQL instance. To set this up we use the [connect-pg-simple](https://www.npmjs.com/package/connect-pg-simple) package. After installing this package you simply need to create the session table. There are numerous ways this can be done, I opted for simply copying the [sql script](https://github.com/voxpelli/node-connect-pg-simple/blob/main/table.sql) from the [node-connect-pg-simple](https://github.com/voxpelli/node-connect-pg-simple/tree/main) GitHub repo but you can check out the repos [README.md](https://github.com/voxpelli/node-connect-pg-simple/blob/main/README.md) for other ways to set this up. 