import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { add, funnel } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import NoteListItem from "./NoteListItem";
import useNotes from "../hooks/useNotes";
import { useTranslation } from "react-i18next";

export default function NoteListPage(props) {
  const { notes, createNote } = useNotes();
  const history = useHistory();
  const activeNotes = notes.filter((note) => note.isArchived !== true);
  const [showActive, setShowActive] = useState(activeNotes);
  const { t } = useTranslation();

  const handleListItemClick = (id) => {
    history.push(`/notes/edit/${id}`);
  };

  const handleNewNoteClick = () => {
    const { id } = createNote();
    history.push(`/notes/edit/${id}`);
  };

  const handleArchiveFilterClick = () => {
    if (showActive === notes) {
      setShowActive(activeNotes);
    } else {
      setShowActive(notes);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton color="secondary" onClick={handleArchiveFilterClick}>
              <IonIcon slot="icon-only" icon={funnel} />
            </IonButton>
          </IonButtons>
          <IonTitle>{t("noteListPageTitle")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          {
            showActive.map((note) => {
              return (
                <NoteListItem
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  createdAt={note.createdAt}
                  isArchived={note.isArchived}
                  onClick={handleListItemClick}
                />
              );
            })
          }
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleNewNoteClick}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}