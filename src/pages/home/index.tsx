import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '~/types/task';
import TaskList from './components/TaskList';
import { createTaskFormData } from '~/types/schemas/createTask';
import CreateTaskModal from './components/CreateTaskModal';
import { InitializeNotifications } from '~/lib';
import * as Notifications from 'expo-notifications';

InitializeNotifications();

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
  const newTask: Task = { name: data.name, averageEndTime: data.endTime, done: false };

  setTasks([...tasks, newTask]);
  setCreateModalOpen(false);
  scheduleNotification(newTask);
};

const scheduleNotification = async (task: Task) => {
  const now = new Date();
  
  // Garantir que a data seja criada corretamente
  let taskEndTime;
  if (typeof task.averageEndTime === 'string') {
    taskEndTime = new Date(task.averageEndTime);
  } else {
    taskEndTime = task.averageEndTime;
  }
  
  // Verificar se a data é válida
  if (isNaN(taskEndTime.getTime())) {
    console.error('Data inválida:', task.averageEndTime);
    return;
  }
  
  const notificationTime = new Date(taskEndTime.getTime() - 30 * 60 * 1000);
  

  if (notificationTime <= now) {
    Notifications.scheduleNotificationAsync({
      content: { 
        title: 'Task urgente!', 
        body: `A task "${task.name}" está próxima do prazo limite!` 
      },
      trigger: { seconds: 1 },
    });
  } else {
    const secondsUntilNotification = Math.floor((notificationTime.getTime() - now.getTime()) / 1000);
    
    Notifications.scheduleNotificationAsync({
      content: { 
        title: 'Task prestes a atrasar!', 
        body: `A task "${task.name}" tem 30 minutos para ser concluída!` 
      },
      trigger: { seconds: secondsUntilNotification },
    });
  }
};

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView className="flex-1 bg-[#202020]">
        <View className="mt-16 px-4">
          <View className="mb-8 w-full flex-row items-center justify-between">
            <Text className=" text-3xl font-semibold text-white">Minhas Tasks</Text>
            <TouchableOpacity className="rounded-full" onPress={() => setCreateModalOpen(true)}>
              <Text className="text-3xl text-[#6a2ec9]">+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TaskList toggleTask={toggleTask} tasks={tasks} />
          </View>
        </View>
        <CreateTaskModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreateTask={onCreateTask}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
