import { TextColor } from "tailwindcss-types";
import { Dispatch, SetStateAction, useState, DragEvent, } from "react";
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
    const [active, setActive] = useState(false);
    const filtredCards = filterCarsByColumn(cards, column);

    function handleDragStart(event: DragEvent, card: CardType) {

        event.dataTransfer.setData("CardId", card.id)
    };
    function handleDragOver(e: DragEvent) {
        e.preventDefault();
        highlighIndicator(e);
        setActive(true);
    }
    function handleDragLeave() {
        setActive(false)
        clearHighligs()
    }
    function handleDragEnd(e:DragEvent) {
        setActive(false)
        clearHighligs()
        const cardId = e.dataTransfer.getData("CardId");
        const indicators  = getIndicator();
        const {element }= getNearestIndicator(e,indicators);
        const before = element.dataset.before || "-1"

        if(before!== cardId){
            let copy = [...cards]
            let cardToTranfer = copy.find((c)=>c.id === cardId)
            
            if(!cardToTranfer) return;
            cardToTranfer = {...cardToTranfer, column }

            copy = copy.filter((c)=>c.id !== cardId);
            const moveToBack = before ==="-1"

            if(moveToBack){ 
                copy.push(cardToTranfer);
            }else{

                const insertAtIndex = copy.findIndex((element)=>element.id===before);
                if(insertAtIndex === undefined) return;

                copy.splice(insertAtIndex,0,cardToTranfer)
            }

            setCards(copy)

        }


    }
    function highlighIndicator(e: DragEvent) {
        const indicators = getIndicator()
        clearHighligs(indicators)
        const element = getNearestIndicator(e, indicators);
        element.element.style.opacity = '1'

    }
    function getNearestIndicator(e: DragEvent, indicators: HTMLElement[]) {
        const element = indicators.reduce(
            (closest, child) => {
                const position = child.getBoundingClientRect()
                const offset = e.clientY - (position.top + 50/*Distence Ofset*/)
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else {
                    return closest
                }
            }, {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
        }
        );
        return element;

    }
    function clearHighligs(element?: HTMLElement[]) {
        const indicators = element || getIndicator()

        indicators.forEach((i) => {
            i.style.opacity = "0"
        })

    }

    function getIndicator(): HTMLElement[] {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
    }

    return (
        <div className="w-56 shrink-0 ">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={clsx("font-medium", headingColor)}>{title}</h3>
                <span className="rounded text-sm">{filtredCards.length}</span>
            </div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={clsx("h-full w-full transition-colors bg-neutral-800/0", {
                    "bg-neutral-800/50": active,
                })}>
                {filtredCards.map((card) => {
                    return <Card key={card.id} {...card} handleDragStart={handleDragStart} />;
                })}
                <DropIndicator beforeId="-1" column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
}


//* utils
function filterCarsByColumn(cards: CardType[], column: ColumnType) {
    const result = cards.filter((col) => col.column == column);
    return result;
}

