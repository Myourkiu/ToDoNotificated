import { FlatList, Text, View } from 'react-native';
// import { Checkbox } from 'react-native-paper';
import { Task } from '~/types/task';

interface TaskListProps {
  toggleTask: (index: number) => void;
  tasks: Task[];
}
const TaskList = ({ toggleTask, tasks }: TaskListProps) => {
  return (
    <>
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
                {item.averageEndTime.toLocaleTimeString(['pt-BR'], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            {/* <Checkbox
              status={item.done ? 'checked' : 'unchecked'}
              onPress={() => toggleTask(index)}
            /> */}
          </View>
        )}
      />
    </>
  );
};

export default TaskList;
