import React, { Component } from "react";
import { withRouter } from "react-router";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../mutations";
import "./contactform.css";
import { Button, Grid, MenuItem, Typography } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { STATE_LIST } from "../../constants.js";
const Yup = require("yup");

const CreateUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, "Max length is 30 characters")
    .required(),
  businessName: Yup.string(),
  lastName: Yup.string()
    .max(150, "Maximum length is 150 characters")
    .required(),
  streetAddress: Yup.string()
    .max(100, "Maximum length is 100 characters")
    .required(),
  city: Yup.string()
    .max(70)
    .required(),
  state: Yup.string().required(),
  zipcode: Yup.string()
    .max(10)
    .min(5)
    .required()
});

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      zipcode: "",
      city: "",
      state: ""
    };
  }

  render() {
    const {
      businessName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode
    } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Address
        </Typography>
        <Mutation
          mutation={CREATE_USER}
          onCompleted={data => this.props._confirm(data)}
        >
          {(createUser, { loading, error, data }) => (
            <ValidatorForm
              onSubmit={this.props.submit(createUser)}
              instantValidate={false}
            >
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    required
                    id="firstName"
                    name="firstName"
                    InputLabelProps={{ shrink: true }}
                    label="First Name"
                    fullWidth
                    autoComplete="fname"
                    value={firstName}
                    validators={["required", "isString", "maxStringLength:30"]}
                    onChange={this.props.onChangeFirstName}
                    errorMessages={[
                      "This is a required field",
                      "Input must be a string",
                      "Max length of field is 30 characters"
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    required
                    id="lastName"
                    name="lastName"
                    InputLabelProps={{ shrink: true }}
                    label="Last Name"
                    fullWidth
                    autoComplete="lname"
                    value={lastName}
                    validators={["required", "isString", "maxStringLength:150"]}
                    errorMessages={[
                      "This is a required field",
                      "Input must be a string",
                      "Max length of field is 150 characters"
                    ]}
                    onChange={this.props.onChangeLastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    id="businessName"
                    label="Business Name"
                    name="businessName"
                    fullWidth
                    value={businessName}
                    validators={["isString"]}
                    errorMessages={["Input must be a string"]}
                    onChange={this.props.onChangeBusinessName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    autoComplete="street address"
                    value={streetAddress}
                    validators={["required", "isString", "maxStringLength:100"]}
                    errorMessages={[
                      "This is a required field",
                      "Input must be a string",
                      "Max length of field is 100 characters"
                    ]}
                    onChange={this.props.onChangeStreetAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    required
                    id="city"
                    name="city"
                    InputLabelProps={{ shrink: true }}
                    label="City"
                    fullWidth
                    autoComplete="city"
                    value={city}
                    validators={["required", "isString", "maxStringLength:70"]}
                    errorMessages={[
                      "This is a required field",
                      "Input must be a string",
                      "Max length of field is 70 characters"
                    ]}
                    onChange={this.props.onChangeCity}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    id="state"
                    required
                    select
                    InputLabelProps={{ shrink: true }}
                    label="State"
                    name="state"
                    className={"modal_field"}
                    value={state}
                    fullWidth
                    onChange={this.props.onChangeState}
                    validators={["required"]}
                    errorMessages={["This is a required field"]}
                    SelectProps={{
                      MenuProps: {
                        className: "Mister Menu"
                      }
                    }}
                    helperText="State"
                  >
                    {STATE_LIST.map(state => (
                      <MenuItem key={state.label} value={state.label}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </TextValidator>
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    required
                    id="zipcode"
                    name="zipcode"
                    InputLabelProps={{ shrink: true }}
                    label="Zipcode / Postal code"
                    fullWidth
                    autoComplete="postal-code"
                    value={zipcode}
                    validators={[
                      "required",
                      "isString",
                      "maxStringLength:10",
                      "minStringLength:5"
                    ]}
                    errorMessages={[
                      "This is a required field",
                      "Input must be a string",
                      "Max length for field is 10 characters",
                      "Min length for field is 5 characters"
                    ]}
                    onChange={this.props.onChangeZipcode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="HELL">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="SignUpButon"
                    >
                      Finish Account Creation
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </ValidatorForm>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default withRouter(ContactForm);
