export default {
  srcDir: "views",
  srcFiles: [
    "**/*[sS]pec.js"
  ],
  specDir: "spec/support/jasmine/",
  specFiles: [
    "**/*[sS]pec.js"
  ],
  helpers: [
    "helpers/**/*.js"
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    stopOnSpecFailure: false,
    random: true
  },

  listenAddress: "localhost",
  hostname: "localhost",
  browser: {
    name: "firefox"
  }
};

{
  "srcFiles"; [
    "views/**/*.js"  // Path to your source files, adjust as needed
  ],
  "specFiles"; [
    "spec/**/*[sS]pec.js"  // Path to your test files (adjust as needed)
  ],
  "helpers"; [
    "spec/helpers/**/*.js"  // Any helper files (optional)
  ],
  "reporters"; [
    "html",
    "batchReporter"
  ]
}
