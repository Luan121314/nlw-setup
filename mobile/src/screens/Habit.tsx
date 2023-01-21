import { useRoute } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generateProgressPercentage";
import { HabitEmpty } from "../components/HabitEmpty";
import clsx from "clsx";

interface HabitParamsProps {
  date: string;
}

interface Day {
  completedHabits: string[];
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: Date;
  }>;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as HabitParamsProps;

  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<Day | null>(null);

  const parsedDate = dayjs(date);

  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        dayInfo.completedHabits.length
      )
    : 0;

    
    async function fetchHabits() {
    try {
      setLoading(true)
      const response = await api.get("/day", {
        params: {
          date,
        },
      });

      setDayInfo(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Ops", "Não foi possivel carregar as informações de hábitos");
      
    } finally {
      setLoading(false);
    }
  }
  
  async function handleToggleHabit(habitId: string) {
    try {

      await api.patch(`/habits/${habitId}/toggle`)

      let completedHabits: string[] = [];
    
    if (dayInfo?.completedHabits.includes(habitId)) {
      completedHabits = dayInfo.completedHabits.filter(
        (habit) => habit !== habitId
        );
      } else {
      completedHabits = [...dayInfo!.completedHabits, habitId];
    }

    setDayInfo((day) => {
      return {
        possibleHabits: day!.possibleHabits,
        completedHabits,
      };
    });
    } catch (error) {
      console.error(error);
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito')
      
    }
    
  }
  
  useEffect(() => {
    fetchHabits();
  }, []);
  
  if (loading) {
    return <Loading />;
  }
  
  console.log("habits", dayInfo?.possibleHabits, !!dayInfo?.possibleHabits);
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View className={ clsx("mt-6", {
          "opacity-50": isDateInPast
        })}>
          {dayInfo?.possibleHabits.length ? (
            dayInfo.possibleHabits.map((habit) => {
              return (
                <CheckBox
                  key={habit.id}
                  title={habit.title}
                  checked={dayInfo.completedHabits.includes(habit.id)}
                  disabled={isDateInPast}
                  onPress={() => handleToggleHabit(habit.id)}
                />
              );
            })
          ) : (
            <HabitEmpty />
          )}
        </View>

        {
          isDateInPast && <Text className="text-white mt-10 text-center">
            * Você não pode editar hábitos de uma data passada.
          </Text>
        }
      </ScrollView>
    </View>
  );
}
