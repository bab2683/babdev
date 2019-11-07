module.exports = {
  name: 'main-angular',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/main-angular',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
