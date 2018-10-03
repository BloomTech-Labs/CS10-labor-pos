import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

const StyledTextField = ({
  field,
  form: { touched, errors },
  label,
  options,
  ...props
}) => (
  <TextField
    {...field}
    {...props}
    value={field.value || ""}
    error={Boolean(touched[field.name] && errors[field.name])}
    label={(touched[field.name] && errors[field.name]) || label}
    select
    SelectProps={{ native: true }}
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
  }).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string
    })
  )
};

export default StyledTextField;
