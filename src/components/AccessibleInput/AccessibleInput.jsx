import { useState, useId } from 'react';
import './AccessibleInput.css';

export const AccessibleInput = ({
  label = 'Input',
  type = 'text',
  placeholder = '',
  value: initialValue = '',
  required = false,
  disabled = false,
  readonly = false,
  pattern,
  minlength,
  maxlength,
  error: externalError,
  onChange,
  onBlur,
  className = '',
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(externalError || '');
  const uniqueId = useId();

  const handleInput = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setError('');
    if (onChange) {
      onChange({ value: newValue });
    }
  };

  const handleBlur = (event) => {
    const newValue = event.target.value;
    if (onBlur) {
      onBlur({ value: newValue });
    }
    validate(event.target);
  };

  const handleInvalid = (event) => {
    event.preventDefault();
    setError(event.target.validationMessage);
  };

  const validate = (input) => {
    if (!input.checkValidity()) {
      setError(input.validationMessage);
      return false;
    }
    return true;
  };

  return (
    <div className={`input-wrapper ${className}`}>
      <label
        htmlFor={uniqueId}
      >
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>
      <input
        id={uniqueId}
        type={type}
        placeholder={placeholder}
        value={value}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${uniqueId}` : undefined}
        aria-required={required || undefined}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        pattern={pattern}
        minLength={minlength}
        maxLength={maxlength}
        onInput={handleInput}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        {...props}
      />
      {error && (
        <div id={`error-${uniqueId}`} className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default AccessibleInput;
