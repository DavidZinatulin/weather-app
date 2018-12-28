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

export function arrayNthElements(array, n) {
  return array.filter((e, i) => i % n === 0);
}
