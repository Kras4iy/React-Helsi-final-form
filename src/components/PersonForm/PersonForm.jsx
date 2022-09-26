import { Button } from '@mui/material';
import React from 'react';
import { Form, Field } from 'react-final-form';
import { SwitchField } from '../SwitchField/SwitchField';
import './PersonForm.scss';

const required = value => (value ? undefined : 'Це поле є обов\'язковим');

const minLength = min => (value) => {
  if (value && (`${value}`).length < min) {
    return `Мінімальна кількість символів ${min}`;
  }

  return undefined;
};

const maxLength = max => value => ((`${value}`).length <= max
  ? undefined
  : `Максимальна кількість символів ${max}`);

const onlyLetters = (value) => {
  if (value) {
    return value.split('').some(char => (
      char.toLowerCase() === char.toUpperCase()))
      ? 'В полі можуть бути тільки літери'
      : undefined;
  }

  return undefined;
};

const onlyNumbers = (value) => {
  const regex = /^\d+$/g;

  if (value && !regex.test(value)) {
    return 'Повинні бути лише цифри';
  }

  return undefined;
};

const isSelected = value => (
  value === 'select' ? 'Оберіть значення' : undefined
);

const isPhoneNumber = (value) => {
  const regex = /(\+38)?[(]?\d{3}[)\-\s]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g;

  if (value && !regex.test(value)) {
    return 'некоректний телефонний номер';
  }

  return null;
};

const isEmailCorrect = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value && !regex.test(value)) {
    return 'Некоректний email';
  }

  return undefined;
};

const isPassport = (value) => {
  const regex = /\d{9}|[a-zA-Z]{2}\d{6}/g;

  if (value && !regex.test(value)) {
    return 'Некоректні дані';
  }

  return undefined;
};

const correctDate = (treshold, futureTime = false) => (value) => {
  if (value) {
    const preparedValue = value.split('.');

    if (preparedValue.some(e => Number.isNaN(+e))) {
      return 'В даті повинні бути лише числа';
    }

    if (preparedValue.some(e => e <= 0)) {
      return 'Числа менше одиниці не можуть бути в даті';
    }

    if (preparedValue.length < 3
      || !preparedValue.every(e => e.length > 0)) {
      return 'Некоректна дата. Приклад - 10.12.2022';
    }

    if (preparedValue[2].length !== 4) {
      return 'Останній рік - 4 цифри. Приклад: 2022';
    }

    if (+preparedValue[2] < 1900) {
      return 'Не вірю що ви такий довгожитель';
    }

    const dateFromUser = new Date(
      preparedValue[2],
      preparedValue[1] - 1,
      preparedValue[0],
    );

    if (dateFromUser.getDate() !== +preparedValue[0]
      || dateFromUser.getMonth() !== +preparedValue[1] - 1) {
      return 'Некоректна дата. Приклад - 10.12.2022';
    }

    if (!futureTime && dateFromUser > new Date()) {
      return 'Ви з майбутнього?';
    }

    if (treshold) {
      const preparedTreshold = treshold.split('.').map(date => +date);

      if (new Date(
        preparedTreshold[2],
        preparedTreshold[1] - 1,
        preparedTreshold[0],
      ) >= dateFromUser) {
        return 'Некоректна дата';
      }
    }

    return undefined;
  }

  return 'Це поле є обов\'язковим';
};

const unzr = (value) => {
  const regex = /\d{8}[-]\d{4}/g;

  if (value && !regex.test(value)) {
    return 'Некоректні дані';
  }

  return undefined;
};

const composeValidators = (...validators) => value => (
  validators.reduce((error, validator) => error || validator(value), undefined)
);

