import base from './base';

const int = () => ({
	...base,
	parse(value, name) {
		if (value === true || value === false || value === '') {
			throw new Error(`Property ${name} is not a int`);
		}

		if (!isNaN(parseInt(value)) && parseInt(value) === parseFloat(value)) {
			return parseInt(value);
		}

		throw new Error(`Property ${name} is not a int`);
	},
});

export default int;
