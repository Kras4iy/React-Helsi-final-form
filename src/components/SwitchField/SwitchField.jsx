import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import './SwitchField.scss';

export const SwitchField = ({ label, isRequired, ...input }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [placeholderText, setPlaceHoldertext] = useState('');

  const handleHideButton = () => {
    if (isHidden === false) {
      setPlaceHoldertext(`Немає ${label}`);
      input.onChange('');
    } else {
      setPlaceHoldertext('');
    }

    setIsHidden(curr => !curr);
  };

  const makeActive = () => {
    setIsHidden(false);
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
          disabled={isHidden}
          onClick={makeActive}
        />
        {!isRequired && (
          <Switch
            checked={!isHidden}
            onChange={handleHideButton}
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
