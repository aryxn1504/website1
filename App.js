import { useState } from "react";
import axios from "axios";

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    const res = await axios.post(
      "http://localhost:8000/chat",
      {
        text: message
      }
    );

    setChat([
      ...chat,
      {
        user: message,
        bot: res.data.reply
      }
    ]);

    setMessage("");
  };

  return (
    <div>

      <h1>Jarvis AI</h1>

      {chat.map((msg, i) => (
        <div key={i}>
          <p><b>You:</b> {msg.user}</p>
          <p><b>AI:</b> {msg.bot}</p>
        </div>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
}

export default App;