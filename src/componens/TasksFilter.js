import React from 'react';

export default function TasksFilter({ filter }) {
  const buttonss = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'complited', label: 'Complited' },
  ];
  const buttons = buttonss.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={clazz}>
          {label}
        </button>
      </li>
    );
  });
  return (
    <div>
      <ul className="filters">{buttons}</ul>
    </div>
  );
}

// export default class TasksFilter extends React.Component {
//   buttons = [
//     { name: 'all', label: 'All' },
//     { name: 'active', label: 'Active' },
//     { name: 'complited', label: 'Complited' },
//   ];
//   render() {
//     const { filter } = this.props;
//     const buttons = this.buttons.map(({ name, label }) => {
//       const isActive = filter === name;
//       const clazz = isActive ? 'selected' : '';
//       return (
//         <li key={name}>
//           <button type="button" className={clazz}>
//             {label}
//           </button>
//         </li>
//       );
//     });
//     return (
//       <div>
//         <ul className="filters">{buttons}</ul>
//       </div>
//     );
//   }
// }
