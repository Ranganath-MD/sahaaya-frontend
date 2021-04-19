import dayjs from "dayjs";

class DateUtils {
  date: dayjs.Dayjs;
  constructor (){
    this.date = dayjs();
  }

  get now () {
    return this.date;
  }

  format (date: any){
    return dayjs(date).format();
  }
}

export const date = new DateUtils();