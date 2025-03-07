import { useState } from 'react'
import { useAtom } from "jotai"
import { usersAtom, socket } from '../socketManager'

const wWidth = window.innerWidth / 20;
const wHeight = window.innerHeight / 20;


export function Interface() {

    const [name, setName] = useState('');
    const [offer, setOffer] = useState('');
    const [search, setSearch] = useState('');
    const [color, setColor] = useState('#ffffff');
    const [users] = useAtom(usersAtom);

    const setUserInfo = () => {
        var index = users.findIndex((user) => user.id === socket.id);
        users[index].name = name;
        users[index].offer = offer;
        users[index].search = search;
        setColor(users[index].color);

        socket.emit("nodeSet", users[index]);
    }


    return (
        <div className=" absolute fixed top-0 bottom-0 right-0 text-black z-50 flex flex-col gap-2 m-2">
            <h1 style={{ backgroundColor: `${color}80` }} className={"p-2 rounded-full"}>Name: <input onChange={(e) => setName(e.target.value)} type="text" value={name} name="name" /></h1>
            <h1 className="p-2 bg-red-800/50 rounded-full">Offer: <input onChange={(e) => setOffer(e.target.value)} type="text" value={offer} name="offer" /></h1>
            <h1 className="p-2 bg-green-800/50 rounded-full">Search: <input onChange={(e) => setSearch(e.target.value)} type="text" value={search} name="search" /></h1>


            <button title="Create" onClick={setUserInfo} className="bg-lime-600 rounded-full text-black p-2"> Create </button>
        </div>
    )
}


