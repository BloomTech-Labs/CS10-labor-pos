import React, { Component } from "react";
import { withRouter } from "react-router";
var axios = require("axios");

//This component will render as a child of home on the path /jobs/%jobid/invoice
//It will present the user with a preview of the generated invoice as well
//as buttons to edit, cancel, or send the invoice.

//https://balsamiq.cloud/sc1hpyg/po5pcja/rA6BD
class JobInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentWillMount() {
    axios({
      url: `${process.env.REACT_APP_ENDPOINT}pdf/`,
      method: "POST",
      mode: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        job: this.props.match.params.id
      },
      responseType: "blob" //Force to receive data in a Blob Format
    })
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL, "Data");
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    window.close();
  }
  render() {
    return <div>Please enable popups to view your invoice.</div>;
  }
}

export default withRouter(JobInvoice);
