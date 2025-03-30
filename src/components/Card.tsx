import clsx from "clsx";
import { CardType, ColumnProps, ColumnType } from "./Column";
import {  DragEvent, useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import {motion} from 'framer-motion'


type CardProp = CardType & {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    handleDragStart:Function
}

export default function Card({ column, title, id ,handleDragStart}: CardProp) {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
             layout
             layoutId={id}
                draggable
                onDragStart={(e)=>handleDragStart(e,{column, title, id})}
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
                <p className="text-sm text-neutral-100">{title}</p>
            </motion.div>
        </>
    );
}



export function DeleteArea({ setCards }: Pick<ColumnProps, "setCards">) {
    const [active, setActive] = useState(false);
    
    const handleDragOver = (e:DragEvent)=>{
        e.preventDefault();
        setActive(true)
    }
    
    const handleDragLeave = ()=>{
       

        setActive(false)
    }
    const handleDragEnd = (e:DragEvent)=>{
       

        const cardId = e.dataTransfer.getData("CardId")
        console.log(cardId)
        setCards((prev)=>prev.filter((card)=>card.id!== cardId))
        setActive(false)
    }
    
    return (
        <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
            className={clsx(
                "mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl",
                { "border-red-800 bg-red-800/50 text-red-500": active },
                { "border-neutral-500 bg-neutral-500/20 text-neutral-500": !active }
            )}>
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
    );
}

export function DropIndicator({
    beforeId,
    column,
}: {
    beforeId: string;
    column: ColumnType;
}) {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className={clsx("my-0.5 h-0.5 w-full bg-violet-400 opacity-0")}></div>
    );
}


