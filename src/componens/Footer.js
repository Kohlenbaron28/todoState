import React from 'react';

export default function Footer({ filter, onFilterChange, clicked, activeTodo }) {
  const buttonsItems = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'complited', label: 'Complited' },
  ];
  const buttons = buttonsItems.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });
  return (
    <div className="footer">
      <span className="todo-count">{activeTodo} items left</span>
      <div>
        <ul className="filters">{buttons}</ul>
      </div>
      <button className="clear-completed" onClick={clicked}>
        Clear completed
      </button>
    </div>
  );
}
