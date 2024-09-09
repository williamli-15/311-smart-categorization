import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

/**
 * This produces a button that will have a loading animation while the isLoading property is true.
 */
const LoadButton = ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  onClick,  // Add onClick prop
  ...props
}) => (
  <Button
    type="button"  // Add type="button" to prevent form submission
    className={`LoadButton ${className}`}
    disabled={disabled || isLoading}
    onClick={(e) => {
      e.preventDefault(); // Prevent default behavior
      if (onClick) onClick(e); // Call passed onClick handler
    }}
    {...props}
  >
    {isLoading && <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />}{' '}
    {isLoading ? loadingText : text}
  </Button>
);

export default LoadButton;
