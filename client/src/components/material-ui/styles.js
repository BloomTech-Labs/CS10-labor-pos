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
  card: {
    backgroundColor: theme.palette.background.paper,
    margin: "10px",
    padding: "10px"
  },
  modal: {
    padding: "20px"
  },
  item_card: {
    backgroundColor: theme.palette.background.paper,
    height: "180px"
  },
  card_title: {
    marginTop: "40px"
  },
  field: {
    backgroundColor: theme.palette.background.paper,
    margin: "10px"
  },
  padded_button: {
    margin: "16px"
  },
  nav_menu: {
    display: "flex",
    flexDirection: "column"
  },
  list_item_reg: {
    padding: "10px",
    backgroundColor: theme.palette.background.paper
  },
  list_item_light: {
    padding: "10px",
    backgroundColor: theme.palette.lightened_background
  },
  image: {
    margin: "16px"
  },
  sidenav_top: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start"
  },
  typography: {
    padding: "10px"
  },
  main_content: {
    textAlign: "center",
    margin: "auto",
    width: "95%",
    maxWidth: "900px",
    marginTop: "32px",
    marginBottom: "32px",
    backgroundColor: theme.palette.background.default
  },
  pad_me: {
    padding: "6px 20px"
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.default,
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
export { styles };
