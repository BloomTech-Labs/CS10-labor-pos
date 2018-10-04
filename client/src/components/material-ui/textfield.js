import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

const StyledTextField = ({
  field,
  form: { touched, errors },
  label,
  ...props
}) => (
  <TextField
    {...field}
    {...props}
    value={field.value || ""}
    error={Boolean(touched[field.name] && errors[field.name])}
    label={(touched[field.name] && errors[field.name]) || label}
  />
);

StyledTextField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object
  }).isRequired
};

export default StyledTextField;
