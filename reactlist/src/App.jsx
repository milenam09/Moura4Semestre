import axios from 'axios';
import './App.css'
import penIcon from "./assets/edit.2.svg"
import trashIcon from "./assets/trash.2.svg"
import { useEffect, useState } from 'react';

function App() {

  const [tasklist, setTasklist] = useState([]);
  const [taskValue, setTaskValue] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [idToEdit, setIdToEdit] = useState(0)

  const getTasks = async () => {
    try {
        const APIReturn = await axios.get("http://localhost:3000/taskpoint")
        const APIData = await APIReturn.data
        // ATUALIZA O STATE
        setTasklist(APIData)
    } catch (error) {
      console.log(erro);
    }
  }
  //Get
  const getTaskById = async (id) => {
    alert(`Função getTasksById em desenvolvimento ${id}`)
  }

  //Post
  const postTask = async (e) => {
    e.preventDefault()
    if(taskValue.trim().length == 0){
      alert("Preencher o campo valor")
      return false
    }
    try {
      const APIReturn = await axios.post("http://localhost:3000/taskpoint", {
        descricao : taskValue
      })
      setTaskValue("")
      getTasks()
    } catch (error) {
      console.log(error);

      alert("Erro ao cadastrar os dados")
    }
     
  }

  //Put Pre-Editar
  const putTask = (item) => {
    setEditMode(true)
    setIdToEdit(item.id)
    setTaskValue(item.descricao)
  }

  const confirmPutTask = async (e) => {
    e.preventDefault()

    if (taskValue.trim().length == 0) {
      alert("Preencha o texto da tarefa")
      return false;
    }

    try {
      const APIReturn = await axios.put(`http://localhost:3000/taskpoint/${idToEdit}`, {descricao : taskValue})
      setIdToEdit(0);
      setTaskValue("");
      alert("A tarefa foi editada");
      getTasks();
    } catch (error) {
      alert("Erro ao editar")
      console.log(error);
    }
    
  }

  //Delete
  const deleteTask = async (id) => {

    const querExcluir = confirm(`Quer realmente excluir o registro ?`)
    if (!querExcluir){
       return false;
    }

     try {
      const APIReturn = await axios.delete(`http://localhost:3000/taskpoint/${id}`)    
      getTasks()
      alert("Tarefa excluida com sucesso!!")
    } catch (error) {
      console.log(error);

      alert("Erro ao excluir os dados")
    }
  }

  useEffect(() =>{
    //carrega os dados quando o componente for montado!
    getTasks()
  }, [])

  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">React List</h1>
      </header>

      <main className="body-section">
        <form className="cad-task" onSubmit={editMode ? confirmPutTask : postTask }>
          <input className="card-task__entry"
            type="text"
            placeholder='Adicione uma tarefa'
            value={taskValue}
            onChange={(e) => [
              setTaskValue(e.target.value)
            ]}
          />
          <p>{taskValue}</p>
          <p>{editMode ? "true" : "false"}</p>

          <button className="card-task__btn-confirm">Adicionar</button>

              {
                editMode && (
                <button 
                  className="card-task__btn-confirm" 
                  type="button"
                  onClick={() => {
                    setTaskValue("")
                    setIdToEdit(0)
                    setEditMode(false)
                  }}
                  >
                    Cancelar
                    </button>
              )}

        </form>

        <section className="cardlist">

          {
            tasklist.map((t) => {
              return (
                <article className="cardtask" key={t.id}>
                  <p className='cardtask__tasc-text'>
                    {t.descricao}
                    </p>

                  <div className="carstask__icon-box">

                    <div className="cardlist__icon">
                      <img src={penIcon} 
                      className="cardlist__edit-icon" 
                      alt="imagem de um lapis.Funcao de editar a tarefa"
                      onClick={() => {
                        //variavel t e o item/objeto completo
                        putTask (t)
                      }} />
                      
                    </div>

                    <div className="cardlist__icon">
                    <img 
                      src={trashIcon}
                      className="cardlist__delet-icon" 
                      alt="imagem de uma lixeira.Funcao de editar a tarefa" 
                      onClick={() => {
                        deleteTask (t.id)
                      }}

                    />
                    </div>
                  </div>

                </article>
              )
            })
          }




        </section>
      </main>

      <footer className="footer-list">
        <p className="footer-list__right-text">2026, React List - Todos os direitos reservados</p>
      </footer>
    </>
  );
}

export default App
