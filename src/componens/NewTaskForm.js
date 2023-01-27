import React from 'react';

export default class NewTaskForm extends React.Component {

    state = {
        label: '',
    }
    submitingForm = e => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        })
    }
    changeItem = (e) => {
        this.setState({
            label: e.target.value,
        })
    }
    render() {
      return (
        <div className="header">
        <h1>todos</h1>
        <form onSubmit={this.submitingForm}>
        <input
        value={this.state.label}
        onChange={this.changeItem}
         className="new-todo" 
         placeholder="What needs to be done?" 
         autoFocus/>
        </form>
      </div>
    )      
    }

}