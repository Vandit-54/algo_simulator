import { useState } from "react";

function Input({
  index,
  labelName,
  name,
  input,
  handleFormChange,
  placeholder,
  removeFields,
  display,
  type
}) {
  return (
    <div>
      <label htmlFor={name}>{labelName}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={input}
        onChange={(event) => handleFormChange(index, event)}
      />
      <button style={{display: display}} onClick={() => removeFields(index)}>Remove</button>
    </div>
  );
}

export default Input;
