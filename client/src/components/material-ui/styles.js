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
    margin: "16px",
    padding: "16px"
  },
  modal: {
    padding: "20px",
    width: "100%",
    maxWidth: "600px",
    margin: "auto"
  },
  item_card: {
    backgroundColor: theme.palette.background.paper,
    height: "256px",
    maxWidth: "256px",
    margin: "auto"
  },
  new_card: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: "180px",
    margin: "auto"
  },
  card_title: {
    marginTop: "40px"
  },
  field: {
    backgroundColor: theme.palette.background.textfield,
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
  field_small: {
    width: "90%"
  },
  padded_button: {
    margin: "16px"
  },
  nav_menu: {
    display: "flex",
    flexDirection: "column"
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
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
    margin: "auto"
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
    fontFamily: "Source Sans Pro, sans-serif"
  },
  typography_paragraph: {
    paddingTop: "20px",
    fontSize: "18px",
    fontWeight: "300",
    fontFamily: "Source Sans Pro, sans-serif",
    letterSpacing: 1,
  },
  typography_title: {
    fontSize: "40px",
    fontFamily: "'Cinzel', serif"
  },
  typography_title_checkout: {
    fontFamily: "'Cinzel', serif",
    fontSize: "32px"
  },
  typography_title_landing: {
    fontFamily: "'Cinzel', serif",
    fontSize: "32px",
    textShadow: "1px 3px black"
  },
  typography_paragraph_landing: {
    paddingTop: "20px",
    fontSize: "18px",
    fontWeight: "300",
    fontFamily: "Source Sans Pro, Arial, sans-serif"
  },
  image_large: {
    maxWidth: "700px"
  },
  main_content: {
    textAlign: "center",
    margin: "auto",
    width: "80%",
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
    // maxWidth: "80%",
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  dark_paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.paper,
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
  form_control_label: {
    display: "flex",
    justifyContent: "flex-start"
  },
  state_field: {
    fontFamily: "Source Sans Pro, Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19px",
    height: "24px",
    border: "0",
    borderBottom: "1px solid",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    maxWidth: "75%"
  },
  sidenav: {
    backgroundColor: `${theme.palette.background.sidenav} !important`
  },
  sidenavFull: {
    height: "100%",
    minHeight: "100vh"
  },
  paper_color: {
    backgroundColor: theme.palette.background.paper
  },
  space_above: {
    margin: "22px 0px"
  },
  space_below: {
    marginBottom: "22px"
  },
  limit_width: {
    width: "75%",
    maxWidth: "60%"
  },
  typography_card: {
    paddingTop: "10px",
    paddingBottom: "30px",
    fontSize: "24px",
    fontWeight: "700",
    fontFamily: "Source Sans Pro"
  },
  start_card: {
    minWidth: "40px",
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    padding: "40px",
    width: "80%",
    maxWidth: "900px"
  },
  delete: {
    textAlign: "center",
    paddingLeft: "80px"
  }
});
export { styles };
