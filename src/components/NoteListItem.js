import React from "react";
import PropTypes from "prop-types";
import Truncate from "react-truncate";

export default function NoteListItem(props) {
    const { 
        id, 
        text, 
        dateTimeText, 
        onClick = () => {},
    } = props;

    return(
        <div className="noteListItem" onClick={() => onClick(id)}>
            <p>
                <Truncate maxLength={200} ellipsis="...">
                    {text}
                </Truncate>
            </p>
            <p>
                {dateTimeText}
            </p>
        </div>
    );
}

NoteListItem.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateTimeText: PropTypes.string.isRequired,
    onClick: PropTypes.func
}