import React from 'react';
import {render} from '@testing-library/react';
import {shallow} from 'enzyme';
import {TaskItem, TasksList} from "./tasks-list";
import {Task} from "../../types";
import faker from "faker";
import {Dropdown} from "react-bootstrap";

describe('TaskList component', () => {
  const tasks: Task[] = [
    {
      _id: faker.random.uuid(),
      description: faker.lorem.slug(),
      owner: faker.random.uuid(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
      completed: false
    },
    {
      _id: faker.random.uuid(),
      description: faker.lorem.slug(),
      owner: faker.random.uuid(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
      completed: false
    }
  ];

  it('renders lists', () => {
    const app = render(<TasksList title="Pending Tasks" tasks={[]}/>);

    expect(app).not.toBeNull();
  });

  it('renders list empty message', () => {
    const app = render(<TasksList title="Pending Tasks" tasks={[]}/>);

    expect(app.getByText(/No tasks added/i)).toBeInTheDocument();
  });

  it('renders task list items', () => {
    const app = shallow(<TasksList title="Pending Tasks" tasks={tasks}/>);

    expect(app.find(TaskItem)).toHaveLength(2);
  });

  it('mark as complete is called', () => {
    const markAsComplete = jest.fn();
    const app = shallow(<TaskItem task={tasks[0]} markAsComplete={markAsComplete}/>);

    app.find('.mark-as-complete').first().simulate('click');

    expect(markAsComplete).toHaveBeenCalled();
  });

  it('remove task is called', () => {
    const removeTask = jest.fn();
    const taskItem = shallow(<TaskItem task={tasks[0]} removeTask={removeTask}/>);

    taskItem.find(Dropdown.Toggle).simulate('click');
    taskItem.find(Dropdown.Item).at(1).simulate('click');

    expect(removeTask).toHaveBeenCalled();
  });

  it('when task editable render update view', () => {
    const taskItem = shallow(<TaskItem task={tasks[0]} />);

    taskItem.find(Dropdown.Toggle).simulate('click');
    taskItem.find(Dropdown.Item).at(0).simulate('click');

    expect(taskItem.exists('.editable')).toBeTruthy();
  });

});

