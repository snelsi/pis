/**
 * Date  =>  yyyy-mm-dd
 */
export function prettyDate(date: Date): string {
  try {
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day: string | number = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  } catch (e) {
    console.warn(e);
    return `yyyy-mm-dd`;
  }
}

// !ВАЖНО
// При использовании, импортировать эти функции только через 'scripts/helpers', а не через 'scripts'.
// Иначе при сборке вылетит ошибка 'TypeError: Object(...) is not a function'
export function getDateDaysBack(n: number) {
  const dt = new Date();
  dt.setDate(dt.getDate() - n);
  return dt;
}

export function getDateYearsBack(n: number) {
  const dt = new Date();
  dt.setFullYear(Number(dt.getFullYear()) - Number(n));
  return dt;
}

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const range = (start: number, end: number = undefined, step = 1) => {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

const month = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

/**
 * yyyy-mm-dd  =>  dd Month yyyy
 */
export const prettyLocalDate = (time: string): string => {
  try {
    const mnth = parseInt(time.slice(5, 7), 10);
    return `${time.slice(8, 10)} ${month[mnth - 1]} ${time.slice(0, 4)}`;
  } catch {
    return time;
  }
};
