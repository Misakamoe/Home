import { h } from "vue";
import { SpaCandle } from "@icon-park/vue-next";

// 时钟
export const getCurrentTime = () => {
	let time = new Date();
	let year = time.getFullYear();
	let month =
		time.getMonth() + 1 < 10
			? "0" + (time.getMonth() + 1)
			: time.getMonth() + 1;
	let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
	let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
	let minute =
		time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
	let second =
		time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
	let weekday = [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六",
	];
	let currentTime = {
		year,
		month,
		day,
		hour,
		minute,
		second,
		weekday: weekday[time.getDay()],
	};
	return currentTime;
};

// 时光胶囊
export const getTimeCapsule = () => {
	// 日进度
	const todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
	const todayPassHours = (new Date() - todayStartDate) / 1000 / 60 / 60;
	const todayPassHoursPercent = (todayPassHours / 24) * 100;

	// 周进度
	const weeks = [7, 1, 2, 3, 4, 5, 6];
	const weekDay = weeks[new Date().getDay()];
	const weekDayPassPercent = (weekDay / 7) * 100;

	// 月进度
	const year = new Date().getFullYear();
	const date = new Date().getDate();
	const month = new Date().getMonth() + 1;
	const monthAll = new Date(year, month, 0).getDate();
	const monthPassPercent = (date / monthAll) * 100;

	// 年进度
	const yearStartDate = new Date(year, 0, 1).getTime();
	const yearEndDate = new Date(year + 1, 0, 1).getTime();
	const yearPassHours = (new Date() - yearStartDate) / 1000 / 60 / 60;
	const yearTotalHours = (yearEndDate - yearStartDate) / 1000 / 60 / 60;
	const yearPassPercent = (yearPassHours / yearTotalHours) * 100;

	return {
		day: {
			elapsed: Math.floor(todayPassHours),
			pass: Math.floor(todayPassHoursPercent),
		},
		week: {
			elapsed: weekDay,
			pass: Math.floor(weekDayPassPercent),
		},
		month: {
			elapsed: date,
			pass: Math.floor(monthPassPercent),
		},
		year: {
			elapsed: month - 1,
			pass: Math.floor(yearPassPercent),
		},
	};
};

// 欢迎提示
export const helloInit = () => {
	const hour = new Date().getHours();
	let hello = null;
	if (hour < 6) {
		hello = "おはよう";
	} else if (hour < 9) {
		hello = "おはよう";
	} else if (hour < 12) {
		hello = "おはよう";
	} else if (hour < 14) {
		hello = "こんにちは";
	} else if (hour < 17) {
		hello = "こんにちは";
	} else if (hour < 19) {
		hello = "こんばんは";
	} else if (hour < 22) {
		hello = "こんばんは";
	} else {
		hello = "(￣o￣) . z Z";
	}
	ElMessage({
		dangerouslyUseHTMLString: true,
		message: `<strong>${hello}</strong> ようこそ私のホームページへ`,
	});
};

// 默哀模式
const anniversaries = {
	// 4.8: "建站纪念日",
};
export const checkDays = () => {
	const myDate = new Date();
	const mon = myDate.getMonth() + 1;
	const date = myDate.getDate();
	const key = `${mon}.${date}`;
	if (anniversaries.hasOwnProperty(key)) {
		console.log(`今天是${anniversaries[key]}`);
		const gray = document.createElement("style");
		gray.innerHTML = "html{filter: grayscale(100%)}";
		document.head.appendChild(gray);
		ElMessage({
			message: `今天是${anniversaries[key]}`,
			duration: 14000,
			icon: h(SpaCandle, { theme: "filled", fill: "#efefef" }),
		});
	}
};

// 建站日期统计
export const siteDateStatistics = (startDate) => {
	const currentDate = new Date();
	const differenceInTime = currentDate.getTime() - startDate.getTime();
	const differenceInDays = differenceInTime / (1000 * 3600 * 24);
	const differenceInMonths = differenceInDays / 30;
	const differenceInYears = differenceInMonths / 12;
	if (differenceInYears >= 1) {
		return `本喵已躺平了 ${Math.floor(differenceInYears)} 年 ${Math.floor(
			differenceInMonths % 12
		)} 月 ${Math.round(differenceInDays % 30)} 天`;
	} else if (differenceInMonths >= 1) {
		return `本喵已躺平了 ${Math.floor(differenceInMonths)} 月 ${Math.round(
			differenceInDays % 30
		)} 天`;
	} else {
		return `本喵已躺平了 ${Math.round(differenceInDays)} 天`;
	}
};
