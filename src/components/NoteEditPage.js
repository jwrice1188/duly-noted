import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonActionSheet,
  IonAlert
} from "@ionic/react";
import { chevronBack, ellipsisHorizontal, trash, close, albums } from "ionicons/icons";
import styles from "./NoteEditPage.module.css";

export default function NoteEditPage(props) {
  const { onSave, onDelete, onArchive, text } = props;

  const [value, setValue] = useState(text);
  const [showActions, setShowActions] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton color="secondary" onClick={() => onSave(value)}>
              <IonIcon slot="icon-only" icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Note Edit</IonTitle>
          <IonButtons slot="primary">
            <IonButton color="secondary" onClick={() => setShowActions(true)}>
              <IonIcon slot="icon-only" icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <textarea className={styles.textArea} value={value} onChange={handleChange} />
        <IonActionSheet
          isOpen={showActions}
          onDidDismiss={() => setShowActions(false)}
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => setShowAlert(true)
            },
            {
              text: "Archive",
              icon: albums,
              handler: onArchive
            },
            {
              text: "Cancel",
              role: "cancel",
              icon: close,
              handler: () => setShowActions(false)
            }
          ]}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Delete?'}
          message={'Are you sure you want to delete this note?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowAlert(false)
            },
            {
              text: 'Delete',
              handler: onDelete
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
}

NoteEditPage.propTypes = {
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};