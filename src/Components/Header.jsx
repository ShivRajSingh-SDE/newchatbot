import React, { useState, useEffect, useRef } from "react";
import { AiFillRobot, AiOutlineSlack } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Header = () => {
  const chatboxRef = useRef(null);
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [rotationAngle, setRotationAngle] = useState(0); // Rotation state

  const API_KEY = "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"; // Paste your API key here

  const createChatLi = (message, className) => {
    const chatLi = (
      <li className={`chat ${className}`} key={chatMessages.length}>
        {className === "outgoing" ? (
          <p>{message}</p>
        ) : (
          <>
            <span className="text-[30px] p-2">
              <AiFillRobot />
            </span>
            <p>{message}</p>
          </>
        )}
      </li>
    );
    return chatLi;
  };

  const generateResponse = async () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
        }),
      };

      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();

      const responseMessage = data.choices[0].message.content.trim();
      setChatMessages([...chatMessages, userMessage, responseMessage]);
      setUserMessage("");
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  const handleChat = () => {
    if (userMessage.trim() === "") return;

    setChatMessages([...chatMessages, userMessage]);
    setUserMessage("");

    setTimeout(() => {
      setChatMessages((prevMessages) => [...prevMessages, "Thinking..."]);
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;

      generateResponse();
    }, 600);
  };

  const handleChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = () => {
    handleChat();
  };

  const handleIconClick = () => {
    // Rotate the icon by 180 degrees on each click
    setRotationAngle((prevAngle) => prevAngle + 180);
  };

  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [chatMessages]);

  return (
    <div className=" justify-center drop-shadow-2xl shadow-2xl items-center h-screen flex flex-col">
      <div className=" w-[90%] md:w-[50%] bg-[#32ca65a6]     rounded-3xl">
        <header className="text md:text-[50px] text-[35px] rounded-t-3xl bg-[#ffffff5b] text-[white]  font-bold">
          <h2>
            Coal<span className="text-[green]">Rule</span>Advisor
          </h2>
        </header>

        <ul className="chatbox bg-[#ffffffa8] p-5" ref={chatboxRef}>
          {chatMessages.map((message, index) => {
            if (message === "Thinking...") {
              return createChatLi(message, "thinking");
            }
            return createChatLi(
              message,
              index % 2 === 0 ? "outgoing" : "incoming"
            );
          })}
        </ul>

        <div className=" flex items-center p-2 bg-[#61c48257] rounded-b-2xl justify-around">
          <textarea
            className="w-[90%]  p-1    rounded-2xl justify-center items-center"
            placeholder="Enter a message..."
            spellCheck="false"
            required
            value={userMessage}
            onChange={handleChange}
          ></textarea>
          <span
            id="send-btn"
            className="material-symbols-rounded"
            onClick={handleIconClick}
          >
            <AiOutlineSlack
              onClick={handleSendMessage}
              className={`text-[30px] transform rotate-${rotationAngle}`}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
