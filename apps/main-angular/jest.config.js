module.exports = {
  name: 'main-angular',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/main-angular',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
