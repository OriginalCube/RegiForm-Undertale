import React from 'react'

const FormComponents = (props) => {
    const [focused, setFocused] = React.useState(false);
    const { label, error, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };
    return (
    <div className='inputWrapper'>
      <label>{label}</label><br/>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      /><br/>
      <span className='errorMessage' style={{marginTop:'2.5%',color:'crimson'}}>{error}</span>
    </div>
    )
}

export default FormComponents