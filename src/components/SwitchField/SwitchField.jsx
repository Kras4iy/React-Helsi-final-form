/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import './SwitchField.scss';

export const SwitchField = ({ label, isRequired, ...input }) => {
  const [isHide, setIsHide] = useState(false);
  const [placeholderText, setPlaceHoldertext] = useState('');

  const hidebuttonHandle = () => {
    if (isHide === false) {
      setPlaceHoldertext(`Немає ${label}`);
      input.onChange('');
    } else {
      setPlaceHoldertext('');
    }

    setIsHide(curr => !curr);
  };

  const makeActive = () => {
    setIsHide(false);
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
          type="text"
          className="input__input"
          placeholder={placeholderText}
          disabled={isHide}
          onClick={makeActive}
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

SwitchField.propTypes = {
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};

SwitchField.defaultProps = {
  isRequired: false,
};
