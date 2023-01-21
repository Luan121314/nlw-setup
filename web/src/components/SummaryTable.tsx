import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning";
import { HabitDay } from "./HabitDay";

interface Summary {
  id: string
  date: string
  amount: number
  completed: number
}

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summuryDates = generateDatesFromYearBeginning();

const minimumSummaryDateSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDateSize - summuryDates.length;

export function SummaryTable() {
  const [summaries, setSummaries] = useState<Summary[]>([])

  useEffect(()=>{
    api.get('summary').then(response=> {
      setSummaries(response.data);
      
    })
  },[])

  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaries.length > 0 && summuryDates.map((date) => {

          const dayInSummary = summaries.find(day=> {
            return dayjs(date).isSame(day.date, 'day')
          })

          return <HabitDay 
            key={date.toString()}
            date={date}
            amount={dayInSummary?.amount}
            defaultCompleted={dayInSummary?.completed}

             />;
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
