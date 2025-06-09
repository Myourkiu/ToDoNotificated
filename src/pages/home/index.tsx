import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Task } from '~/types/task';
import TaskList from './components/TaskList';

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([
    { name: 'Estudar React', averageEndTime: '14:00', done: false },
    { name: 'Fazer exercício', averageEndTime: '16:00', done: true },
    { name: 'Ler livro', averageEndTime: '20:30', done: false },
  ]);

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };
  return (
    <>
      <StatusBar hidden />
      <SafeAreaView className="flex-1 bg-[#272727]">
      <SafeAreaView className="flex-1 bg-[#202020]">
        <View className="mt-16 px-4">
          <Text className="text-3xl mb-8 font-semibold text-white">Minhas Tasks</Text>
          <View >
            <TaskList toggleTask={toggleTask} tasks={tasks}/>
          </View>
        </View>

      </SafeAreaView>
    </>
  );
};

export default Home;
