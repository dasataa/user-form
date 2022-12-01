import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export const Register = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    occupations: [],
    states: [{ name: '', abbreviation: '' }],
  });

  const {
    fullname,
    email,
    password,
    // confirmPassword,
    occupations,
    states,
    name,
    abbreviation,
    label,
    errorMessage,
    id,
    ...inputProps
  } = values;

  const getData = async () => {
    const reqdata = await fetch(
      'https://frontend-take-home.fetchrewards.com/form'
    );
    const resdata = await reqdata.json();
    // console.log(resdata);
    setValues(await resdata);
  };

  useEffect(() => {
    getData();
  }, []);

  const inputs = [
    {
      id: 1,
      name: 'fullName',
      type: 'text',
      placeholder: 'John Doe',
      errorMessage:
        'Full Name should be 3-16 characters and should not include any special character!',
      label: 'Full Name *',
      pattern: '^[A-Za-z0-9 ]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'johndoe@email.com',
      errorMessage: 'Enter a valid email address!',
      label: 'Email *',
      required: true,
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password *',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    // {
    //   id: 5,
    //   name: 'confirmPassword',
    //   type: 'password',
    //   placeholder: 'Confirm Password',
    //   errorMessage: 'Passwords does not match!',
    //   label: 'Confirm Password *',
    //   pattern: values.password,
    //   required: true,
    // },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const sendData = Object.fromEntries(formData.entries());

    // let response = await fetch('https://frontend-take-home.fetchrewards.com/form', {
    //     method: 'POST',
    //     body: JSON.stringify(sendData),
    // });
    // const result = await response.json();

    // console.log(Object.fromEntries(sendData.entries()));
    fetch('https://frontend-take-home.fetchrewards.com/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: sendData,
      //   body: JSON.stringify(sendData),
    })
      .then((res) => {
        return res.json;
      })
      .then((data) => console.log(data))
      .catch((err) => console.log('ERROR'));

    console.log(JSON.stringify(sendData));
    console.log(sendData);
    console.log('new user added');

    router.push({ pathname: '/success'});
  };

  const onChangeInput = (e) => {
    setValues({
      [e.target.name]: e.target.value,
      ...values,
    });
  };

  return (
    <main>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>Register</h1>
        <section className={styles.formInput}>
          {inputs.map((input) => (
            <FormInputs
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChangeInput}
            />
          ))}
          <span className={styles.span}>{errorMessage}</span>
        </section>
        <section className={styles.formSelection}>
          {/* occupation select options */}
          <label className={styles.label}>Occupation *</label>
          <select
            required
            name='occupations'
            className={styles.selection}
            // value={occupations}
            onChange={onChangeInput}
          >
            {/* <option>-- select occupation --</option> */}
            {occupations &&
              occupations?.map((data, index) => {
                return (
                  <option
                    onChange={onChangeInput}
                    required
                    key={data.index}
                    value={data.index}
                  >
                    {data}
                  </option>
                );
              })}
          </select>

          {/* state select options */}
          <label className={styles.label}>State *</label>
          <select
            required
            name='states'
            className={styles.selection}
            // value={states}
            onChange={onChangeInput}
          >
            {/* <option>-- select state --</option> */}
            {states &&
              states.map((data, index) => {
                return (
                  <option
                    onChange={onChangeInput}
                    required
                    key={data.index}
                    value={data.index}
                  >
                    {`${data.name} - ${data.abbreviation}`}
                  </option>
                );
              })}
          </select>
          <button className={styles.button}>Submit</button>
        </section>
      </form>
    </main>
  );
};

// form inputs itaration
export const FormInputs = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChangeInput, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={styles.formInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        {...inputProps}
        onChange={onChangeInput}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className={styles.span}>{errorMessage}</span>
    </div>
  );
};
