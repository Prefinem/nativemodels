const defaultOptions = {
	// Allow nulls on all columns
	allowNulls: false,
	// Ignores case when initializing object from model
	caseSensitive: true,
	// Pass options to all children
	passOptions: false,
	// Throws an error if key is not in schema
	strict: false,
	// Strip undefined values passed in
	stripUndefined: true,
	// Strip null values passed in
	stripNull: false,
};

module.exports = defaultOptions;
