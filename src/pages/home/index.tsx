import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Task } from '~/types/task';

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
        <View className="mt-16 px-4">
          <Text className="text-3xl mb-8 font-semibold text-white">Minhas Tasks</Text>
        <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg text-white">{item.name}</Text>
              <Text className="text-gray-500 text-sm">
                Horário de término: {item.averageEndTime}
              </Text>
            </View>
            <Checkbox
              status={item.done ? 'checked' : 'unchecked'}
              onPress={() => toggleTask(index)}
            />
          </View>
        )}
      />
        </View>

      </SafeAreaView>
    </>
  );
};

export default Home;
