import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grade } from "@material-ui/icons";
import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Paper,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Hidden,
  withStyles
} from "@material-ui/core";
import { Query, Mutation } from "react-apollo";
import { SETTINGS_QUERY } from "../../queries.js";
import { UPDATE_USER } from "../../mutations.js";
import { STATE_LIST } from "../../constants";
import { styles } from "../material-ui/styles.js";
import jwt_decode from "jwt-decode";

//  This component will render on the /settings route when the user is logged in
//  It is a child of the home component.
//  It presents the user with forms that allow them to view and edit their user
//  information and settings.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rFA17
class Settings extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    businessName: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    premium: "",
    paidUntil: "",
    username: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount = () => {
    this.setState({
      oldPassword: "",
      newPassword: "",
      businessName: this.props.user.businessName,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      streetAddress: this.props.user.streetAddress,
      city: this.props.user.city,
      state: this.props.user.state,
      zipcode: this.props.user.zipcode,
      premium: this.props.user.premium,
      paidUntil: this.props.user.paidUntil,
      username: this.props.user.username
    });
  };

  render() {
    let { classes } = this.props;
    console.log(classes);
    const {
      oldPassword,
      newPassword,
      businessName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode,
      premium,
      paidUntil
    } = this.state;
    return (
      <div>
        <Mutation mutation={UPDATE_USER} onCompleted={() => this._confirm()}>
          {(mutateJob, { loading, error, data }) => (
            <div>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  let user_variables = {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    businessName: businessName,
                    firstName: firstName,
                    lastName: lastName,
                    streetAddress: streetAddress,
                    city: city,
                    state: state,
                    zipcode: zipcode
                  };

                  user_variables.id = this.props.user.id;
                  mutateJob({
                    variables: user_variables
                  });
                }}
              >
                <Grid container>
                  <Grid item xs={4} />
                  <Grid item xs={4}>
                    <Typography variant="display3">Settings</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Hidden xsUp={!premium}>
                      <IconButton>
                        <Grade />
                      </IconButton>
                      <Typography>
                        Premium member paid until {paidUntil}
                      </Typography>
                    </Hidden>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="title">
                      Change Password
                    </Typography>
                    <Paper className={classes.card}>
                      <Grid container>
                        <Grid item xs={5}>
                          <TextField
                            id="field-oldPassword"
                            label="Current Password"
                            type="password"
                            fullWidth
                            name="oldPassword"
                            className={"modal_field"}
                            value={oldPassword}
                            onChange={this.handleChange("oldPassword")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={5}>
                          <TextField
                            id="field-newPassword"
                            label="New Password"
                            type="password"
                            fullWidth
                            name="newPassword"
                            className={"modal_field"}
                            value={newPassword}
                            onChange={this.handleChange("newPassword")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={1} />
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography gutterBottom variant="title">
                      Business Name
                    </Typography>
                    <Paper className={classes.card}>
                      <Grid container>
                        <Grid item xs={10}>
                          <TextField
                            id="field-businessName"
                            label="Business Name"
                            name="businessName"
                            fullWidth
                            className={"modal_field"}
                            value={businessName}
                            onChange={this.handleChange("businessName")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={2} />
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="title">
                      Name
                    </Typography>
                    <Paper className={classes.card}>
                      <Grid container>
                        <Grid item xs={5}>
                          <TextField
                            id="field-firstName"
                            label="First Name"
                            name="firstName"
                            fullWidth
                            className={"modal_field"}
                            value={firstName}
                            onChange={this.handleChange("firstName")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={5}>
                          <TextField
                            id="field-lastName"
                            label="Last Name"
                            fullWidth
                            name="lastName"
                            className={"modal_field"}
                            value={lastName}
                            onChange={this.handleChange("lastName")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={1} />
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="title">
                      Address
                    </Typography>
                    <Paper className={classes.card}>
                      <Grid container>
                        <Grid item xs={11}>
                          <TextField
                            id="field-streetAddress"
                            label="Street Address"
                            fullWidth
                            name="streetAddress"
                            className={"modal_field"}
                            value={streetAddress}
                            onChange={this.handleChange("streetAddress")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                          <TextField
                            id="field-city"
                            label="City"
                            name="city"
                            fullWidth
                            className={"modal_field"}
                            value={city}
                            onChange={this.handleChange("city")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={3}>
                          <TextField
                            id="state"
                            select
                            label="State"
                            name="state"
                            className={"modal_field"}
                            value={state}
                            fullWidth
                            onChange={this.handleChange("state")}
                          >
                            {STATE_LIST.map(state => (
                              <MenuItem key={state.label} value={state.label}>
                                {state.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={2}>
                          <TextField
                            id="field-zipcode"
                            label="Zipcode"
                            name="zipcode"
                            fullWidth
                            className={"modal_field"}
                            value={zipcode}
                            onChange={this.handleChange("zipcode")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={1} />
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={9} />
                  <Grid item xs={2}>
                    <Button type="submit">Save Changes</Button>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Paper elevation={4} square className={classes.card}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell numeric>Used</TableCell>
                            <TableCell numeric>
                              Free Account Allotment
                            </TableCell>
                            <TableCell numeric>Remaining</TableCell>
                            <TableCell>Premium</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Clients</TableCell>
                            <TableCell numeric>
                              {this.props.item_counts.clients}
                            </TableCell>
                            <TableCell numeric>1</TableCell>
                            <TableCell numeric>
                              {1 - this.props.item_counts.clients}
                            </TableCell>
                            <TableCell>unlimited!</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Jobs</TableCell>
                            <TableCell numeric>
                              {this.props.item_counts.jobs}
                            </TableCell>
                            <TableCell numeric>8</TableCell>
                            <TableCell numeric>
                              {8 - this.props.item_counts.jobs}
                            </TableCell>
                            <TableCell>unlimited!</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Notes</TableCell>
                            <TableCell numeric>
                              {this.props.item_counts.notes}
                            </TableCell>
                            <TableCell numeric>8</TableCell>
                            <TableCell numeric>
                              {8 - this.props.item_counts.notes}
                            </TableCell>
                            <TableCell>unlimited!</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Parts</TableCell>
                            <TableCell numeric>
                              {this.props.item_counts.parts}
                            </TableCell>
                            <TableCell numeric>8</TableCell>
                            <TableCell numeric>
                              {8 - this.props.item_counts.parts}
                            </TableCell>
                            <TableCell>unlimited!</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Tags</TableCell>
                            <TableCell numeric>
                              {this.props.item_counts.tags}
                            </TableCell>
                            <TableCell numeric>8</TableCell>
                            <TableCell numeric>
                              {8 - this.props.item_counts.tags}
                            </TableCell>
                            <TableCell>unlimited!</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </form>
              {loading && <p>Saving information</p>}
              {(data || error) && <p>Success!</p>}
            </div>
          )}
        </Mutation>
      </div>
    );
  }
  _confirm = () => {
    window.location.reload();
    this.props.history.push("/settings");
  };
}

class SettingsWrapper extends Component {
  render = () => {
    return (
      <Query query={SETTINGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const decoded_token = jwt_decode(localStorage.getItem("auth-token"));
          const user = data.allUsers.edges.filter(user => {
            return user.node.username === decoded_token.username;
          })[0].node;

          const item_counts = {
            clients: data.allClients.edges.length,
            jobs: data.allJobs.edges.length,
            notes: data.allNotes.edges.length,
            parts: data.allClients.edges.length,
            tags: data.allClients.edges.length
          };
          return (
            <Settings user={user} item_counts={item_counts} {...this.props} />
          );
        }}
      </Query>
    );
  };
}

export default withRouter(withStyles(styles)(SettingsWrapper));
