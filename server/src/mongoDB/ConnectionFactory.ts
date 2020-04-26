//var url = "mongodb://"+HOST+":"+PORT+"/"+DB_NAME;

import * as Mongodb from 'mongodb';

let mongoClient = Mongodb.MongoClient;
var ConnectionPool = null;

ConnectionFactory = (host, port, db_name) => {
	console.log('creating new');
	var url = "mongodb://localhost:27017/deployment";
	this.createPool = () => {
		console.log('Creating Connetion Pool for Session ======>>>>>> ');
		return new Promise(function (reslove, reject) {
			if (typeof ConnectionFactory.instance === 'object' && ConnectionPool) {
				let mstToWrite = { info: true, message: 'returning existing connection from pool' };
				console.log('returning existing connection from pool');
				reslove(ConnectionPool);
				return;
			}

			var option = {
				poolSize: 10,
				autoReconnect: true,
				numberOfRetries: 5,
				useNewUrlParser: true,
				connectTimeoutMS: 160000
			};

			mongoClient.connect(url, option, function (err, db) {
				if (err) {
					console.log("error :: authentication failed");
					ConnectionPool = null;
					reject(err);
				} else {
					console.log("Creating new pool");
					ConnectionPool = db;
					var dbo = db.db("customerDetails");
					dbo.createCollection("CustomerData", function (err, res) {
						if (err) throw err;
						console.log("CustomerData Collection created!");
						reslove(db);
					});

				}
			});
		})

	};

	this.getConnection = () => {
		return new Promise(function (reslove, reject) {
			console.log('returning existing connection from pool main');
			if (ConnectionPool) {
				reslove(ConnectionPool);
			} else {
				reject('No connection created');
			}
		});
	}

	this.closeConnection = (con) => {
		con.close();
	};
	ConnectionFactory.instance = this;
}
export default ConnectionFactory;