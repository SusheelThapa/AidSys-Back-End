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

## Installation

1. Clone the repository

   ```sh
   git clone git@github.com:SusheelThapa/AidSys-Back-End.git
   ```

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

4. Running the project

   ```sh
   npm run dev
   ```

   _The project will run at PORT 5000_

## Guidelines

These set of rules are to be taken into consideration while doing this project.

I cannot explain why this is useful but when you will continue, you will know your self.

### Project Guidelines

1. **Class name** should be into **PascalCase**.
2. **Variable** and **Function name** should be in **camelCase**.
3. Before commiting any changes, make sure to format the code with **Prettier**.
4. The variable name should be chosen such that there won't be confusion on it name and for what it is created.
5. The **files** and **directories name** should be in **lowercase**, space shouldn't be used(use underscore(`_`))

