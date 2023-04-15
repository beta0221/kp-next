import { useState, useEffect } from "react";

function NotificationStack({ notification }) {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (!notification) { return }

        let id = Date.now()
        notification.id = id
        
        setMessages((prev) => [...prev, notification])
        setTimeout(() => {
            setMessages((prev) => prev.filter(item => item.id != id))
        }, 2000);
    }
    ,[notification])

    return (
        <div className="fixed bottom-2 right-2 w-80">

            {messages.map((message) => (
                <div key={message.id} className="mb-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">{message.title}</strong>
                    <span className="block sm:inline">{message.text}</span>
                </div>
            ))}

        </div>
    );
}

export default NotificationStack;