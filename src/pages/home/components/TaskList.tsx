import { FlatList, Text, View } from "react-native"
import { Checkbox } from "react-native-paper"
import { Task } from "~/types/task"

interface TaskListProps {
    toggleTask: (index:number) => void,
    tasks: Task[]
}
const TaskList = ({toggleTask, tasks} : TaskListProps) => {
  return (
    <>
    <FlatList className="w-full"
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
    </>

  )
}

export default TaskList
