import React, { useRef } from 'react'
import addIcon from './more.png'
import './style.css';

interface Props{
    task:string
    discription:string
    setTask: React.Dispatch<React.SetStateAction<string>>
    setDesc: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void;
}

const AddTask: React.FC<Props> = ({task, discription, setTask, setDesc, handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className='addTaskInput' onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
    }}>
        <input 
        className='taskInput'
        type="text" 
        placeholder='Add Task Name'
        value={task}
        maxLength={20}
        onChange={(e) => setTask(e.target.value)}
        ref={inputRef}
        />
        <input  type="text" className='taskDesc' placeholder='Task Description'
          value={discription}
          onChange={(d) => setDesc(d.target.value)}
        />
        
        <button className='addBtn' type='submit'><img className='icon' src={addIcon} alt="Add" /></button>
    </form>
  )
}

export default AddTask