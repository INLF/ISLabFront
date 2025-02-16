import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WEBSOCKET_URL = "http://localhost:8080/ws"; 
const TOPIC_UPDATES = "/topic/updates"; 

export function useWebSocketService() {
    const [lastMessage, setLastMessage] = useState<string | null>(null);
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        const socket = new SockJS(WEBSOCKET_URL); 
        const client = new Client({
            webSocketFactory: () => socket as WebSocket,
            reconnectDelay: 5000,

            onConnect: () => {
                console.log("WebSocket Connected");

            
                client.subscribe(TOPIC_UPDATES, (message) => {
                    console.log("WebSocket Update:", message.body);
                    setLastMessage(message.body);
                });
            },

            onStompError: (frame) => {
                console.error(" WebSocket Error:", frame);
            },
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    return { lastMessage };
}
