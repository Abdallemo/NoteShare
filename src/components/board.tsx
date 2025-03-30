import clsx from "clsx";
import Column, { CardType } from "./Column";
import { useEffect, useState } from "react";
import { DeleteArea } from "./Card";

export default function Board() {
    const [cards,setCards] = useState<CardType[]>([])
    const [hasChecked,setHaschecked] = useState(false)
    
    useEffect(()=>{
    if(hasChecked) localStorage.setItem("cards", JSON.stringify(cards));

    },[cards,hasChecked])
    useEffect(()=>{
        const cardData = localStorage.getItem("cards");
        setCards(cardData? JSON.parse(cardData):[]);
        setHaschecked(true)
    },[])
    return (
        <div className={clsx('flex h-full w-full gap-3 overflow-scroll p-12')}>
            <Column title="Backlog" column='backlog' cards={cards} headingColor="text-neutral-500" setCards={setCards} />
            <Column title="Doing" column='doing' cards={cards} headingColor="text-yellow-200" setCards={setCards} />
            <Column title="todo" column='todo' cards={cards} headingColor="text-blue-200" setCards={setCards} />
            <Column title="Done" column='done' cards={cards} headingColor="text-emerald-200" setCards={setCards} />
            <DeleteArea setCards={setCards}/>
        </div>
    )
}
