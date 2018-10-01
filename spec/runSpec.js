import Jasmine from "jasmine";
import JasmineConsoleReporter from "jasmine-console-reporter";

let jasmine = new Jasmine();
let reporter = new JasmineConsoleReporter({
	colors: 1,
	cleanStack: 3,
	verbosity: 4,
	listStyle: "indent",
	activity: false
});

jasmine.addReporter(reporter);
jasmine.showColors(true);
jasmine.loadConfigFile("spec/support/jasmine.json");
jasmine.execute();

