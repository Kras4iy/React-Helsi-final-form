/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Field } from 'react-final-form';
import { Input } from '../Input/index';
import './PersonForm.scss';

const createField = (name, isRequired = false, type = 'text') => (
  {
    name,
    isRequired,
    type,
  }
);

const fields = {
  secondName: createField('Прізвище', true),
  firstName: createField('Ім`я', true),
  thirdName: createField('По батькові'),
  RNOKPP: createField('РНОКПП(ІПН)'),
  birthday: createField('Дата народження', false, 'date'),
  sex: createField('Стать', true, 'select'),
};

export const PersonForm = () => {
  const onSubmit = (values) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values));
  };

  const validate = (values) => {
    const errors = {};

    if (values.firstName && values.firstName.length < 3) {
      errors.firstName = 'TooShort';
    }

    if (values.secondName && values.secondName.length < 3) {
      errors.secondName = 'TooShort';
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="form">
          <h2>Simple Default Input</h2>
          <div>
            {/* <Field name="firstName">
              {({ input, meta }) => (
                <div className="form__field">
                  <label className="form__label">FirstName</label>
                  <input
                    {...input}
                    type="text"
                    placeholder="UserName"
                    className="form__input"
                  />
                  <p className="form__error">{meta.error}</p>
                </div>
              )}
            </Field> */}

            {Object.keys(fields).map(field => (
              <Field name={field} key={field}>
                {({ input, meta }) => (
                  <div className="form__field">
                    <Input
                      {...input}
                      label={fields[field].name}
                      isRequired={fields[field].isRequired}
                      type={fields[field].type}
                    />
                  </div>
                )}
              </Field>
            ))}

          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
};
