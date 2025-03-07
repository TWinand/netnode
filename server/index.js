import { Server } from "socket.io"

const min = -1;
const max = 1;

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    },
});

io.listen(3000);

const users = [];
const nodes = [];

const getRndNum = (min, max) => {
    return Math.random() * (max - min) + min
}


const createRndPos = () => {
    return [getRndNum(min, max), getRndNum(min, max), 0]
}

const createRndColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};



io.on("connection", (socket) => {
    console.log("user connected");

    users.push({
        id: socket.id,
        name: "",
        position: createRndPos(),
        color: createRndColor(),
        offer: "",
        search: "",
        offerCon: [],
        searchCon: []
    });

    console.log(users);

    io.emit("users", users);
    io.emit("nodes", nodes);

    socket.on("nodeSet", (node) => {

        nodes.push(node);

        nodes.forEach(function (n) {
            n.offerCon = []
            n.searchCon = []
        })

        nodes.forEach(function (n) {
            nodes.forEach(function (nn) {
                if (n.search === nn.offer) {
                    nn.offerCon.push({ position: n.position })
                }

                if (n.offer === nn.search) {
                    nn.searchCon.push({ position: n.position })
                }
            })

        });


        console.log(nodes);
        io.emit("nodes", nodes);

    })

    socket.on("disconnect", () => {
        console.log("user disconnected");

        //change later maybe, if users needs to be safed
        users.splice(
            users.findIndex((user) => user.id === socket.id),
            1
        );

        nodes.splice(
            nodes.findIndex((node) => node.id === socket.id),
            1
        );

        io.emit("users", users);
        io.emit("nodes", nodes);

    });
});