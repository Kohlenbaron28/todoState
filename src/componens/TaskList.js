import Task from "./Task";
import React from 'react';

export default class TaskList extends React.Component {
    render() {
        const {data, deleteItem, changeDone} = this.props;
        const elements = data.map(item => {
            const {id, time, ...itemProps} = item;
            return ( <li key={id}>
            <Task
            {...itemProps}  
            deleteEl={() => deleteItem(id)} 
            onChangeDone={() => changeDone(id)}
            time={time}
            />
           </li>)
        })
      return (
        <div className="main">
         <ul className="todo-list">
            {elements}
        </ul>
        </div>

    )
    }
    }