import React, { useState } from "react";
import PropTypes from "prop-types";

export default function NoteEditPage(props) {
  const { onSave, onCancel, onDelete, text } = props;

  const [value, setValue] = useState(text);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div className="page">
      <h1>Note Edit</h1>
      <textarea value={value} onChange={handleChange} /><br></br>
      <button type="button" onClick={() => onSave(value)}>Save Note</button>
      <button type="button" onClick={() => onDelete()}>Delete Note</button>
      <button type="button" onClick={() => onCancel()}>Cancel</button>
    </div>
  );
}

NoteEditPage.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};