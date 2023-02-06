import React from 'react';

import Task from './Task';

export default class TaskList extends React.Component {
  render() {
    const { data, deleteItem, changeDone, startTimer, stopTimer } = this.props;
    const elements = data.map((item) => {
      const { id, time, editing, ...itemProps } = item;
      return (
        <li key={id}>
          <Task
            {...itemProps}
            deleteEl={() => deleteItem(id)}
            onChangeDone={() => changeDone(id)}
            time={time}
            editing={editing}
            stopTimer={() => stopTimer(id)}
            startTimer={() => startTimer(id)}
          />
        </li>
      );
    });
    return (
      <div className="main">
        <ul className="todo-list">{elements}</ul>
      </div>
    );
  }
}
