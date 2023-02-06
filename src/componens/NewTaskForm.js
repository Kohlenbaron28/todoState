import React from 'react';

export default class NewTaskForm extends React.Component {
  state = {
    min: '',
    sec: '',
    title: '',
  };
  timer = 0;
  submitingForm = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label, this.state.minuts, this.state.seconds);
    this.setState({
      label: '',
      //   minuts: 0,
      //   seconds: 0,
    });
    console.log(this.state);
  };
  changeItem = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  onLabelChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    });
  };
  onLabelChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (this.state.title !== '' && this.state.min !== '' && this.state.sec !== '') {
        this.props.addItem(this.state.title, parseInt(this.state.min) * 60 + parseInt(this.state.sec));

        this.setState({
          title: '',
          min: '',
          sec: '',
        });
      }
    }
  };

  render() {
    return (
      <div className="header">
        <h1>todos</h1>
        <form onKeyDown={(e) => this.onClickEnter(e)}>
          <input
            value={this.state.label}
            onChange={this.changeItem}
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.min}
            onChange={this.onLabelChangeMin}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.sec}
            onChange={this.onLabelChangeSec}
            autoFocus
          ></input>
        </form>
      </div>
    );
  }
}
