//get the form by its id
const form = document.getElementById("contact-form"); 

//1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  //2.
  let mail = new FormData(form);

  //3.
  sendMail(mail);
});

const sendMail = (mail) => {
    fetch("", {
      method: "post",
      body: mail,
    }).then((response) => {
      return response.json();
    });
  };
