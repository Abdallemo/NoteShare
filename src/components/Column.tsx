import { TextColor } from "tailwindcss-types";
import { Dispatch, SetStateAction, useState ,DragEvent,} from "react";
import clsx from "clsx";
import Card, { DropIndicator } from "./Card";
import { AddCard } from "./addToCard";

export type ColumnType = "backlog" | "todo" | "doing" | "done";

export type CardType = {
    title: string;
    id: string;
    column: ColumnType;
};

export type ColumnProps = {
    title: string;
    headingColor: TextColor;
    cards: CardType[];
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

export default function Column({
    title,
    cards,
    column,
    headingColor,
    setCards,
}: ColumnProps) {
    const [active, setActive] = useState();
    const filtredCards = filterCarsByColumn(cards, column);
    function handleDragStart(event: DragEvent, card: CardType) {

        event.dataTransfer.setData("CardId",card.id)
    
    }
    return (
        <div className="w-56 shrink-0 ">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={clsx("font-medium", headingColor)}>{title}</h3>
                <span className="rounded text-sm">{filtredCards.length}</span>
            </div>
            <div
                className={clsx("h-full w-full transition-colors bg-neutral-800/0", {
                    "bg-neutral-800/50": active,
                })}>
                {filtredCards.map((card) => {
                    return <Card key={card.id} {...card} handleDragStart={handleDragStart}/>;
                })}
                <DropIndicator beforeId="-1" column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
}

function filterCarsByColumn(cards: CardType[], column: ColumnType) {
    const result = cards.filter((col) => col.column == column);
    return result;
}


