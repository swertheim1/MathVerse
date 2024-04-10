module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-verbose-reporter')
    ],
    browsers: ['Chrome'],
    files: [
      // Include your test files here
      'src/**/*.spec.ts'
    ],
    preprocessors: {
      // Add preprocessors if necessary
    },
    reporters: [
      'progress', 
      'kjhtml', 
      'coverage', 
      'verbose'
    ], 
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'), 
      reports: ['html', 'lcovonly', 'text-summary'], 
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true
  });
};
