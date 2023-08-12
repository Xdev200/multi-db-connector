const mongodb = require("mongodb");
const mysql = require("mysql");
const { Client } = require("pg");

class MultiDBConnector {
  constructor(config = {}) {
    this.config = config;
  }

  async connect(databaseType) {
    if (!this.config[databaseType]) {
      throw new Error(`Configuration for ${databaseType} not provided`);
    }

    switch (databaseType) {
      case "mongodb":
        const mongoClient = await mongodb.MongoClient.connect(
          this.config[databaseType].url,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
        return mongoClient.db();

      case "mysql":
        const mysqlConnection = mysql.createConnection(
          this.config[databaseType]
        );
        return new Promise((resolve, reject) => {
          mysqlConnection.connect((err) => {
            if (err) {
              return reject(err);
            }
            resolve(mysqlConnection);
          });
        });

      case "postgres":
        const pgClient = new Client(this.config[databaseType]);
        await pgClient.connect();
        return pgClient;

      default:
        throw new Error(`Unsupported database type: ${databaseType}`);
    }
  }
}

module.exports = MultiDBConnector;
