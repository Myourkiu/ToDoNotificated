import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { useEffect, useState } from 'react';
import { createTaskFormData, createTaskSchema } from '~/types/schemas/createTask';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (data: createTaskFormData) => void;
}

const CreateTaskModal = ({ isOpen, onClose, onCreateTask }: Props) => {
  const [showPicker, setShowPicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<createTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      endTime: undefined as any,
    },
  });

  const onTimeChange = (_: any, date?: Date) => {
    setShowPicker(false);
    if (date) setValue('endTime', date, { shouldValidate: true });
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const onSubmit = (data: createTaskFormData) => {
    onCreateTask(data);
    reset(); // limpa o formulário
  };

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen]);

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View className="flex-1 items-center justify-center">
        <View className="h-[340px] w-[90%] justify-between rounded-2xl bg-[#202020] p-4">
          <View>
            <Text className="mb-4 text-center text-2xl text-white">Nova Task</Text>

            {/* Nome */}
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <View className="mb-4">
                  <Text className="mb-1 text-sm text-white">Nome</Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Digite o nome"
                    placeholderTextColor="#aaa"
                    className={`rounded-md border px-4 py-2 text-white ${
                      errors.name ? 'border-red-500' : 'border-[#3b3b3b]'
                    }`}
                  />
                  {errors.name && (
                    <Text className="mt-1 text-xs text-red-400">{errors.name.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Horário */}
            <Controller
              control={control}
              name="endTime"
              render={({ field: { value } }) => (
                <View className="mb-4">
                  <Text className="mb-1 text-sm text-white">Horário de término</Text>
                  <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    className={`rounded-md border px-4 py-3 ${
                      errors.endTime ? 'border-red-500' : 'border-[#3b3b3b]'
                    }`}>
                    <Text className="text-white">
                      {value ? formatTime(value) : 'Selecionar horário'}
                    </Text>
                  </TouchableOpacity>
                  {errors.endTime && (
                    <Text className="mt-1 text-xs text-red-400">{errors.endTime.message}</Text>
                  )}

                  {showPicker && (
                    <DateTimePicker
                      mode="time"
                      value={value || new Date()}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onTimeChange}
                    />
                  )}
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            className="rounded-full bg-[#6a2ec9] p-3"
            onPress={handleSubmit(onSubmit)}>
            <Text className="text-center text-white">Criar nova task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTaskModal;
