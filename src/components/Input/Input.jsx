/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import './Input.scss';

export const Input = ({ label, isRequired, type, ...input }) => {
  const [isHide, setIsHide] = useState(false);

  const hidebuttonHandle = () => {
    if (isHide === false) {
      input.onChange('');
    }

    setIsHide(curr => !curr);
  };

  return (
    <>
      <label className="input__label">
        {isRequired ? `${label}*` : label}
      </label>
      <div className="input__wrapper">
        <input
          {...input}
          value={input.value}
          type={type}
          className="input__input"
          disabled={isHide}
        />
        {!isRequired && (
          <Switch
            checked={!isHide}
            onChange={hidebuttonHandle}
            size="small"
          />
        )}
      </div>
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  type: PropTypes.string,
};

Input.defaultProps = {
  isRequired: false,
  type: 'text',
};
