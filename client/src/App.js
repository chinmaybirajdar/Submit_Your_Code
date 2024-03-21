import { useState } from "react";
import { useNavigate } from "react-router-dom";

const language = ["---Select one---", "C++", "Python", "Java", "Javascript"];

function App() {
  const [username, setUsername] = useState("");
  const [programminglanguage, setProgramminglanguage] =
    useState("---Select one---");
  const [stdin, setStdin] = useState("");
  const [sourcecode, setSourcecode] = useState("");
  let navigate = useNavigate();

  async function HandleSubmit(e) {
    e.preventDefault();
    // console.log(username);
    // console.log(programminglanguage);
    // console.log(stdin);
    // console.log(sourcecode);

    const myData = {
      user: username,
      lang: programminglanguage,
      stdin: stdin,
      sourcecode: sourcecode,
    };
    if (
      username !== "" &&
      programminglanguage !== "" &&
      stdin !== "" &&
      sourcecode !== ""
    ) {
      try {
        const result = await fetch("https://submit-your-code-api.vercel.app/user", {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "credentials": "include"
          },
          body: JSON.stringify(myData),
        });

        const response = await result.json();
        console.log(response);
        setUsername("");
        setProgramminglanguage("");
        setStdin("");
        setSourcecode("");
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleClick = async () => {
    try {
      const data = await fetch("https://submit-your-code-api.vercel.app/user", {
        mode: "no-cors",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "credentials": "include",
        },
      });
      const response = await data.json();
      console.log(response.result);

      navigate("/table", { state: { tableData: response.result } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-box">
      <h1 style={{ height: 50 }}> Submit Your Code Here</h1>
      <form onSubmit={HandleSubmit}>
        <div className="box-element" style={{ gap: 200, flexGrow: 0.5 }}>
          <label>UserName:</label>
          <input
            type="text"
            style={{
              width: 500,
              height: 30,
              paddingLeft: 3,
              borderRadius: 5,
              borderWidth: 1,
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="box-element" style={{ gap: 107, flexGrow: 0.5 }}>
          <label>Preferred Code Language:</label>
          <select
            value={programminglanguage}
            style={{ width: 500, height: 30, borderRadius: 5 }}
            onChange={(e) => {
              setProgramminglanguage(e.target.value);
            }}
          >
            {language.map((lang) => (
              <option value={lang} key={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="box-element" style={{ gap: 240, flexGrow: 0.5 }}>
          <label>Stdin: </label>
          <input
            type="text"
            style={{
              width: 500,
              height: 30,
              paddingLeft: 3,
              borderRadius: 5,
              borderWidth: 1,
            }}
            value={stdin}
            onChange={(e) => {
              setStdin(e.target.value);
            }}
          />
        </div>
        <div className="box-element" style={{ gap: 200, flexGrow: 30 }}>
          <label>Sourcecode: </label>
          <textarea
            type="text"
            rows="10"
            cols="20"
            style={{
              width: 500,
              height: 250,
              paddingLeft: 3,
              paddingTop: 3,
              borderRadius: 10,
            }}
            value={sourcecode}
            onChange={(e) => {
              setSourcecode(e.target.value);
            }}
          />
        </div>
        <div className="buttons">
          <button
            type="submit"
            style={{
              width: 100,
              height: 30,
              cursor: "pointer",
              borderRadius: 20,
            }}
          >
            {" "}
            Submit{" "}
          </button>
          <button
            type="button"
            style={{
              width: 200,
              height: 30,
              cursor: "pointer",
              borderRadius: 40,
            }}
            onClick={handleClick}
          >
            Show All Submissions
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
