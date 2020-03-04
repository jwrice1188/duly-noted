import React from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { IonItem, IonLabel } from "@ionic/react";
import formatDate from "../util/formatDate";
import formatNoteItemText from "../util/formatNoteItemText";

export default function NoteListItem(props) {

  const {
    createdAt,
    id,
    onClick = () => { },
    text,
  } = props;

  return (
    <IonItem onClick={() => onClick(id)}>
      <IonLabel>
        <ReactMarkdown source={formatNoteItemText(text)} />
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
  isArchived: PropTypes.bool.isRequired
}