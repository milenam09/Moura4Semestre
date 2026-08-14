import { View, Text, TouchableOpacity, Image} from "react-native";
import { TaskItemStyle } from "./TaskItemStyle";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

export const TaskItem = ({ id, descricao}) => {

    const {deleteTask, setTaskValue, setEditMode, setIdToEdit} = useContext(TaskContext)
    return(
        <View style={TaskItemStyle.cardBox}>
            <Text style={TaskItemStyle.cardText}>{descricao}</Text>
            <TouchableOpacity style={[TaskItemStyle.cardButton,TaskItemStyle.CardButtonEditColor]}
                onPress={() => {
                    setTaskValue(descricao)
                    setEditMode(true)
                    setIdToEdit(id)
                }}
            >
                <Image
                    source={require("../../../assets/edit.icon.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity style={[TaskItemStyle.cardButton,TaskItemStyle.CardButtonTrashColor]}
                onPress={() =>{
                    deleteTask(id);
                }}
            >
                
                <Image 
                    source={require("../../../assets/trash.icon.png")}
                />
            </TouchableOpacity>
        </View>
    )
}