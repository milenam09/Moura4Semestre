import './App.css'
import penIcon from "./assets/edit.2.svg"
import trashIcon from "./assets/trash.2.svg"
import { useState } from 'react';

function App() {

  const [tasklist, setTasklist] = useState([
    { id: 1, description: "Revisar HTML" },
    { id: 2, description: "Revisar CSS" },
    { id: 3, description: "Revisar ReactJS" },
    { id: 4, description: "Aprender React Navigate" }
  ])




  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">React List</h1>
      </header>

      <main className="body-section">
        <form className="cad-task">
          <input className="card-task__entry"
            type="text"
            placeholder='Adicione uma tarefa'
          />
          <button className="card-task__btn-confirm">Adicionar</button>
        </form>

        <section className="cardlist">

          {
            tasklist.map((t) => {
              return (
                <article className="cardtask">
                  <p className='cardtask__tasc-text'>
                    {t.description}
                    </p>

                  <div className="carstask__icon-box">

                    <div className='cardlist__icon'>
                      <img src={penIcon} className='cardlist__edit-icon' alt="" />
                    </div>
                    <div className='cardlist__icon'>
                      <img src={trashIcon} className='delet-icon' alt="" />
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
