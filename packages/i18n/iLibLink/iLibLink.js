const ilibMock = {
	getLocale: () => ('ko-KR'),
	setLocale: () => {},
	setLoaderCallback: () => {},
	getLoader: () => ({
		addPath: () => {}
	}),
	data: {
		cache: {}
	}
};

const LoaderMock = function () {};
const ResBundleMock = function () {};
const CaseMapperMock = function () {};
const DateFactoryMock = function (v) {
	let {unixtime, type, year = null, month = null, day = null, hour = null, minute = null, second = null, timezone, julianday} = v;
	let JSDate, timeExtended;

	if (julianday) {
		return julianday;
	} else if (unixtime) {
		JSDate = new Date(unixtime);
		timeExtended = unixtime;

		year = JSDate.getFullYear();
		month = JSDate.getMonth() + 1;
		day = JSDate.getDate();
		hour = JSDate.getHours();
		minute = JSDate.getMinutes();
	} else {
		JSDate = new Date(year, month, day, hour, minute, second);
		timeExtended = JSDate.valueOf();
	}

	const returnObject = {
		type,
		year,
		month,
		day,
		hour,
		minute,
		timezone,
		getJSDate: () => (JSDate),
		getTimeExtended: () => (timeExtended),
		getYears: () => (year),
		getMonths: () => (month),
		getDays: () => (day),
		getHours: () => (hour),
		getMinutes: () => (minute),
		getSeconds: () => (second),
		cal: {
			getNumMonths: () => (12),
			getMonLength: (m, y) => {
				if (y % 4 === 0 && m === 2) {
					return 29;
				} else if (m === 4 || m === 6 || m === 9 || m === 11) {
					return 30;
				} else {
					return 31;
				}
			}
		}
	};
	returnObject.getJulianDay = () => (returnObject);
	return returnObject;
};
const DateFmtMock = function ({type}) {
	const timeType = type === 'time';
	return {
		cal: {
			getNumMonths: () => (12),
			getMonLength: (m, y) => {
				if (y % 4 === 0 && m === 2) {
					return 29;
				} else if (m === 4 || m === 6 || m === 9 || m === 11) {
					return 30;
				} else {
					return 31;
				}
			}
		},
		format: (v) => {
			if (timeType) {
				const {hour, minute} = v;
				return `${hour}:${minute}`;
			} else {
				const {year, month, day} = v;
				return `${year}년 ${month}월 ${day}일`;
			}
		},
		getMeridiemsRange: () => ([
			{name: '오전', start: '00:00', end: '11:59'},
			{name: '오후', start: '12:00', end: '23:59'}
		]),
		getTemplate: () => (type === 'time' ? 'H:mm' : 'yyyy년 MMMM d일 EEEE')
	};
};
const DurationFmtMock = function () {
	return () => {};
};
const NumFmtMock = function () {
	return {
		format: (v) => (v.toString())
	};
};
const IStringMock = function (v) {
	this.toString = function () {
		return v;
	};
};
const LocaleInfoMock = function () {
	return {
		getClock: () => ('12')
	};
};

let ilib = ilibMock;
let Loader = LoaderMock;
let ResBundle = ResBundleMock;
let CaseMapper = CaseMapperMock;
let DateFactory = DateFactoryMock;
let DateFmt = DateFmtMock;
let DurationFmt = DurationFmtMock;
let NumFmt = NumFmtMock;
let IString = IStringMock;
let LocaleInfo = LocaleInfoMock;
let ScriptInfo = null;

export default ilib;
export {
	ilib,
	Loader,
	ResBundle,
	CaseMapper,
	DateFactory,
	DateFmt,
	DurationFmt,
	NumFmt,
	IString,
	LocaleInfo,
	ScriptInfo
};
