const convertToDatetime = (date: Date, time: Date, timeZone: number): Date => {
  const timeArray = time.toString().split(':');
  const Datetime = new Date(date);
  Datetime.setHours(Number(timeArray[0]) + timeZone);
  Datetime.setMinutes(Number(timeArray[1]));
  return Datetime;
};

export default convertToDatetime;
