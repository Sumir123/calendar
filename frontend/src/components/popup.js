import React from "react";
import axios from "axios";
const Popup = (props) => {
  var popup = document.querySelector(".popup-container");
  if (popup) {
    popup.parentElement.remove();
    return;
  }

  //hide popup
  const hidePopup = (e) => {
    const popup = document.querySelector(".popup-container").attributes;
    var dataId = popup.data.value;
    document.querySelector("#" + dataId).parentElement.remove();
  };

  //handle save
  const handleSave = (e) => {
    e.preventDefault(e);
    const title = document.getElementById("text").value;
    var date = props.data.dateStr;
    const event = { title: title, date: date };
    console.log(event);
    axios
      .post("https://calander.onrender.com/api/events", {
        event,
      })
      .then(
        (response) => {
          console.log(response);
          hidePopup();
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div
      className="popup-container"
      id={props.data.counter}
      data={props.data.counter}
    >
      <div className="inline">
        <p className="date"> Date:{props.data.dateStr}</p>
        <button className="button right q" onClick={hidePopup}>
          X
        </button>
      </div>
      <form className="popup">
        <input type="text" id="text" placeholder="Add title" name="title" />
        <button className="button" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Popup;
