const {JSDOM} = require("jsdom");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const {window} = jsdom;
const {document} = (new JSDOM("")).window;

function copyProps(src, target) {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === "undefined")
		.map(prop => Object.getOwnPropertyDescriptor(src, prop));
	Object.defineProperties(target, props);
}

global.window = window;
global.document = document;
global.navigator = {
	userAgent: "node.js"
};
global.localStorage = global.sessionStorage = {
	getItem (key) {
		return this[key];
	},
	setItem (key, value) {
		this[key] = value;
	},
	removeItem (key) {
		this[key] = null;
	}
};

copyProps(window, global);
