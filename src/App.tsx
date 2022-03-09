import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { Task } from './task';
import { AiFillDelete } from 'react-icons/ai';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'


const App:React.FC = () => {
  
  const [desc, setDesc] = useState<string>("")
  const [task, setTask] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if(task){
      let descrip = (desc) ? desc : "No Description"
      setTasks([...tasks, {id: uuid(), task_name:task, isDone:false, task_discription: descrip}])
      setTask("")
      setDesc("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return
    if(result.destination === result.source &&
      result.destination.index === result.source.index) return
    
    let add, active = tasks, complete = completedTasks;
    if (result.source.droppableId === "taskList"){
      add = active[result.source.index]
      active.splice(result.source.index, 1)
    }
    else{
      add = complete[result.source.index]
      complete.splice(result.source.index, 1)
    }

    if (result.destination.droppableId === "taskList"){
      add.isDone = false
      active.splice(result.destination.index, 0, add)
    }
    else{
      add.isDone = true
      complete.splice(result.destination.index, 0, add)
    }
    
    setCompletedTasks(complete)
    setTasks(active )
  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <div className="App">
        <span className="title">DoItNow</span>
        <AddTask discription={desc} setDesc={setDesc} task={task} setTask={setTask} handleAdd={handleAddTask}/>
        <div className="container">
            
              <Droppable droppableId='taskList'>
                {
                  (provided, snapshot) =>(
                    <div className={`allTasks ${snapshot.isDraggingOver ? "task_draging" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                      <span className='card_header'>Active</span>
                      {tasks.map((task, index) => <TaskList  index={index} tasks={tasks} task={task} key={task.id} setTasks={setTasks}/>)}
                      {provided.placeholder}
                    </div>
                  )
                }
              </Droppable>
            
           
              <Droppable droppableId='doneList'>
                {
                  (provided, snapshot) =>(
                    <div className={`allTasks remove ${snapshot.isDraggingOver ? "complete_task_draging" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <div className='clear_div'>
                          <span className='card_header'>Done</span>
                        </div>
                        <div className='clear_div2'>
                          <AiFillDelete className='card_header clear_div2' onClick={ (e) => {setCompletedTasks([])}}></AiFillDelete>
                        </div>
                      {completedTasks.map((task, index) => <TaskList  index={index} tasks={completedTasks} task={task} key={task.id} setTasks={setCompletedTasks}/>)}
                      {provided.placeholder}  
                    </div>
                  )
                }
              </Droppable>
            
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
