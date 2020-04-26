import ConnectionFactory from './ConnectionFactory';
import * as Mongodb from 'mongodb';
let mongoClient = Mongodb.MongoClient;

var MongoQuery = () => {
	return {
		addDeploymentForFirstTime: (db_name, tableName) => {
			return new Promise(function (reslove, reject) {
				new ConnectionFactory().getConnection().then((con) => {
					var collentionAccessor = con.db(db_name);
					let userCollection = collentionAccessor.collection(tableName);
					userCollection.find().toArray((err, data) => {
						if (err) {
							reject(err);
						}
						console.log(data)
						reslove(data);
					});
				}).catch((e) => {
					reject(e);
				});
			});
		},
		getDeployments: (db_name, tableName) => {
			return new Promise(function (reslove, reject) {
				new ConnectionFactory().getConnection().then((con) => {
					var collentionAccessor = con.db(db_name);
					let userCollection = collentionAccessor.collection(tableName);
					userCollection.find().toArray((err, data) => {
						if (err) {
							reject(err);
						}
						console.log(data)
						reslove(data);
					});
				}).catch((e) => {
					reject(e);
				});
			});
		},

		addDeployment: (db_name, data, tableName) => {
			return new Promise(function (reslove, reject) {
				new ConnectionFactory().getConnection().then(function (con) {
					var collentionAccessor = con.db(db_name);
					let userCollection = collentionAccessor.collection(tableName);
					userCollection.insert(data, { w: 1 }, function (err, result) {
						//con.close();
						if (err) {
							reject(err);
						}
						reslove('Y');
					});
				}).catch((e) => {
					reject(e);
				});
			});
		},

		deleteDeployment: (db_name, tableName, rowsIdsToBeDeleted) => {
			return new Promise(function (reslove, reject) {
				new ConnectionFactory().getConnection().then(function (con) {
					var collentionAccessor = con.db(db_name);
					let userCollection = collentionAccessor.collection(tableName);
					userCollection.remove({ _id: { $in: rowsIdsToBeDeleted } }, function (err, response) {
						if (err) {
							reject(err);
						}
						reslove(response);
					});
				}).catch((e) => {
					reject(e);
				});
			});
		}
	};
}();

export default MongoQuery;