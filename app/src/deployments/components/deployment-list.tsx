import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import './deployment-list.css';
import axios from "axios";
import { version } from 'punycode';

interface DeploymentModel {
  deployment: []
}
interface TableRowModel {
  value: string
}

class DeploymentList extends React.Component<{}, DeploymentModel>{
  constructor(props: any) {
    super(props);
    this.state = {
      deployment: []
    }
  }

  componentDidMount = () => {
    axios
      .get(
        "http://localhost:8082/deployment/get"
      )
      .then(({ data }) => {
        console.log('data', data);
        this.setState({ deployment: data })
      });
  }

  delete = (deployment: any) => {
    console.log('deployement for deletion', deployment);
    axios
    .post(
      "http://localhost:8082/deployment/delete", deployment
    )
    .then(({ data }) => {
      console.log('data', data);
      this.setState({ deployment: data })
    });
  }

  render = () => {
    return (
      <div >
        <div className="container">Deployment List</div>
        <table>
          <tbody>
            {this.state.deployment.map((deployment, i) => {
              <tr onClick={this.delete(deployment)}>{deployment.name}</tr>
              deployment.versions.map(version, j) => {
              <tr key={j}>{version}}</tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DeploymentList;
