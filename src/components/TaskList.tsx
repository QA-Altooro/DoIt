import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../task'
import "./style.css"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';


interface Props {
    index:number;
    task: Task;
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}
 
const TaskList: React.FC<Props> = ({index, task, tasks, setTasks}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTask, setEditTask] = useState<string>(task.task_name)

  const handleDone = (id : string) => {
    setTasks(tasks.map((task) => task.id === id?{...task, isDone: !task.isDone} : task))
  }

  const handleDelete = (id : string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleEdit = (e : React.FormEvent ,id : string) => {
    
    e.preventDefault()
    if (edit){
      setEdit(!edit)
      setTasks(tasks.map((task) => task.id === id?{...task, task_name: editTask} : task))
    }
  }
  const focusInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    focusInput.current?.focus()
  }, [edit])
  

  return (
    <Draggable draggableId={task.id} index={index}>
      {
        (provided, snapshot) => (
          <form className='tasks' onSubmit={(e) => handleEdit(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
            <div className={`task_card ${snapshot.isDragging? "dragging_task" : ""}`}>
                <div className='task_header'>
                  {
                    edit? <input ref={focusInput} className='editInput' type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)}/> 
                    :
                    task.isDone? <s><h1 className='task_title'>{task.task_name}</h1></s>
                    :
                    <h1 className='task_title'>{task.task_name}</h1>
                    
                  }
                    <div className='icons'>
                      <AiFillEdit className='icon' onClick={() => 
                      {if (!edit && !task.isDone){
                        setEdit(!edit)
                      }}
                      }/> 
                      <AiFillDelete className='icon' onClick={() => handleDelete(task.id)}/> 
                      <MdDone className='icon' onClick={() => handleDone(task.id)}/>
                    </div>
                </div>
                <div className='description'>
                  {task.task_discription}
                </div>
            </div>
          </form>
        )
      }

    </Draggable>
  )
}

export default TaskList