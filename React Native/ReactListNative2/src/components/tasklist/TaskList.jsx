import { TaskListStyle } from "./TaskListStyle";
import { ScrollView } from "react-native";
import { TaskItem } from "../taskitem/TaskItem";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TaskContext } from "../../context/TaskContext";

// const API = "http://172.16.36.31:3000"

export const TaskList = () => {
    const {listagemTarefas, getTasks} = useContext (TaskContext)
    
    useEffect( () => {
        getTasks()
    }, [])

    return <ScrollView style= {TaskListStyle.TaskListContainer}>
             {listagemTarefas.map ((tarefa) => {
                return(
                    <TaskItem 
                    key={tarefa.id}
                    id={tarefa.id} 
                    descricao={tarefa.descricao}
                    />
                )
             })}
        </ScrollView>;
    
}