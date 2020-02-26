import React from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { IonItem, IonLabel } from "@ionic/react";
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
  } else if (truncatedText === "") {
    truncatedText = "_No Note Text_";
  }

  return (
    <IonItem onClick={() => onClick(id)}>
      <IonLabel>
        <ReactMarkdown source={truncatedText} />
        <p>{formatDate(createdAt)}</p>
      </IonLabel>
    </IonItem>
  );
}

NoteListItem.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
}