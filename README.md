# AidSys-Backend-End

**AisSys** is our project which basically takes any institution and all of its assets to cloud.
Its digitizing the entire institution to reduce the operation cost and h
ence enabling one-and-all present in the institution to make optimum use of the available resources.

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com)[**Recommanded**]
2. [nodejs](https://nodejs.org/en/)

3. Extension for Visual Studio Code

   1. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Code Formatter

   2. [npm intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense): For better suggestions

   3. [rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

4. [Installation of MongoDB](https://www.mongodb.com/try/download/community)
   _Make sure it is properly running on your machine_

## Setting up Project

### Cloning the project

1. Clone the repository

   ```sh
   git clone git@github.com:SusheelThapa/AidSys-Back-End.git
   ```

### Setting up environmental variables

1. Create a file `.env` in root directory
2. Add the following lines

   ```sh
   JWT_SECRET_KEY="1qazxsw23edcvfr45tgb"
   BCRYPT_SALT_ROUND=10;
   DATABASE=aidsys
   ```

### Setting up Database

2. Run the below command

   ```sh
      node populateUser.js
   ```

3. Then, you will see below message on your console.

   ```text
   Successfully connect to mongodb
   Done
   ```

4. Then, exit the program by pressing `Ctrl + C`

### Installing packages

2. Install the node modules

   ```sh
   npm i
   ```

3. Install `nodemon` globally as it is used to run the project instead of `node`.

   ```sh
   npm i nodemon -g
   ```

   _Since, we use `nodemon` while creating most of backend server using **nodejs** so rather than including in package.json.
   we have installed it globally_

## Running the project

1. Running the project

   ```sh
   npm run dev
   ```

   _The project will run at PORT 5000_
   _You need to setup database and environment variable also_

## Guidelines for contribution

These set of rules are to be taken into consideration while doing this project.

I cannot explain why this is useful but when you will continue, you will know your self.

### Project Guidelines

1. **Class name** should be into **PascalCase**.
2. **Variable** and **Function name** should be in **camelCase**.
3. Before commiting any changes, make sure to format the code with **Prettier**.
4. The variable name should be chosen such that there won't be confusion on it name and for what it is created.
5. The **files** and **directories name** should be in **lowercase**, space shouldn't be used(use underscore(`_`))

### Git and Github Guidelines

#### Git

1. **commit** every small detail or change possible.
2. The commit can be divided into two section

   - Title
   - Description

   _If you have change alot so that only **Title** is not able to describe it
   you can write detail description part_

3. Make sure that after reading the commit, reader can get brief info about your changes.

#### Github

1. It is highly encourage not to upload your file directly using **Github** instead use **Git**
2. You can use discussion section

   - If you have any doubt
   - You want to implement something but you didnot find how to implement that

   _This will be helpful if you are working in Open Source Project
   So, why not to pratice via this project_

3. If you find anything that is usual while running project, you can create issue and **try avoiding to say it using DM**

```

```
