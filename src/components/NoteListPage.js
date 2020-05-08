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
import { useTranslation } from "react-i18next";
import { gql, useMutation, useQuery } from "@apollo/client";
import NoteListItem from "./NoteListItem";

const GET_NOTES = gql`
  {
    notes(includeArchived: true) {
      id
      createdAt
      isArchived
      text
    }
  }
`;  

const CREATE_NOTE = gql`
  mutation createNote($note: CreateNoteInput!) {
    createNote(note: $note) {
      id
      createdAt
      isArchived
      text
    }
  }
`;

export default function NoteListPage(props) {
  const [createNote] = useMutation(CREATE_NOTE, {
    onCompleted(data) {
      if(data && data.createNote) {
        const id = data.createNote.id;
        history.push(`/notes/edit/${id}`);
      }
    },
    refetchQueries: [
      {
        query: GET_NOTES
      }
    ]
  });
  const { data, error, loading } = useQuery(GET_NOTES, {
    pollInterval: 5000
  });
  // const { createNote } = useNotes();
  const history = useHistory();
  const [showActive, setShowActive] = useState(false);
  const { t } = useTranslation();

  if (loading) {
    return "Loading..." //TODO: eventually show a loading spinner
  }

  if (error) {
    return `${error}`; // Display errors on page for now
  }

  const notes = (data && data.notes) || [];

  let filteredNotes;
    if (showActive) {
      filteredNotes = notes.filter((note) => note.isArchived !== true);
    } else {
      filteredNotes = notes;
    }

  const handleListItemClick = (id) => {
    history.push(`/notes/edit/${id}`);
  };

  const handleNewNoteClick = () => {
    createNote({
      variables: {
        note: {
          text: ""
        }
      }
    });
  };

  const handleArchiveFilterClick = () => {
    setShowActive(!showActive);
  };

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
            filteredNotes.map((note) => {
              return (
                <NoteListItem
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  createdAt={new Date(note.createdAt)}
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