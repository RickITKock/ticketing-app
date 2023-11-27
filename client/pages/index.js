// Install sass
// Create pages: sign-in, sign-up, current-user (account)

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async () => {
  console.log("LANDING PAGE");

  // Create a request to get user so we can check if user is signed in or not
  return {};
};

export default LandingPage;
