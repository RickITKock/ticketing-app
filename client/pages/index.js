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
  console.log(context);

  if (typeof window === "undefined") {
    // We are on the serve

    const response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );

    return response.data;

    // try {
    // const { data } = await axios.get({

    //   // baseURL: "ticketing.dev",
    //   // "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    //   // headers: {
    //   //   Host: "ticketing.dev",
    //   // },
    // });
    // const { data } = await axios.get(
    //   "ingress-nginx-controller.ingress-nginx.svc.cluster.local"
    // );

    // console.log(data);
    // return data;
    // } catch (error) {
    //   console.log("Error occurred");
    //   console.error(error);
    // }
  } else {
    // We must be on the browser
    console.log("On the browser");
    const { data } = await axios.get("/api/users/currentuser");
    console.log(data);

    return data;
  }
};

export default LandingPage;
