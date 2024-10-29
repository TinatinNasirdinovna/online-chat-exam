"use client";
import { useEffect, useState } from "react";
import scss from "./ChatWebSocket.module.scss";
import ChatLists from "./ChatLists/ChatLists";

interface IChatWebSocket {
  username: string;
  photo: string;
  message: string;
}

const ChatWebSocket = ({userInfo}):any => {
  console.log( "userInfo",userInfo?.user?.image);
  
  const [messages, setMessages] = useState<IChatWebSocket[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputValue, setInputValue] = useState("");

  const initialWebSocket = () => {
    const ws = new WebSocket("wss://api-v2.elchocrud.pro");
    ws.onopen = () => {
      console.log("WebSocket opened");
    };
    ws.onmessage = (event) => {
      setMessages(JSON.parse(event.data));
    };
    ws.onerror = (error) => {
      console.log(error);
    };
    ws.onclose = () => {
      console.log("WebSocket closed");
      initialWebSocket();
    };
    setSocket(ws);
  };

  const sendMessage = () => {
    if (!inputValue) return;
    const messageData = {
      event: "message",
      username: userInfo?.user?.name,
      photo: userInfo?.user?.image,
      message: inputValue,
    };

    socket?.send(JSON.stringify(messageData));
    setInputValue("");
  };

  useEffect(() => {
    initialWebSocket();
  }, []);

  return (
    <section className={scss.ChatWebSocket}>
      <div className="container">
        <div className={scss.ChatWebSocketContent}>
          <ChatLists />
          <div className={scss.content}>
            <h1>Growth Hungry 🔥</h1>
            <div className={scss.sendingMess}>
              <input
                value={inputValue}
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button onClick={sendMessage}>send</button>
            </div>
            <div className={scss.messContent}>
              {messages.map((item, index) => (
                <div key={index} style={{
                      marginLeft:
                        item.username === userInfo?.user?.name ? "auto" : 0,
                    }}>
                  <div
                    className={scss.message}
                    
                  >
                    <img src={item.photo} alt="avatar" />
                    <div className={scss.messageContent}>
                      <h3>{item.username}</h3>
                      <p>{item.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatWebSocket;
