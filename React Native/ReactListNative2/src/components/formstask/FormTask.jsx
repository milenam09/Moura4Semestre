import { View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import { FormTaskStyle } from "./FormTaskStyle";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";


export const FormTask = () => {
    // const [taskValue, setTaskValue] = useState("");
    const {
        postTask, 
        taskValue, 
        setTaskValue, 
        editMode, 
        setEditMode,
        idToEdit,
        setIdToEdit, 
        putTaskConfirm
    } = useContext(TaskContext)
    
    const saveTask = () => {
         console.log(taskValue);
         postTask(taskValue)


        Alert.alert("Tarefa salva com sucesso!", `Tarefa: ${taskValue}`), [{
            text:"OK",
            onPress: () => {}
        }]
    }

    return(
        <View style={FormTaskStyle.formTaskBox}>
            <TextInput
            style={FormTaskStyle.taskInputName}
                value={taskValue}
                onChangeText={(textoDigidado) => {
                        setTaskValue(textoDigidado);
                }}

                placeholder="Adicione uma tarefa"
            />
             {/* //Adicionar// */}
            <TouchableOpacity 
                style={FormTaskStyle.taskButton}
                onPress={() => {
                    if (editMode) {
                        const salvou = putTaskConfirm({id: idToEdit, descricao: taskValue})
                    
                    if (salvou) 
                        Alert.alert("Editar", `${taskValue} foi editado!`, [{ text: "Ok"}]);
                    else
                        Alert.alert("Editar", `Erro ao editar`, [{ text: "Ok"}]);
                    } else{
                      saveTask();
                    }
                }}
                >   
                <Text style={FormTaskStyle.taskButtonText}>Adicionar</Text>
            </TouchableOpacity>

                {/* //Cancelar// */}
                {editMode && (
                    <TouchableOpacity 
                        style={FormTaskStyle.taskButton}
                        onPress={() => {
                        setTaskValue("")
                        setEditMode(false)
                        setIdToEdit(0)
                    }}
                >   
                        <Text style={FormTaskStyle.taskButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                )}
        </View>
    )
}