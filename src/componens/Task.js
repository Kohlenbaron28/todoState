import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  static propTypes = {
    label: PropTypes.string,
  };
  state = {
    time: 0,
  };
  render() {
    const { label, deleteEl, onChangeDone, done, time, editing } = this.props;
    let classNames = 'view';
    if (done) {
      classNames += ' completed';
    }
    let clazz = '';
    if (!editing) {
      clazz += 'editing';
    }
    const createdDate = new Date(time);
    return (
      <div>
        {/* <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox"/>
              <label>
                <span className="description">Completed task</span>
                <span className="created">created 17 seconds ago</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
            </div>
          </li> */}
        <div className={clazz}>
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">Editing task</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" value="Editing task" />
        <div className={classNames}>
          <input className="toggle" type="checkbox" onClick={onChangeDone} />
          <label>
            <span className="description">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.props.startTimer}></button>
              <button className="icon icon-pause" onClick={this.props.stopTimer}></button>
              <span>{`${Math.floor(this.props.timer / 60)
                .toString()
                .padStart(2, '0')}:${Math.floor(this.props.timer % 60)
                .toString()
                .padStart(2, '0')}`}</span>
            </span>
            <span className="created">created {formatDistanceToNow(createdDate, { includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={deleteEl}></button>
        </div>
      </div>
    );
  }
}
Task.defaultProps = {
  deleteEl: () => {},
};
