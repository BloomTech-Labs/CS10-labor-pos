const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    margin: '16px',
    padding: '16px'
  },
  card_title: {
    marginTop: '40px'
  },
  checkbox: {
    marginTop: '32px'
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
  delete: {
    textAlign: 'center',
    paddingLeft: '80px'
  },
  field: {
    backgroundColor: theme.palette.background.textfield,
    margin: '10px',
    width: '90%'
  },
  field_small: {
    width: '90%'
  },
  form_control_label: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  group: {
    margin: 'auto'
  },
  highlight: {
    color: '#ffeb3b'
  },
  image: {
    margin: 'auto'
  },
  image_large: {
    maxWidth: '700px'
  },
  item_card: {
    backgroundColor: theme.palette.background.paper,
    height: '256px',
    maxWidth: '256px',
    margin: 'auto',
    textAlign: 'left',
    padding: '20px'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  limit_width: {
    width: '75%',
    maxWidth: '60%'
  },
  list_item_light: {
    padding: '10px',
    backgroundColor: theme.palette.lightened_background,
  },
  list_item_reg: {
    padding: '10px',
    backgroundColor: theme.palette.background.paper
  },
  main_content: {
    textAlign: 'center',
    margin: 'auto',
    width: '80%',
    maxWidth: '900px',
    marginTop: '32px',
    marginBottom: '32px',
    padding: '16px 32px',
    backgroundColor: theme.palette.background.default
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  menuitems: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default
  },
  modal: {
    padding: '20px',
    width: '100%',
    maxWidth: '600px',
    margin: 'auto'
  },
  nav_menu: {
    display: 'flex',
    flexDirection: 'column'
  },
  new_card: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '180px',
    margin: 'auto'
  },
  padded_button: {
    margin: '16px'
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
  paper_color: {
    backgroundColor: theme.palette.background.paper
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  sidenav: {
    backgroundColor: `${theme.palette.background.sidenav} !important`
  },
  sidenavFull: {
    height: '100%',
    minHeight: '100vh'
  },
  sidenav_top: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  space_above: {
    margin: '22px 0px'
  },
  space_below: {
    marginBottom: '22px'
  },
  start_card: {
    minWidth: '40px',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    padding: '40px',
    width: '80%',
    maxWidth: '900px'
  },
  state_field: {
    fontFamily: 'Source Sans Pro, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
    height: '24px',
    border: '0',
    borderBottom: '1px solid',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    maxWidth: '75%'
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    backgroundColor: theme.palette.background.default
  },
  textField: {
    flexBasis: 'auto',
    width: '90%'
  },
  typography: {
    paddingTop: '20px',
    fontSize: '24px',
    fontWeight: '900',
    fontFamily: 'Source Sans Pro, sans-serif'
  },
  typography_card: {
    paddingTop: '10px',
    paddingBottom: '30px',
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Source Sans Pro'
  },
  typography_paragraph: {
    paddingTop: '20px',
    fontSize: '18px',
    fontWeight: '300',
    fontFamily: 'Source Sans Pro, sans-serif',
    letterSpacing: 1
  },
  typography_paragraph_landing: {
    paddingTop: '20px',
    fontSize: '18px',
    fontWeight: '300',
    fontFamily: 'Source Sans Pro, Arial, sans-serif'
  },
  typography_title: {
    fontSize: '40px',
    fontFamily: "'Cinzel', serif"
  },
  typography_title_checkout: {
    fontFamily: "'Cinzel', serif",
    fontSize: '32px'
  },
  typography_title_landing: {
    fontFamily: "'Cinzel', serif",
    fontSize: '32px',
    textShadow: '1px 3px black'
  }
});
export { styles };
