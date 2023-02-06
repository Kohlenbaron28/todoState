import React from 'react';

import NewTaskForm from './componens/NewTaskForm';
import TaskList from './componens/TaskList';
import Footer from './componens/Footer';
import './index.css';

export default class App extends React.Component {
  maxId = 100;
  state = {
    data: [],
    filter: 'active',
    editing: false,
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ data }) => {
        let newArr = data.map((el) => {
          if (el.timer === 0) {
            return el;
          }
          if (!el.pause) {
            el.timer = el.timer - 1;
          }
          return el;
        });
        return {
          data: newArr,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  deleteItemFunc = (id) => {
    this.setState((state) => {
      let newArr = [...state.data];
      let idx = newArr.findIndex((el) => el.id === id);
      console.log(idx);
      newArr.splice(idx, 1);
      return {
        data: newArr,
      };
    });
  };
  createTodoItem(label, timer) {
    return {
      label,
      time: new Date(),
      done: false,
      id: this.maxId++,
      timer: timer,
      pause: false,
    };
  }
  addItem = (text, timer) => {
    const newItem = this.createTodoItem(text, timer);
    this.setState((state) => {
      let newArr = [...state.data, newItem];
      return {
        data: newArr,
      };
    });
  };
  onToggleDone = (id) => {
    this.setState(({ data }) => {
      let idx = data.findIndex((el) => el.id === id);
      const oldItem = data[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
      return {
        data: newArray,
      };
    });
  };
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'complited':
        return items.filter((e) => e.done);
      case 'active':
        return items.filter((e) => !e.done);
      default:
        return items;
    }
  }
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  clearing = () => {
    this.setState(({ data }) => {
      const newData = data.filter((el) => !el.done);
      return {
        data: newData,
      };
    });
  };
  editind = () => {
    this.setState({
      editind: true,
    });
  };
  clearInterval() {
    this.clearInterval(this.onChangeTimer);
  }
  static defaultProps = {
    deleteItemFunc: () => {},
  };

  stopTimer = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const newObj = [{ ...data[idx], pause: true }];
      const newData = [...data.slice(0, idx), ...newObj, ...data.slice(idx + 1)];
      return {
        data: newData,
      };
    });
  };

  startTimer = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const newObj = [{ ...data[idx], pause: false }];
      const newData = [...data.slice(0, idx), ...newObj, ...data.slice(idx + 1)];
      return {
        data: newData,
      };
    });
  };
  render() {
    const { data } = this.state;
    let visibleItem = this.filter(data, this.state.filter);
    const activeCount = data.filter((el) => !el.done).length;
    return (
      <div className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          data={visibleItem}
          deleteItem={this.deleteItemFunc}
          changeDone={this.onToggleDone}
          edit={this.editind}
          min={this.state.min}
          stopTimer={this.stopTimer}
          startTimer={this.startTimer}
        />
        <Footer
          activeTodo={activeCount}
          filter={this.state.filter}
          onFilterChange={this.onFilterChange}
          clicked={this.clearing}
        />
      </div>
    );
  }
}
