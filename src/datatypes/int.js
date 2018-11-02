const base = require('./base');

const int = () => ({
	...base,
	parse(value) {
		return parseInt(value);
	},
	strictCheck(value, name) {
		if (typeof value === 'number') {
			return true;
		}

		throw new Error(`Property ${name} is not an int`);
	},
	validate(value, name) {
		if (
			value !== true &&
			value !== false &&
			value !== '' &&
			!isNaN(parseInt(value)) &&
			parseInt(value) === parseFloat(value)
		) {
			return true;
		}

		throw new Error(`Property ${name} is not an int`);
	},
});

module.exports = int;
