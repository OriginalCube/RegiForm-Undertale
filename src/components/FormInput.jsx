import React from 'react'
import FormComponents from './FormComponents';

const FormInput = () => {
  const [valid, setValid] = React.useState(false);
  const [value, setValue] = React.useState({
    fullname: "",
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const check = [
    {
      id: 1,
      name: 'fullname',
      type: 'text',
      error: 'fullname should not include any special character!',
      label: 'Fullname',
      pattern: '{3,16}$',
      required: true,
    },
    {
    id: 2,
    name: 'username',
    type: 'text',
    error: 'Username should be 3-16 characters and should not include any special character!',
    label: 'Username',
    pattern: '^[A-Za-z0-9]{3,16}$',
    required: true,
  },
  {
    id: 3,
    name: 'email',
    type: 'email',
    error: 'The given email is not valid!',
    label: 'Email',
    required: true,
  }, 
  {
    id: 4,
    name: 'birthday',
    type: 'date',
    label: 'Birthday',
    required: true,
  },
  {
    id: 5,
    name: 'address',
    type: 'text',
    error: 'Address should be 3-16 characters!',
    label: 'Address',
    pattern: '{3,16}$',
    required: true,
  },
  {
    id: 6,
    name: 'password',
    type: 'password',
    error: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
    label: 'Password',
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  }, 
  {
    id: 7,
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    error: 'The password given does not match',
    pattern: value.password,
    required: true,
  },
];
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setValid(true);
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className='formBody'>
      {!valid?<div><form onSubmit={handleSubmit} style={{textAlign: 'center'}}>
        <p style={{fontSize:'5rem'}} >Register Form</p>
        {check.map((check) => (
          <FormComponents
            pattern={check.pattern}
            placeholder={' '}
            key={check.id}
            {...check}
            value={value[check.name]}
            onChange={onChange}
          />
        ))}
        <button className='submitButton'>Submit</button>
      </form></div>:<div>
        <img style={{position:'absolute', right: '5%'}} src='./assets/images/potrait.png' width='180' alt='' />
        <div className='details'><p style={{marginTop: '7%'}}>FullName: {value.fullname}</p>
          <p>Username: {value.username}</p>
          <p>Email: {value.email}</p>
          <p>Address: {value.address}</p>
          <p>Birthdate: {value.birthday}</p>
          <p>Password: {value.password} sent to my db jk :))</p>
        </div></div>}
    </div>
  )
}

export default FormInput