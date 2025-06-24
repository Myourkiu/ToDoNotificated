import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '~/types/task';
import TaskList from './components/TaskList';
import { createTaskFormData } from '~/types/schemas/createTask';
import CreateTaskModal from './components/CreateTaskModal';
import { InitializeNotifications } from '~/lib';
import * as Notifications from 'expo-notifications';

const Home = () => {
  useEffect(() => {
    const setup = async () => {
      await InitializeNotifications();
    };

    setup();
  }, []);
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

  const onCreateTask = async (data: createTaskFormData) => {
    const endTime = new Date(data.endTime);

    if (isNaN(endTime.getTime())) {
      console.error('Data inválida fornecida ao criar a task:', data.endTime);
      return;
    }

    const newTask: Task = {
      name: data.name,
      averageEndTime: endTime,
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setCreateModalOpen(false);
    await scheduleNotification(newTask);
  };

  const scheduleNotification = async (task: Task) => {
    const now = new Date();

    let taskEndTime: Date;
    if (typeof task.averageEndTime === 'string') {
      taskEndTime = new Date(task.averageEndTime);
    } else {
      taskEndTime = task.averageEndTime;
    }

    console.log('Agora (now):', now.toISOString());
    console.log('TaskEndTime:', taskEndTime.toISOString());

    const notificationTime = new Date(taskEndTime.getTime() - 30 * 60 * 1000);

    const diffMs = notificationTime.getTime() - now.getTime();

    if (diffMs <= 0) {
      console.log('Horario da notificação já passou, notificando imediatamente');
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task urgente!',
          body: `A task "${task.name}" está próxima do prazo limite!`,
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 1, repeats: false },
      });
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task prestes a atrasar!',
          body: `A task "${task.name}" tem 30 minutos para ser concluída!`,
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: notificationTime },
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
            <TouchableOpacity
              className="rounded-full"
              onPress={() => setCreateModalOpen(true)}>
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
