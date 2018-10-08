import moment from 'moment';

export const emailValidation = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const createPaginationItemsArray = (length, current) => {
	if (current < 5) {
		const result = [];
		for (let i = 1; i <= 5; i++ ) {
			result.push({
				number: i,
				visible: true
			});
		}

		return result;
	}
	if (length - current <= 5) {
		const result = [];
		for (let i = 5; i >= 0; i-- ) {
			result.push({
				number: length - i,
				visible: true
			});
		}

		return result;
	}
	const result = [];

	for (let i = 1; i < length; i++ ) {
		result.push({
			number: i,
			visible: isVisible(i, current)
		});
	}

	return result;
};

const isVisible = (number, current) => {
	return Math.abs(current - number) <= 2;
};

export const yearsGenerate = () => {
	const start = moment().year() - 18;
	const result = [];
	for (let i = 1, length = 100; i < length; i++ ) {
		result.push(start - i);
	}

	return result;
};

export const monthGenerate = () => {
	const result = [];
	for (let i = 0, length = 12; i < length; i++ ) {
		result.push(i);
	}

	return result;
};

export const daysGenerate = (month, year) => {
	let length = moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth();

	const result = [];

	for (let i = 1; i <= length; i++ ) {
		result.push(i);
	}

	return result;
};
