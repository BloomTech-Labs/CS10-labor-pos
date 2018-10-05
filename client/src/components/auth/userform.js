import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import { Formik, Form, Field } from "formik";
import { TextField } from "../../components";
const Yup = require("yup");

// const styles = theme => ({
//   layout: {
//     width: "auto",
//     marginLeft: theme.spacing.unit * 2,
//     marginRight: theme.spacing.unit * 2,
//     [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
//       width: 600,
//       marginLeft: "auto",
//       marginRight: "auto"
//     }
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 3,
//     marginBottom: theme.spacing.unit * 3,
//     padding: theme.spacing.unit * 2,
//     background: "#00ff6b",
//     [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
//       marginTop: theme.spacing.unit * 6,
//       marginBottom: theme.spacing.unit * 6,
//       padding: theme.spacing.unit * 3
//     }
//   },
//   stepper: {
//     padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
//   },
//   buttons: {
//     display: "flex",
//     justifyContent: "flex-end"
//   },
//   button: {
//     marginTop: theme.spacing.unit * 3,
//     marginLeft: theme.spacing.unit
//   }
// });

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .max(150, "Username must be under 150 characters")
    .required(),
  password: Yup.string().required(),
  email: Yup.string()
    .required()
    .email("Please enter a valid email")
});

// class UserForm extends Component {
//   constructor() {
//     super();
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     this.setState({ disabled: !result });
//     this.props.onSubmit();
//   };

const UserForm = props => {
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          username: props.username,
          password: props.password,
          email: props.email
        }}
        validationSchema={SignupSchema}
        onSubmit={event => {
          event.preventDefault();
          props.onSubmit();
        }}
      >
        {({ errors, touched, isValid, handleChange }) => {
          let validity = {
            username: !!errors.username,
            password: !!errors.password,
            email: !!errors.email
          };

          console.log(errors);
          console.log(touched);
          console.log(props.handleTouch);
          console.log(props.email_touched);
          console.log(validity);
          console.log(props.valid);
          if (
            !!touched.email != !!props.email_touched &&
            !props.email_touched
          ) {
            props.handleTouch("email_touched");
          }
          if (
            !!touched.password != !!props.password_touched &&
            !props.password_touched
          ) {
            props.handleTouch("password_touched");
          }
          if (
            !!touched.username != !!props.username_touched &&
            !props.username_touched
          ) {
            props.handleTouch("username_touched");
          }

          for (let key in validity) {
            if (validity[key] !== props.valid[key]) {
              props.errorComm(validity);
            }
          }

          return (
            <React.Fragment>
              <Typography variant="title" gutterBottom>
                Account details
              </Typography>
              <Form>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <Field
                        name="username"
                        placeholder="Username"
                        component={TextField}
                        fullWidth={true}
                        onChange={e => {
                          handleChange(e);
                          props.onChangeUsername(e);
                        }}
                        value={props.username}
                        required
                      />
                      {props.valid.username && props.email_touched ? (
                        <Typography color="error">{errors.username}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Please select a secure password"
                      component={TextField}
                      fullWidth={true}
                      onChange={e => {
                        handleChange(e);
                        props.onChangePassword(e);
                      }}
                      value={props.password}
                      required
                    />
                    {props.valid.password && props.email_touched ? (
                      <Typography color="error">{errors.password}</Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      component={TextField}
                      fullWidth={true}
                      onChange={e => {
                        handleChange(e);
                        props.onChangeEmail(e);
                      }}
                      value={props.email}
                      required
                    />
                    {props.valid.email && props.email_touched ? (
                      <Typography color="error">{errors.email}</Typography>
                    ) : null}
                  </Grid>
                </Grid>
              </Form>
            </React.Fragment>
          );
        }}
      </Formik>
    </div>
  );
};

//   render() {
//     return (
//       <React.Fragment>
//         <Typography variant="title" gutterBottom>
//           Account details
//         </Typography>
//         <ValidatorForm onSubmit={this.handleSubmit} instantValidate>
//           <Grid container spacing={24}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 id="username"
//                 required
//                 name="username"
//                 label="Username"
//                 value={this.props.username}
//                 fullWidth
//                 autoComplete="username"
//                 onChange={this.props.onChangeUsername}
//                 validatorListener={this.props.validatorListener}
//                 validators={["required", "isString", "maxStringLength:150"]}
//                 errorMessages={[
//                   "An email is required",
//                   "Email must be a string",
//                   "Max length of email address is 150 characters"
//                 ]}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 id="password"
//                 name="password"
//                 label="Password"
//                 type="password"
//                 value={this.props.password}
//                 autoComplete="off"
//                 fullWidth
//                 onChange={this.props.onChangePassword}
//                 validators={["required", "isString"]}
//                 errorMessages={[
//                   "Password is a required field",
//                   "Password must be a string"
//                 ]}
//                 validatorListener={this.props.validatorListener}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 id="email"
//                 name="email"
//                 label="Email"
//                 value={this.props.email}
//                 fullWidth
//                 onChange={this.props.onChangeEmail}
//                 validators={["required", "isString"]}
//                 errorMessages={[
//                   "An email is required",
//                   "Email must be a string"
//                 ]}
//                 validatorListener={this.props.validatorListener}
//               />
//             </Grid>
//           </Grid>
//         </ValidatorForm>
//       </React.Fragment>
//     );
//   }
// }

export default withRouter(UserForm);
