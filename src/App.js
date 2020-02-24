import React from 'react';
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import NoteEditPageController from "./components/NoteEditPageController.js";
import NoteListPage from './components/NoteListPage';
import "./ionicStyles";

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exaxt path="/notes/edit/:id" component={NoteEditPageController} />
          <Route exact path="/notes" component={NoteListPage} />
          <Redirect exact from="/" to="/notes" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;