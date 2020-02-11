import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function NoteListItem(props) {
  const React = require('react')
  const ReactDOM = require('react-dom')
  const ReactMarkdown = require('react-markdown')
  
  
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

  // const [stateVariable, setStateValue] = useState(initialValue);
  // const [timesClicked, setTimesClicked] = useState(0);

  return(
    <div className="noteListItem" onClick={() => onClick(id)}>
      <ReactMarkdown source={truncatedText} />
      <p>
        {createdAt}
        {/* {dayjs(createdAt).fromNow()} */}
      </p>
    </div>
  );
}

NoteListItem.propTypes = {
  createdAt: PropTypes.func,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
}