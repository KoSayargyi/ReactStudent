import React, { useEffect } from "react";
import "../index.css";

function Footer() {
  useEffect(() => {
    const dropdowns = document.getElementsByClassName("dropdown-btn");
    const handleClick = (event) => {
      event.currentTarget.classList.toggle("active");
      const dropdownContent = event.currentTarget.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    };

    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener("click", handleClick);
    }

    return () => {
      for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div id="testfooter">
      <span>Copyright &#169; ACE Inspiration 2022</span>
    </div>
  );
}

export default Footer;
