import React from "react";
import NoteListItem from "./NoteListItem";

export default function NoteListPage(props) {
    function handleListItemClick(id) {
        alert(id + " clicked!")
    }

    return(
        <div className="page">
            <h1>Note List</h1>
            <div className="noteList">
                <NoteListItem 
                    id="123"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lorem, lacinia quis risus ut, euismod maximus lorem. Praesent eu nunc accumsan, blandit purus vitae, lobortis nisl. Vestibulum placerat nisl nulla, vitae semper dui sagittis volutpat."
                    dateTimeText="1/25/2020 5:00pm"
                    onClick={handleListItemClick}
                />
            </div>
        </div>
    );
}