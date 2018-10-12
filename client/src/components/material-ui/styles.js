const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  textField: {
    flexBasis: "auto",
    width: "90%"
  },
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
    padding: "20px",
    width: "100%",
    maxWidth: "600px",
    margin: "auto"
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
    margin: "10px",
    width: "90%"
  },
  checkbox: {
    marginTop: "32px"
  },
  menuitems: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default
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
    paddingTop: "20px",
    fontSize: "24px",
    fontWeight: "900",
    fontFamily: "Roboto, sans-serif"
  },
  typography_paragraph: {
    paddingTop: "20px",
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: "Roboto"
  },
  typography_title: {
    fontSize: "50px"
  },
  main_content: {
    textAlign: "center",
    margin: "auto",
    width: "95%",
    maxWidth: "900px",
    marginTop: "32px",
    marginBottom: "32px",
    padding: "16px 32px",
    backgroundColor: theme.palette.background.default
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    backgroundColor: theme.palette.background.default
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  state_field: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19px",
    height: "24px",
    border: "0",
    borderBottom: "1px solid",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default
  },
  sidenav: {
    backgroundColor: "black !important"
  },
  sidenavFull: {
    height: "100%",
    minHeight: "100vh"
  }
});
export { styles };
