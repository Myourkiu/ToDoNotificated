import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '~/types/task';
import TaskList from './components/TaskList';
import CreateTaskModal from './components/CreateTaskModal';
import { PlusIcon } from 'lucide-react-native';
import { createTaskFormData } from '~/types/schemas/createTask';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { name: 'Estudar React', averageEndTime: new Date(), done: false },
    { name: 'Fazer exercício', averageEndTime: new Date(), done: true },
    { name: 'Ler livro', averageEndTime: new Date(), done: false },
  ]);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const onCreateTask = (data: createTaskFormData) => {
    const newTask: Task = {name: data.name, averageEndTime: data.endTime, done: false};

    setTasks([...tasks, newTask])
    setCreateModalOpen(false)
  }
 
  return (
    <>
      <StatusBar hidden />
      <SafeAreaView className="flex-1 bg-[#202020]">
        <View className="mt-16 px-4">
          <View className='w-full flex-row items-center justify-between mb-8'>
            <Text className=" text-3xl font-semibold text-white">Minhas Tasks</Text>
            <TouchableOpacity className='rounded-full' onPress={() => setCreateModalOpen(true)}>
              <PlusIcon color={'#6a2ec9'}/>
            </TouchableOpacity>
          </View>
          <View>
            <TaskList toggleTask={toggleTask} tasks={tasks} />
          </View>
        </View>
        <CreateTaskModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} onCreateTask={onCreateTask}/>
      </SafeAreaView>
    </>
  );
};

export default Home;
