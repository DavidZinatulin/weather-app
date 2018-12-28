export function generateFormValues(formStructure) {
  let fields = {};

  formStructure.map((item) => {
    fields[item.name] = item.defaultValue;
  });

  return fields;
}

export function formatWeekDay(date) {
  return new Date(date).toString().split(' ')[0];
}
