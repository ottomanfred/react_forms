import { useState } from "react";
export default function CredentialsForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiToken, setApiToken] = useState();
  const [apiTokenMessage, setApiTokenMessage] = useState(
    "Thank you for signing up"
  );

  const fetchSignUp = async (event) => {
    event.preventDefault();

    if (!username.length || !password.length) {
      throw new Error("Invalid Username or Password");
    }
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: { username },
            password: { password },
          }),
        }
      );
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setApiToken(parsedResponse.token);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAuthenticate = async (event) => {
    event.preventDefault();

    if (!username.length || !password.length) {
      throw new Error("Invalid Username or Password");
    }
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      const parsedResponse = await response.json();
      setApiTokenMessage(parsedResponse.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button onClick={(event) => fetchSignUp(event)}>Sign Up</button>
      <button onClick={(event) => fetchAuthenticate(event)}>
        Authenticate
      </button>
      <p>
        {apiToken ? apiTokenMessage : "Please sign up to create an account"}
      </p>
    </form>
  );
}
