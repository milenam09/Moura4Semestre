import axios from "axios";
import {createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {

    const [listagemTarefas, setListagemTarefas] = useState ([])
    const [taskValue, setTaskValue] = useState("")
    const [editMode, setEditMode] = useState(false);
    const [idToEdit, setIdToEdit] = useState (0);

    const getTasks = async () => {
        try {
            const APIReturn = await axios.get("http://172.16.36.31:3000/taskpoint")
            const APIData = await APIReturn.data
            setListagemTarefas(APIData)    

        } catch (error) {
                console.log("Erro ao buscar os dados na api")
                console.log(error);
            }
    }

    const postTask = async (taskValue) => {
        try {
            await axios.post("http://172.16.36.31:3000/taskpoint", {descricao: taskValue})
            getTasks()
        } catch (error) {
            console.log("Erro ao chamar a API")
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://172.16.36.31:3000/taskpoint/${id}`)
            getTasks()
        } catch (error) {
            console.log("Erro ao deletar na API")
            console.log(error)
        }
    }

    const putTaskPreview = () => {

    }

    const putTaskConfirm = async (tarefa) => {
        try {
            await axios.put(`http://172.16.36.31:3000/taskpoint/${tarefa.id}`, {
                descricao: tarefa.descricao,
            })
            getTasks();
            setTaskValue("");
            setIdToEdit(0);
            setEditMode(false);
            return true

        } catch (error) {
            console.log("Erro ao chamar a API")
            console.log(error)
            return false;
        }
    }

    return (
        <TaskContext.Provider
            value={{
                taskValue,
                setTaskValue,
                listagemTarefas, 
                getTasks, 
                postTask, 
                deleteTask, 
                putTaskPreview, 
                putTaskConfirm,
                editMode,
                setEditMode,
                idToEdit, 
                setIdToEdit
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}