import React from 'react';
//import { setDate } from 'date-fns';

import NewTaskForm from './componens/NewTaskForm';
import TaskList from './componens/TaskList';
import Footer from './componens/Footer';

import './index.css';

let max = 1;

export default function App() {
  const [data, setData] = React.useState([]);
  const [filterVal, setFilterVal] = React.useState('active');
  // const [maxId, setmaxId] = React.useState(100);

  React.useEffect(() => {
    let interval = setInterval(() => {
      let newArr = data.map((el) => {
        if (el.timer === 0) {
          return el;
        }
        if (!el.pause) {
          el.timer = el.timer - 1;
        }
        return el;
      });
      setData(newArr);
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  const deleteItemFunc = (id) => {
    let newArr = [...data];
    let idx = newArr.findIndex((el) => el.id === id);
    console.log(idx);
    newArr.splice(idx, 1);
    setData(newArr);
    return data;
  };
  const createTodoItem = (label, timer) => {
    console.log(max);
    return {
      label,
      time: new Date(),
      done: false,
      id: max++,
      timer: timer,
      pause: false,
    };
  };
  const addItem = (text, timer) => {
    const newItem = createTodoItem(text, timer);
    let newArr = [...data, newItem];
    setData(newArr);
    return data;
  };

  const onToggleDone = (id) => {
    let idx = data.findIndex((el) => el.id === id);
    const oldItem = data[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    const newArray = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    setData(newArray);
    return data;
  };
  const filterr = (items, filterParam) => {
    switch (filterParam) {
      case 'all':
        return items;
      case 'complited':
        return items.filter((e) => e.done);
      case 'active':
        return items.filter((e) => !e.done);
      default:
        return items;
    }
  };
  const onFilterChange = (filter) => {
    setFilterVal(filter);
    // this.setState({ filter });
  };
  const clearing = () => {
    const newData = data.filter((el) => !el.done);
    setData(newData);
    return data;
  };

  const stopTimer = (id) => {
    const idx = data.findIndex((el) => el.id === id);
    const newObj = [{ ...data[idx], pause: true }];
    const newData = [...data.slice(0, idx), ...newObj, ...data.slice(idx + 1)];
    setData(newData);
    return data;
  };

  const startTimer = (id) => {
    const idx = data.findIndex((el) => el.id === id);
    const newObj = [{ ...data[idx], pause: false }];
    const newData = [...data.slice(0, idx), ...newObj, ...data.slice(idx + 1)];
    setData(newData);
    return data;
  };
  let visibleItem = filterr(data, filterVal);
  const activeCount = data.filter((el) => !el.done).length;
  return (
    <div className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        data={visibleItem}
        deleteItem={deleteItemFunc}
        changeDone={onToggleDone}
        // min={min}
        stopTimer={stopTimer}
        startTimer={startTimer}
      />
      <Footer activeTodo={activeCount} filter={filterVal} onFilterChange={onFilterChange} clicked={clearing} />
    </div>
  );
}
