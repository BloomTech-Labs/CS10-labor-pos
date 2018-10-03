import React, { Component } from "react";
import {
  withStyles,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../mutations";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../../constants.js";
import { Formik, Form, Field } from "formik";
import { TextField } from "../../components";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    background: "#ffff",
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const Yup = require("yup");
const steps = ["Account details", "Contact information"];

const CreateUserSchema = Yup.object().shape({
  username: Yup.string()
    .max(150, "Username must be under 150 characters")
    .required(),
  password: Yup.string().required(),
  email: Yup.string()
    .required()
    .email("Please enter a valid email"),
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

class Wizard extends Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues
    };
    this.Page.errorComm = this.errorComm;
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));

  prev = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));

  // save token to localStorage
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = createUser => (values, bag) => {
    const { children } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      createUser({
        variables: {
          businessName: this.state.businessName,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          streetAddress: this.state.streetAddress,
          zipcode: this.state.zipcode,
          city: this.state.city,
          state: this.state.state,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }
      });
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validationSchema={CreateUserSchema}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <Typography variant="display1" align="center">
              Sign up with email
            </Typography>
            {/* <Stepper activeStep={activePage} className={classes.stepper}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper> */}
            <div className="buttons">
              {page > 0 && (
                <Button type="button" onclick={this.prev}>
                  {" "}
                  « Previous{" "}
                </Button>
              )}

              {!isLastPage && (
                <Button type="submit" onClick={this.next}>
                  {" "}
                  Next »
                </Button>
              )}
              {isLastPage && (
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}

const CreateUser = ({ errors, touched }) => (
  <Wizard
    initialValues={{
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      businessName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipcode: ""
    }}
  >
    <Wizard.Page
      onSubmit={event => {
        event.preventDefault();
        this._next();
      }}
    >
      <Typography variant="title" gutterBottom>
        Address
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Field
            name="username"
            placeholder="Username"
            component={TextField}
            fullWidth={true}
            required
          />
          {errors && errors.username && touched.username ? (
            <p>{errors.username}</p>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="password"
            type="password"
            placeholder="Please create a secure password"
            component={TextField}
            fullWidth={true}
            required
          />
          {errors && errors.password && touched.password ? (
            <p>{errors.password}</p>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            component={TextField}
            fullWidth={true}
            required
          />
          {errors && errors.email && touched.email ? (
            <p>{errors.email}</p>
          ) : null}
        </Grid>
      </Grid>
    </Wizard.Page>
    <Wizard.Page
      onSubmit={async data => {
        const { token } = data.createUser;
        console.log(data);
        this._saveUserData(token);

        // Go to the root route
        this.props.history.push("/");
      }}
    >
      <Typography variant="title" gutterBottom>
        Address
      </Typography>
      <Mutation
        mutation={CREATE_USER}
        onCompleted={data => this.props._confirm(data)}
      >
        {createUser => (
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Field
                name="firstName"
                type="firstName"
                placeholder="First Name"
                component={TextField}
                fullWidth={true}
                required
              />
              {errors && errors.firstName && touched.firstName ? (
                <p>{errors.firstName}</p>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="lastName"
                type="lastName"
                placeholder="Last Name"
                component={TextField}
                fullWidth={true}
                required
              />
              {errors && errors.lastName && touched.lastName ? (
                <p>{errors.lastName}</p>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <Field
                name="businessName"
                type="businessName"
                placeholder="Business Name"
                component={TextField}
                fullWidth={true}
              />
              {errors && errors.businessName && touched.businessName ? (
                <p>{errors.businessName}</p>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <Field
                name="streetAddress"
                type="streetAddress"
                placeholder="Street Address"
                component={TextField}
                fullWidth={true}
                required
              />
              {errors && errors.streetAddress && touched.streetAddress ? (
                <p>{errors.streetAddress}</p>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="city"
                type="city"
                placeholder="City"
                component={TextField}
                fullWidth={true}
                required
              />
              {errors && errors.city && touched.city ? (
                <p>{errors.city}</p>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="state"
                type="state"
                component={TextField}
                fullWidth={true}
                required
              />
              {errors && errors.state && touched.state ? (
                <p>{errors.state}</p>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="zipcode"
                type="zipcode"
                component={TextField}
                fullWidth={true}
                required
              />
              {errors && errors.zipcode && touched.zipcode ? (
                <p>{errors.zipcode}</p>
              ) : null}
            </Grid>
          </Grid>
        )}
      </Mutation>
    </Wizard.Page>
  </Wizard>
);

export default withRouter(withStyles(styles)(CreateUser));

/*
// class CreateUser extends Component {
//   constructor() {
//     super();
//     this.state = {
//       activeStep: 0,
//       username: "",
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       businessName: "",
//       streetAddress: "",
//       city: "",
//       state: "",
//       zipcode: ""
//     };
//     this._next = this._next.bind(this); // 1
//     this._prev = this._prev.bind(this); // 2
//     this.submit = this.submit.bind(this); // 3
//     this._confirm = this._confirm.bind(this); // 4
//     this.validatorListener = this.validatorListener.bind(this); // 5
//     /* 1: Allows user to go to previous page of form
//        2: Allows user to go to next page of form
//        3: Allows user to submit form, which triggers createUser mutation
//        4: Takes token off createUser response and saves it to localStorage
//        5: Validates the form for createUser */
//   }

//   /* handleChange is getting passed down to UserForm and ContactForm
//   This is so that the text from the input fields appears in the state of CreateUser */
//   handleChange(name) {
//     return event =>
//       this.setState({
//         [name]: event.target.value
//       });
//   }

//   validatorListener(result) {
//     this.setState({ disabled: !result });
//     this._next();
//   }

//   _next = () => {
//     let activeStep = this.state.activeStep;
//     // if (activeStep !== 2) {
//     this.setState({
//       activeStep: activeStep + 1
//     });
//   };

//   _prev = () => {
//     let activeStep = this.state.activeStep;
//     this.setState({
//       activeStep: activeStep - 1
//     });
//   };

//   _confirm = async data => {
//     const { token } = data.createUser;
//     console.log(data);
//     this._saveUserData(token);

//     // Go to the root route
//     this.props.history.push("/");
//   };
//   // save token to localStorage
//   _saveUserData = token => {
//     localStorage.setItem(AUTH_TOKEN, token);
//   };

//   submit = createUser => event => {
//     event.preventDefault();
//     createUser({
//       variables: {
//         businessName: this.state.businessName,
//         firstName: this.state.firstName,
//         lastName: this.state.lastName,
//         streetAddress: this.state.streetAddress,
//         zipcode: this.state.zipcode,
//         city: this.state.city,
//         state: this.state.state,
//         username: this.state.username,
//         password: this.state.password,
//         email: this.state.email
//       }
//     });
//   };

//   getStepContent(step) {
//     let content = null;
//     switch (step) {
//       case 0:
//         content = (
//           <UserForm
//             onSubmit={this._next}
//             previous={this._prev}
//             username={this.state.username}
//             onChangeUsername={this.handleChange("username")}
//             onChangePassword={this.handleChange("password")}
//             onChangeEmail={this.handleChange("email")}
//             password={this.state.password}
//             email={this.state.email}
//             validatorListener={this.validatorListener}
//           />
//         );
//         break;
//       case 1:
//         content = (
//           <ContactForm
//             username={this.state.username}
//             password={this.state.password}
//             email={this.state.email}
//             firstName={this.state.firstName}
//             lastName={this.state.lastName}
//             businessName={this.state.businessName}
//             streetAddress={this.state.streetAddress}
//             city={this.state.city}
//             state={this.state.state}
//             zipcode={this.state.zipcode}
//             onChangeFirstName={this.handleChange("firstName")}
//             onChangeLastName={this.handleChange("lastName")}
//             onChangeBusinessName={this.handleChange("businessName")}
//             onChangeStreetAddress={this.handleChange("streetAddress")}
//             onChangeCity={this.handleChange("city")}
//             onChangeState={this.handleChange("state")}
//             onChangeZipcode={this.handleChange("zipcode")}
//             button={this.props.classes.button}
//             previous={this._prev}
//             submit={this.submit}
//             _confirm={this._confirm}
//             handleBlur={this.handleBlur}
//             validatorListener={this.validatorListener}
//           />
//         );
//         break;
//       default:
//         throw new Error("Unknown step");
//     }
//     return content;
//   }

//   render() {
//     const { classes } = this.props;
//     const { activeStep } = this.state;

//     return (
//       <React.Fragment>
//         <main className={classes.layout}>
//           <Paper className={classes.paper}>
//             <Typography variant="display1" align="center">
//               Sign up with email
//             </Typography>
//             <Stepper activeStep={activeStep} className={classes.stepper}>
//               {steps.map(label => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             <React.Fragment>
//               {activeStep === steps.length ? (
//                 <React.Fragment>
//                   <Typography align="center" gutterBottom>
//                     <Button>Click to sign in</Button>
//                   </Typography>
//                 </React.Fragment>
//               ) : (
//                 <React.Fragment>
//                   {this.getStepContent(activeStep)}
//                   <div className={classes.buttons}>
//                     {activeStep !== 0 && (
//                       <Button
//                         variant="outlined"
//                         onClick={this._prev}
//                         className={classes.button}
//                       >
//                         Back
//                       </Button>
//                     )}
//                     {activeStep === steps.length - 1 ? null : (
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={this.validatorListener}
//                         className={classes.button}
//                       >
//                         Next
//                       </Button>
//                     )}
//                   </div>
//                 </React.Fragment>
//               )}
//             </React.Fragment>
//           </Paper>
//         </main>
//       </React.Fragment>
//     );
//   }
// }

// CreateUser.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withRouter(withStyles(styles)(CreateUser));*/
