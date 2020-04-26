import { Request, Response } from "express";
import * as axios from "axios";

//mongodb configurations
const HOST = 'localhost';
const PORT = '27017';
const DB_NAME = 'deployment';
import MongoQuery from '../mongoDB/MongoQuery';
import ConnectionFactory from '../mongoDB/ConnectionFactory';

var connectionFactory = new ConnectionFactory('localhost', '27017', 'deployment');

connectionFactory.createPool().then(function () {
  console.log("Connection established to Database ==========>>>>>>>");
});

private async function getUpdatedData() {
  await MongoQuery.getDeployments(DB_NAME, 'deployements').then((updatedRes) => {
    console.log('serving from Mongodb');
    return updatedRes;
  }, (err) => {
    console.log('err in getting upodated data....')
  })
}

export async function getDeployment(req: Request, res: Response) {  
  if (req.headers.authorization === undefined) {
    res.status(401).json("Authorization header not found!");
  } else {
    axios
      .get(
        "https://api.npoint.io/8f7cf8628b367ffd50a2"
      )
      .then((data: any) => {
        if (data.length > 0) {
          MongoQuery.addDeploymentForFirstTime(DB_NAME, 'deployements').then((res) => {
            console.log('records inserted for first time');
            res.send(getUpdatedData());
          }, (err) => {
            console.log(err);
          })
        }
      });
  }
}




export async function addDeployment(req: Request, res: Response) {
  if (req.headers.authorization === undefined) {
    res.status(401).json("Authorization header not found!");
  } else {
    MongoQuery.addDeployment(DB_NAME, req, 'deployements').then((res) => {
      console.log('one record added');
      res.send(getUpdatedData()); // sends the updated data after adding
    }, (err) => {
      console.log(err);
    })
  }

  res.send('Hello User !!!');
}


export async function deleteDeployment(req: Request, res: Response) {
  if (req.headers.authorization === undefined) {
    res.status(401).json("Authorization header not found!");
  } else {
    MongoQuery.deleteDeployment(DB_NAME, data, 'deployements').then((res) => {
      console.log('one record added');
      res.send(getUpdatedData());  /// sends the updatwd data after deletion
    }, (err) => {
      console.log(err);
    })
  }
  res.send('Hello User !!!');
}

