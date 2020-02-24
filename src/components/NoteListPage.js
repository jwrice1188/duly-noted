import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import NoteListItem from "./NoteListItem";
import NoteEditPage from "./NoteEditPage";

export default function NoteListPage(props) {
  const [notes, setNotes] = useState(initialNotes)
  const history = useHistory();

  function handleListItemClick(id) {
    history.push('/notes/edit/${id}');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Note List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          {
            notes.map((note) => {
              return (
                <NoteListItem
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  createdAt={note.createdAt}
                  onClick={handleListItemClick}
                />
              );
            })
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
}

const oneHourAgo = Date.now() - (1 * 60 * 60 * 1000);
const sixDaysAgo = Date.now() - (6 * 24 * 60 * 60 * 1000);
const twoWeeksAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);

const initialNotes = [
  {
    id: "1",
    createdAt: new Date(oneHourAgo),
    text: "React _is_ **fun**!"
  },
  {
    id: "2",
    createdAt: new Date(sixDaysAgo),
    text: ""
  },
  {
    id: "3",
    createdAt: new Date(twoWeeksAgo),
    text: "This is note 3"
  },
];
