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
  onClick,
  ...props
}) => (
  <Button
    type="button"
    className={`LoadButton ${className}`}
    disabled={disabled || isLoading}
    onClick={(e) => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
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
