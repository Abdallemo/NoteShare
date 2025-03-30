import clsx from "clsx";
import Column from "./Column";
import { useState } from "react";
import { DEFAULT_CARDS } from "../lib/MockDara";
import { DeleteArea } from "./Card";

export default function Board() {
    const [cards,setCards] = useState(DEFAULT_CARDS)
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
