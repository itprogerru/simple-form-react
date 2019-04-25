import React from 'react';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = props => {
  const { type, onChange, value, label, errorMessage } = props;
  const inputType = type || 'text';
  const cls = ['input'];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push('invalid');
  }
console.log('renderInputs');
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input id={htmlFor} type={inputType} value={value} onChange={onChange} />
      {isInvalid(props) ? <span>{errorMessage}</span> || 'введите корректные данные' : null}
    </div>
  );
};

export default Input;
