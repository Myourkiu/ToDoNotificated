import { FlatList, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Task } from '~/types/task';

interface TaskListProps {
  toggleTask: (index: number) => void;
  tasks: Task[];
}
const TaskList = ({ toggleTask, tasks }: TaskListProps) => {
  return (
    <>
      {tasks.length != 0 ? (
        <FlatList
          className="w-full"
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className="mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-lg text-white">{item.name}</Text>
                <Text className="text-sm text-gray-500">
                  Horário de término:{' '}
                  {item.averageEndTime.toLocaleTimeString(['pt-BR'], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
              <Checkbox
                status={item.done ? 'checked' : 'unchecked'}
                onPress={() => toggleTask(index)}
              />
            </View>
          )}
        />
      ) : (
        <View className="h-full w-full flex-col items-center justify-center">
          <Text className="text-gray-100">Não há tasks ainda.</Text>
          <Text className="text-gray-100">Adicione uma task em seu dia.</Text>
          <Text className="mb-40 text-gray-100">Clique no botão de " + " para adicionar.</Text>
        </View>
      )}
    </>
  );
};

export default TaskList;
