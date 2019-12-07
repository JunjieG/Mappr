import React from "react";

export default function Contact({
  contact,
  setCurrentChatName,
  setReceiverId,
  references
}) {
  // Get the uid of the contact for messaging
  console.log("ref", references);
  console.log("contact", contact);
  let contactId = contact && contact.uid;

  const contactClick = e => {
    // Create user profile picture when clicked
    let clone = e.currentTarget.childNodes[0].cloneNode(true);
    let childTop =
      e.currentTarget.offsetTop -
      e.currentTarget.parentNode.parentNode.offsetTop;
    let top = childTop + 12 + "px";
    clone.style.top = top;
    clone.classList.add("floatingImg");
    document.querySelector("#profile").appendChild(clone);

    function move(elem) {
      elem.style.left = "108px";
      elem.style.top = "30px";
      let width = 0;
      function frame() {
        width++; // update parameters
        elem.style.width = width + "px"; // show frame
        if (width === 68)
          // check finish condition
          clearInterval(id);
      }
      var id = setInterval(frame, 10); // draw every 10ms
    }

    move(document.querySelector(".floatingImg"));

    // Reset chat name
    setCurrentChatName("");

    // Fade out friendlist and fade in chat box
    references[0].current.classList.toggle("fade");
    references[1].current.style.display = "block";
    setTimeout(function() {
      references[1].current.classList.toggle("fade");
    }, 10);
    setCurrentChatName(e.currentTarget.childNodes[1].childNodes[0].innerHTML);
    setReceiverId(contactId);
    document.querySelector("#profile p").classList.add("animate");
    setTimeout(function() {
      // Display chat messages
      document.querySelector("#chat-messages").classList.add("animate");

      // Close button
      document.querySelector(".cx").classList.add("s1");
      document.querySelector(".cy").classList.add("s1");
      setTimeout(function() {
        document.querySelector(".cx").classList.add("s2");
        document.querySelector(".cy").classList.add("s2");
      }, 100);
      setTimeout(function() {
        document.querySelector(".cx").classList.add("s3");
        document.querySelector(".cy").classList.add("s3");
      }, 200);
    }, 100);
  };

  return (
    <div className="friend" onClick={e => contactClick(e)}>
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg" />
      <p>
        <strong>{contact.uid}</strong>
        <span>Last Message</span>
      </p>
    </div>
  );
}
