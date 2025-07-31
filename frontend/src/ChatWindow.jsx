import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";
import { createContext, useContext, useEffect, useState } from "react";
import { ScaleLoader , PuffLoader } from "react-spinners";

import Chatcomponent from "./Chat.jsx";

function ChatWindow() {
  const { prompt, SetPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat } = useContext(MyContext);

  const [load, setLoad] = useState(false);
  const getReply = async () => {
    setLoad(true);
    setNewChat(false);
    console.log("Message: ", prompt);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log("response : ", res);
      setReply(res.reply);
    } catch (error) {
      console.log("Error", error);
    }
    setLoad(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [...prevChats, { role: "user", content: prompt }, { role: "assistant", content: reply }]);
    }
    SetPrompt("");
  }, [reply]);

  return (
    <>
      <div className="chatWindow">
        <div className="navbar">
          <div className="left-Section">
            <span>
              <button>
                SigmaGPT<i className="fa-solid fa-angle-down"></i>{" "}
              </button>
            </span>
          </div>
          <div className="right-section">
            <li>
              <i className="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; share
            </li>
            <li>
              <i className="fa-solid fa-ellipsis"></i>
            </li>
            <li>
              <i className="fa-solid fa-user userProfile"></i>
            </li>
          </div>
        </div>
        <Chatcomponent />

        <ScaleLoader color="#ffffff80" loading={load} className=" d-flex justify-content-center " />

        <div className="inputfields">
          <div className="one">
            <input
              type="text"
              placeholder="Ask Anything"
              autoFocus
              value={prompt}
              onChange={(e) => {
                SetPrompt(e.target.value);
              }}
              onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
            />
            <button type="submit" onClick={getReply}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>

          <p className=" text-white-50">
            SigmaGPT can make mistakes. Check important info. See <u>Cookie Preferences.</u>
          </p>
        </div>
      </div>
    </>
  );
}

export default ChatWindow;
