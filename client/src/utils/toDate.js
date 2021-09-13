const toTwelveHour = (hour, min) => {

  const minutes = min < 9 ? `0${min}` : min;
  const time = hour > 12 ? `${hour-12}:${minutes} PM` : `${hour}:${minutes} AM` ;

  return time;

}

const toDate = (timestamp) => {
  const date = new Date(timestamp)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const fullMonthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  const postDate = `${toTwelveHour(date.getHours(), date.getMinutes())} • ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  const userDate = `${fullMonthNames[date.getMonth()]} ${date.getFullYear()}`

    return{
      postDate,
      userDate
  }

}

export default toDate