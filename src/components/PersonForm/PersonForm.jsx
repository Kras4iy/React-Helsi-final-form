/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Field } from 'react-final-form';
import { Input } from '../Input/index';
import './PersonForm.scss';

const createInput = (name, isRequired = false, type = 'text') => (
  {
    name,
    isRequired,
    type,
  }
);

const createSelect = (name, isRequired = false, values = []) => (
  {
    name,
    isRequired,
    values,
    type: 'select',
  }
);

const firstSection = {
  secondName: createInput('Прізвище', true),
  firstName: createInput('Ім`я', true),
  thirdName: createInput('По батькові'),
  RNOKPP: createInput('РНОКПП(ІПН)'),
  birthday: createInput('Дата народження', false, 'date'),
  sex: createSelect('Стать', true, ['Чоловік', 'Жінка']),
};

const secondSection = {
  country: createInput('Країна народження', true),
  city: createInput('Місце народження', true),
  preferences: createSelect(
    'Бажаний спосіб зв`язку з пацієнтом',
    false,
    ['Електронною поштою',
      'Телефоном'],
  ),
  secretWord: createInput('Секретне слово', true),
  phoneNumber: createInput('Контактний номер телефону', false),
  email: createInput('Aдреса електронної пошти', false),
};

const onLong = value => (value ? undefined : 'Required');

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
          <section className="form__block">
            {Object.keys(firstSection).map((key) => {
              switch (firstSection[key].type) {
                case 'select':
                  console.log(firstSection[key].values);

                  return (
                    <Field
                      name={key}
                      key={key}
                      component={firstSection[key].type}
                    >
                      <option> -Вибрати- </option>
                      {firstSection[key].values.map(value => (
                        <option key={value}>{value}</option>))}
                    </Field>
                  );

                default:
                  return (
                    <Field name={key} key={key} validate={onLong}>
                      {({ input, meta }) => (
                        <div className="form__field">
                          <Input
                            {...input}
                            label={firstSection[key].name}
                            isRequired={firstSection[key].isRequired}
                            type={firstSection[key].type}
                          />
                          {meta.error && meta.touched
                      && (
                        <p className="form__error">
                          {meta.error}
                        </p>
                      )}
                        </div>
                      )}
                    </Field>
                  );
              }
            })}

          </section>

          <section className="form__block">
            {Object.keys(secondSection).map((key) => {
              switch (secondSection[key].type) {
                case 'select':
                  console.log(secondSection[key].values);

                  return (
                    <Field
                      name={key}
                      key={key}
                      component={secondSection[key].type}
                    >
                      <option> -Вибрати- </option>
                      {secondSection[key].values.map(value => (
                        <option key={value}>{value}</option>))}
                    </Field>
                  );

                default:
                  return (
                    <Field name={key} key={key} validate={onLong}>
                      {({ input, meta }) => (
                        <div className="form__field">
                          <Input
                            {...input}
                            label={secondSection[key].name}
                            isRequired={secondSection[key].isRequired}
                            type={secondSection[key].type}
                          />
                          {meta.error && meta.touched
                      && (
                        <p className="form__error">
                          {meta.error}
                        </p>
                      )}
                        </div>
                      )}
                    </Field>
                  );
              }
            })}
          </section>

          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
};
