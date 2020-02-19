import React from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import formatDate from "../util/formatDate";

export default function NoteListItem(props) {

  const {
    createdAt,
    id,
    onClick = () => { },
    text,
  } = props;

  var truncatedText = text.trim();

  if (truncatedText.length > 200) {
    truncatedText = truncatedText.substring(0, 201) + "...";
  } else if (truncatedText === ""){
    truncatedText = "No Note Text";
  }

  return (
    <div className="noteListItem" onClick={() => onClick(id)}>
      <ReactMarkdown source={truncatedText} />
      <p>{formatDate(createdAt)}</p>
    </div>
  );
}

NoteListItem.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
}