import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function formatDate(date) {
  if(date >= Date.now() - (1*7 * 24 * 60 * 60 * 1000)){
    return dayjs(date).fromNow();
  } else {
    return dayjs(date).format("h:mm a on M/D/YYYY");
  }
}

export default function NoteListItem(props) { 
  
  const { 
    createdAt, 
    id, 
    onClick = () => {},
    text, 
  } = props;

  var truncatedText = text;

  if(truncatedText.length > 200){
    truncatedText = truncatedText.substring(0, 201) + "...";
  }

  return(
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