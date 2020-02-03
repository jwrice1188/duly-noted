import React from "react";
import PropTypes from "prop-types";

export default function NoteListItem (props){
    const { id } = props;
    const { text } = props;
    const { dateTimeText } = props;
    const { onclick } = props;

    return (
        <div className="page">
                <div className="noteListItem">
                    <p>{text}</p>
                    <p>{dateTimeText}</p>
                </div>
        </div>
    );
}

NoteEditPage.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateTimeText: PropTypes.string.isRequired,
    onclick: PropTypes.func        
    }
};