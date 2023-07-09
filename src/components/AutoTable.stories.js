import  AutoTable  from './AutoTable';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'AutoTable',
  component: AutoTable,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Array = {
    args: {
      data: [{id: 1, name: 'Steve', mobile: 'na'}, {id: 2, name: 'Lee', mobile: '123456789'}],
    },
  };

  export const Object = {
    args: {
      data: {id: 1, name: 'Steve'},
    },
  };

export const Empty = {
    args: {
      data: null,
    },
  };

