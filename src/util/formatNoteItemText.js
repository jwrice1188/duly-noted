export default function formatNoteItemText(text) {
  text.trim();
  text.replace(/\n\s*\n/g, "\n");
  
  if (text.length > 200) {
    text = text.substring(0, 201) + "...";
  } else if (text === null || text === 'undefined') {
    text = "_No Note Text_";
  }
  return text;
}