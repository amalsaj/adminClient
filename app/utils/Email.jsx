const sendResetLink = (e) => {
  e.preventDefault();
  if (!email) {
    setMessage("Please enter your email address");
    return;
  }
  const templateParams = {
    user_email: email,
    reset_link: `https://yourwebsite.com/reset-password?email=${email}`,
  };

  emailjs
    .send(
      "service_6jwnusv",
      "template_saa6u9a",
      templateParams,
      "R54vonq60--MSFUad"
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response);
        setMessage("Password reset link sent! Check your inbox.");
      },
      (err) => {
        console.error("FAILED...", err);
        setMessage("Failed to send reset link. Please try again later.");
      }
    );
};
export default sendResetLink;
