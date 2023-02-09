import React from 'react';

export default function NewTaskForm({ addItem }) {
  const [min, setMin] = React.useState('');
  const [sec, setSec] = React.useState('');
  const [title, setTitle] = React.useState('');
  //   const submitingForm = (e) => {
  //     e.preventDefault();
  //     this.props.addItem(label, minuts, seconds);
  //     this.setState({
  //       label: '',
  //       //   minuts: 0,
  //       //   seconds: 0,
  //     });
  //   };
  const changeItem = (e) => {
    setTitle(e.target.value);
  };
  const onLabelChangeMin = (e) => {
    setMin(e.target.value);
  };
  const onLabelChangeSec = (e) => {
    setSec(e.target.value);
  };

  const onClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (title !== '' && min !== '' && sec !== '') {
        addItem(title, parseInt(min) * 60 + parseInt(sec));
        setTitle('');
        setMin('');
        setSec('');
      }
    }
  };
  return (
    <div className="header">
      <h1>todos</h1>
      <form onKeyDown={(e) => onClickEnter(e)}>
        <input
          value={title}
          onChange={changeItem}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
        <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={onLabelChangeMin} autoFocus />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={onLabelChangeSec}
          autoFocus
        ></input>
      </form>
    </div>
  );
}
