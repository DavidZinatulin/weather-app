export const searchForm = {
  name: 'searchForm',
  fields: [
    {
      name: 'city',
      placeholder: 'City',
      type: 'textfield',
      defaultValue: ''
    },
    {
      name: 'mode',
      type: 'dropdown',
      options: {
        weather: {label: 'Current weather'},
        forecast: {label: '5-day forecast'}
      },
      defaultValue: 'weather'
    }
  ]
};
