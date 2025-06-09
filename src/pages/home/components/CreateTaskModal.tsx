import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (name: string, selectedTime: Date) => void;
}

const CreateTaskModal = ({ isOpen, onClose, onCreateTask }: CreateTaskModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [errors, setErrors] = useState({ name: '', endTime: '' });

  const onTimeChange = (_: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
      setErrors(prev => ({ ...prev, endTime: '' }));
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    if (!isOpen) {
      setTaskName('');
      setSelectedTime(null);
      setErrors({ name: '', endTime: '' });
    }
  }, [isOpen]);

  function createValidation() {
    let isValid = true;
    let nameError = '';
    let endTimeError = '';

    if (!taskName.trim()) {
      nameError = 'Nome é obrigatório';
      isValid = false;
    }

    if (!selectedTime) {
      endTimeError = 'Horário de término é obrigatório';
      isValid = false;
    }

    setErrors({ name: nameError, endTime: endTimeError });

    if (isValid) {
      onCreateTask(taskName, selectedTime!);
    }
  }

  const handleNameChange = (text: string) => {
    setTaskName(text);
    if (text.trim()) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View className="flex-1 items-center justify-center">
        <View className="h-[340px] w-[90%] rounded-2xl bg-[#202020] p-4 justify-between">
          <View>
            <Text className="text-center text-2xl text-white mb-4">Nova Task</Text>

            {/* Campo Nome */}
            <View className="mb-4">
              <Text className="text-sm text-white mb-1">Nome</Text>
              <TextInput
                value={taskName}
                onChangeText={handleNameChange}
                placeholder="Digite o nome da tarefa"
                placeholderTextColor="#aaa"
                className={`rounded-md border px-4 py-3 text-white ${
                  errors.name ? 'border-red-500' : 'border-[#3b3b3b]'
                }`}
              />
              {errors.name ? (
                <Text className="text-xs text-red-400 mt-1">{errors.name}</Text>
              ) : null}
            </View>

            {/* Campo Horário */}
            <View className="mb-4">
              <Text className="text-sm text-white mb-1">Horário de término</Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                className={`rounded-md border px-4 py-3 ${
                  errors.endTime ? 'border-red-500' : 'border-[#3b3b3b]'
                }`}
              >
                <Text className="text-white">
                  {selectedTime ? formatTime(selectedTime) : 'Selecionar horário'}
                </Text>
              </TouchableOpacity>
              {errors.endTime ? (
                <Text className="text-xs text-red-400 mt-1">{errors.endTime}</Text>
              ) : null}
            </View>

            {showTimePicker && (
              <DateTimePicker
                value={selectedTime || new Date()}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onTimeChange}
              />
            )}
          </View>

          {/* Botão fixo no final */}
          <TouchableOpacity
            className="rounded-full bg-[#6a2ec9] p-3"
            onPress={createValidation}
          >
            <Text className="text-center text-white">Criar nova task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTaskModal;
