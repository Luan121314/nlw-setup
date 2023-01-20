import { Check } from "phosphor-react";
import * as CheckBox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle('')
    setWeekDays([])

    alert("habito criado com sucesso");
  }

  function handleToogleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemoveOne = weekDays.filter((day) => day === weekDay);

      setWeekDays(weekDaysWithRemoveOne);
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label
        className="font-semibold leading-tight"
        htmlFor="title
            Qual o seu compromentimento ?"
      ></label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label className="font-semibold leading-tight mt-4" htmlFor="">
        Qual a recorrência ?{" "}
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <CheckBox.Root
              key={weekDay}
              className="flex items-center gap-3 group"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToogleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <CheckBox.Indicator>
                  <Check size={20} className="text-white" />
                </CheckBox.Indicator>
              </div>
              <span className=" text-white leading-tight">{weekDay}</span>
            </CheckBox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold"></Check>
        Confirmar
      </button>
    </form>
  );
}
