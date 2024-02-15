export const getKoreanDayOfWeek = (date: Date) => {
  const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = date.getDay();
  return daysInKorean[dayOfWeek];
};

export const formatMonthDay = (date: string) => {
  const dates = new Date(date);
  const year = dates.getFullYear();
  const month = dates.getMonth() + 1;
  const day = dates.getDate();
  const koreanDayOfWeek = getKoreanDayOfWeek(dates);
  return `${year}년 ${month}월 ${day}일 (${koreanDayOfWeek})`;
};

export const formatPlanDates = (dates: string[]) => {
  const startDate = formatMonthDay(dates[0]);
  const endDate = formatMonthDay(dates[dates.length - 1]);

  return { startDate, endDate };
};

export const removeYearOfDate = (date: string | undefined) => {
  if (date === undefined) return '';

  const dateArr = date.split('-');
  let month = dateArr[1];
  let day = dateArr[2];

  if (+month < 10) month = month[1];
  if (+day < 10) day = day[1];

  return month + '/' + day;
};

export const changeDotFormatOfDate = (date: string | undefined) => {
  if (date === undefined) return '';

  return date.replaceAll('-', '.');
};

export const changeSideBarFormat = (date: string | undefined) => {
  if (date === undefined) return '';

  const dateArr = date.split('-');
  dateArr.pop();

  return dateArr.join('.');
};

export const calcDateProgress = (start: string, end: string) => {
  const today = new Date();
  const startDay = new Date(start);
  const endDay = new Date(end);

  if (today < startDay) return '0';
  if (today > endDay) return '100';

  const travelTime = Math.abs(startDay.getTime() - endDay.getTime());
  const todayTime = Math.abs(startDay.getTime() - today.getTime());
  const progress = (todayTime / travelTime) * 100;
  const result = progress.toFixed();

  return result;
};

export const calculateDday = (date: Date): string => {
  const currentDate = new Date();
  const targetDate = new Date(date);

  if (targetDate.toLocaleDateString() === currentDate.toLocaleDateString()) {
    return 'D-Day';
  } else if (targetDate < currentDate) {
    const daysCount = Math.ceil(
      (currentDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `D+${daysCount}`;
  } else {
    const daysCount = Math.ceil(
      (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `D-${daysCount}`;
  }
};