export const PersonForm = () => {
  const onSubmit = (values) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, 0, 2));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <section className="form__section grid">
            <div className="form__item grid__item-1-2">
              <Field
                name="secondName"
                validate={composeValidators(
                  required,
                  onlyLetters,
                  minLength(3),
                  maxLength(20),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="secondName"
                    >
                      Прізвище*
                    </label>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      id="secondName"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div className="form__item grid__item-3-4">
              <Field
                name="firstName"
                validate={composeValidators(
                  required,
                  onlyLetters,
                  maxLength(20),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="firstName"
                    >
                      Ім&apos;я*
                    </label>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      id="firstName"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div className="form__item grid__item-5-6">
              <Field
                name="thirdName"
                validate={composeValidators(
                  minLength(3),
                  onlyLetters,
                  maxLength(20),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <SwitchField
                      {...input}
                      isRequired={false}
                      label="По батькові"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div className="form__item grid__item-1-2">
              <Field
                name="RNOKPP"
                validate={composeValidators(
                  minLength(10),
                  onlyNumbers,
                  maxLength(10),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <SwitchField
                      {...input}
                      isRequired={false}
                      label="РНОКПП(ІПН)"
                    />
                    { meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div className="form__item grid__item-3-4">
              <Field
                name="birthday"
                validate={composeValidators(
                  required,
                  correctDate(),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="birthday"
                    >
                      Дата народження
                    </label>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      placeholder="30.03.2003"
                      id="birthday"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div className="form__item grid__item-5-6">
              <label
                className="form__label"
                htmlFor="sex"
              >
                Стать
              </label>
              <Field
                name="sex"
                component="select"
                className="form__input"
                id="sex"
              >
                <option value="select">--Вибрати--</option>
                <option value="male">Чоловік</option>
                <option value="female">Жінка</option>
              </Field>
              {isSelected(values.sex)
              && <p className="form__error">{isSelected(values.sex)}</p>}
            </div>
          </section>

          <section className="form__section grid">
            <div className="form__item grid__item-1-3">
              <Field
                name="country"
                validate={composeValidators(
                  required,
                  onlyLetters,
                  minLength(3),
                  maxLength(20),
                )
                }
              >
                {({ input, meta }) => (
                  <>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      placeholder="Країна народження*"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="form__item grid__item-4-6">
              <Field
                name="city"
                validate={composeValidators(
                  required,
                  onlyLetters,
                  minLength(3),
                  maxLength(20),
                )
                }
              >
                {({ input, meta }) => (
                  <>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      placeholder="Місце народження*"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="form__item grid__item-1-3">
              <label
                className="form__label"
                htmlFor="preferences"
              >
                Бажаний спосіб зв&apos;язку із пацієнтом
              </label>
              <Field
                name="preferences"
                component="select"
                className="form__input"
                id="preferences"
              >
                <option value="select">--Вибрати--</option>
                <option value="email">Електронною поштою</option>
                <option value="phone">Телефоном</option>
              </Field>
              {isSelected(values.preferences)
              && (
                <p className="form__error">
                  {isSelected(values.preferences)}
                </p>
              )}
            </div>

            <div className="form__item grid__item-4-6">
              <Field
                name="secretWord"
                validate={composeValidators(
                  required,
                  minLength(6),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <input
                      {...input}
                      type="text"
                      className="form__input form__input-without-title"
                      placeholder="Секретне слово (не менше 6 символів)*"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="form__item grid__item-1-3">
              <Field
                name="phone"
                validate={composeValidators(
                  isPhoneNumber,
                  maxLength(13),
                  minLength(10),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="phone"
                    >
                      Контактний номер телефону
                    </label>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      placeholder="+38 (__)___-__-__"
                      id="phone"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="form__item grid__item-4-6">
              <Field
                name="email"
                validate={isEmailCorrect}
              >
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="email"
                    >
                      Адреса електронної пошти
                    </label>
                    <input
                      {...input}
                      type="email"
                      className="form__input"
                      placeholder="example@example.com"
                      id="email"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>
          </section>

          <h2 className="form__title">
            Документ, що посвідчує особу
          </h2>

          <section className="form__section grid">
            <div className="form__item grid__item-1-3">
              <label
                className="form__label"
                htmlFor="document"
              >
                Тип документу*
              </label>
              <Field
                name="document"
                component="select"
                className="form__input"
                id="document"
              >
                <option value="select">
                  --Вибрати--
                </option>
                <option value="document_1">
                  Посвідчення особи, яка потребує додаткового захисту
                </option>
                <option value="document_2">
                  Паспорт (ID-картка)
                </option>
                <option value="document_3">
                  Паспорт (книжечка)
                </option>
                <option value="document_4">
                  Посвідка на постійне проживання в Україні
                </option>
                <option value="document_5">
                  Посвідка біженця
                </option>
                <option value="document_6">
                  Посвіка на проживання
                </option>
                <option value="document_7">
                  Тимчасове посвідчення громадянина України
                </option>

              </Field>
              {isSelected(values.document)
              && (
                <p className="form__error">
                  {isSelected(values.document)}
                </p>
              )}
            </div>

            <div className="form__item grid__item-4-6">
              <Field
                name="seria"
                validate={composeValidators(
                  isPassport,
                  minLength(8),
                  maxLength(9),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <input
                      {...input}
                      type="text"
                      className="form__input form__input-without-title "
                      placeholder="Серія (за наявності),номер.Приклад: AA112233"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="form__item grid__item-1-3">
              <Field name="dateOfIssue" validate={correctDate()}>
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="dateOfIssue"
                    >
                      Коли видано*
                    </label>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      placeholder="31.12.1971"
                      id="dateOfIssue"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="form__item grid__item-4-6">
              <Field
                name="dateOfExpiry"
                validate={correctDate(values.dateOfIssue, true)}
              >
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="dateOfExpiry"
                    >
                      Діє до
                    </label>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      placeholder="31.12.1971"
                      id="dateOfExpiry"
                    />
                    {values.dateOfIssue && meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="
              form__item--last
              form__item
              grid__item-1-3"
            >
              <Field
                name="authority"
                validate={composeValidators(
                  required,
                  minLength(3),
                )}
              >
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="authority"
                    >
                      Ким видано*
                    </label>
                    <input
                      {...input}
                      type="text"
                      className="form__input"
                      id="authority"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="
              form__item
              form__item--additional-info
              grid__item-4-6"
            >
              <Field
                name="UNZR"
                validate={unzr}
              >
                {({ input, meta }) => (
                  <>
                    <label
                      className="form__label"
                      htmlFor="unzr"
                    >
                      Запис № (УНЗР)
                    </label>
                    <input
                      {...input}
                      type="text"
                      className="form__input form__input--after"
                      placeholder="РРРРММДД-ХХХХ"
                      id="unzr"
                    />
                    {meta.error && meta.touched && (
                      <p className="form__error">
                        {meta.error}
                      </p>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div className="grid__item-4-6">
              <p className="form__additional-info">
                Вкажіть унікальний номер запису
                в Демографічному реєстрі (Запис №)
              </p>
            </div>
          </section>

          <Button
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    />
  );
};
