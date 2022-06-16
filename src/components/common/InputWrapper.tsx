import { TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';
import {
  Control, Controller, FieldValues, FieldValue,
} from 'react-hook-form';

interface ComponentProps {
  name: string,
  control: Control<FieldValue<FieldValues>, object>,
}

type Props = TextFieldProps & ComponentProps;

const InputWrapper: FC<Props> = ({
  name,
  control,
  error,
  helperText,
  label,
  margin,
  required,
  fullWidth,
  variant,
  type,
  placeholder,
  multiline,
  rows,
  maxRows,
  defaultValue,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        error={error}
        helperText={helperText}
        label={label}
        margin={margin}
        required={required}
        fullWidth={fullWidth}
        variant={variant}
        type={type}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        defaultValue={defaultValue}
      />
    )}
  />
);

export default InputWrapper;
