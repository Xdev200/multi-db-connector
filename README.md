# Customizable Multi-Database Connector

A production-ready npm package for connecting to multiple databases with full customization.

## Installation

```bash
npm install multi-db-connector
```
## Usage

```js
const MultiDBConnector = require('multi-db-connector');

const dbConfig = {
  mongodb: {
    url: 'mongodb://username:password@localhost:27017/mydatabase'
  },
  mysql: {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'mydatabase'
  },
  postgres: {
    user: 'username',
    host: 'localhost',
    database: 'mydatabase',
    password: 'password',
    port: 5432,
  }
};

const connector = new MultiDBConnector(dbConfig);

(async () => {
  try {
    const mongodbClient = await connector.connect('mongodb');
    const mysqlConnection = await connector.connect('mysql');
    const postgresClient = await connector.connect('postgres');

    // Now you can use the connected clients for database operations
    // ...

    // Close connections when done
    mongodbClient.close();
    mysqlConnection.end();
    await postgresClient.end();
  } catch (error) {
    console.error('Error:', error);
  }
})();

```

## Contributing
Contributions are welcome! Please read the Contribution Guidelines for more information.

Create a CONTRIBUTING.md File (Optional):

Create a CONTRIBUTING.md file with guidelines for contributing to the project.

Create a LICENSE File:

Create a LICENSE file containing the text of the MIT License.

Publish Your Package:

Publish your package to npm using the following command (you'll need an npm account):

```bash
npm publish
```

## License
This project is licensed under the MIT License.
