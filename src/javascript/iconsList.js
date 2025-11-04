const icons = {
  0: { icon: "/images/icon-sunny.webp" },
  1: { icon: "/images/icon-sunny.webp" },
  2: { icon: "/images/icon-partly-cloudy.webp" },
  3: { icon: "/images/icon-overcast.webp" },
  45: { icon: "/images/icon-fog.webp" },
  48: { icon: "/images/icon-fog.webp" },
  51: { icon: "/images/icon-drizzle.webp" },
  53: { icon: "/images/icon-drizzle.webp" },
  55: { icon: "/images/icon-drizzle.webp" },
  61: { icon: "/images/icon-rain.webp" },
  63: { icon: "/images/icon-rain.webp" },
  65: { icon: "/images/icon-rain.webp" },
  80: { icon: "/images/icon-snow.webp" },
  81: { icon: "/images/icon-snow.webp" },
  82: { icon: "/images/icon-snow.webp" },
  95: { icon: "/images/icon-storm.webp" },
  96: { icon: "/images/icon-storm.webp" },
  99: { icon: "/images/icon-storm.webp" },
};

function weatherIcon(weatherCode) {
  return icons[weatherCode].icon;
}
export function timeTransformation(time) {
  const currTime = time.split("T");
  let date = new Date(currTime[0]).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return {date}
}// this will make the passed hour as 3PM or 3AM if it is in the moring
export function normalHourFormat(hour){
  hour = Number(hour.split(":")[0])
  const meridian = hour < 12 ? "AM" : "PM";
  const transformedHour = hour > 12 ? hour % 12 : hour;
  return `${transformedHour}${meridian}`
}
export default weatherIcon;
