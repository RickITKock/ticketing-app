import axios from "axios";

// Install sass
// Create pages: sign-in, sign-up, current-user (account)

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log("LANDING PAGE");

  if (typeof window === "undefined") {
    const response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );

    return response.data;
  } else {
    return axios
      .create({
        baseUrl: "/",
      })
      .get("/api/users/currentuser");
  }
};

export default LandingPage;
