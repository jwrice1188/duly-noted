import React from "react";
import PropTypes from "prop-types";

export default function NoteEditPage(props){
    const { text } = props;


    return (
        <div className="page">
            <h1>Note Edit</h1>
            <textarea>
                {text}
            </textarea>
        </div>
    );
}

NoteEditPage.propTypes = {
    text: PropTypes.string.isRequired
};