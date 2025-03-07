import { io } from "socket.io-client"
import { useAtom, atom } from "jotai"
import { useEffect } from "react";

export const socket = io("http://localhost:3000");
export const usersAtom = atom([]);
export const nodesAtom = atom([]);
export const connectionAtom = atom([]);

export const SocketManager = () => {

    const [_users, setUsers] = useAtom(usersAtom);
    const [_nodes, setNodes] = useAtom(nodesAtom);
    const [_connection, setConnection] = useAtom(connectionAtom);

    useEffect(() => {
        function onConnect() {
            console.log("connected")
        }
        function onDisconnect() {
            console.log("disconnected");
        }

        function onUsers(users) {
            setUsers(users);
        }

        function onNodes(nodes) {
            setNodes(nodes)
        }

        function onNodeSet(node) {
            return node
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("users", onUsers);
        socket.on("nodeSet", onNodeSet);
        socket.on("nodes", onNodes);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("users", onUsers);
            socket.off("nodeSet", onNodeSet);
            socket.off("nodes", onNodes);
        }

    }, []);

}