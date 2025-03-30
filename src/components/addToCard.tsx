import { FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { CardType, ColumnProps } from "./Column";
import {motion} from 'framer-motion'

export function AddCard({ column, setCards }:Pick<ColumnProps,'column'|'setCards'>) {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);
    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (!text.trim().length) return
        const newCard: CardType = {
            column,
            title: text.trim(),
            id: Math.random().toString()

        }
        setCards((prev) => [...prev, newCard])
        setAdding(false)


    }
    return (
        <>
            {adding ? (
                <motion.form onSubmit={handleSubmit} layout>
                    <textarea className="w-full rounded board border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0" placeholder="Add new task...." autoFocus onChange={(e) => setText(e.target.value)} />
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                            onClick={() => setAdding(false)}
                            className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                        >Close</button>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                        >Add<span><FiPlus /></span></button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                layout
                    onClick={() => setAdding(true)}
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50">
                    Add card
                    <span>
                        <FiPlus />
                    </span>
                </motion.button>
            )}
        </>
    );
}