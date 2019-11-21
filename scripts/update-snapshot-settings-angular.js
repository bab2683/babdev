const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

function isApp(architect) {
  return architect.build !== undefined;
}

const angularJson = require('../angular.json');

const allProjects = Object.keys(angularJson.projects);

const libsPath = 'libs/';
const appsPath = 'apps/';

const nonE2EProjects = allProjects.reduce((projects, current) => {
  if (current.indexOf('e2e') === -1) {
    projects.push({
      path: `${
        isApp(angularJson.projects[current].architect) ? appsPath : libsPath
      }${current}/jest.config.js`,
      name: current
    });
  }
  return projects;
}, []);

const changedFiles = [];

nonE2EProjects.forEach(({ name, path }) => {
  const configFile = require(`../${path}`);

  if (configFile && configFile.snapshotSerializers) {
    if (configFile.snapshotSerializers[0].indexOf('build') === -1) {
      const newPaths = configFile.snapshotSerializers.map(currentPath =>
        currentPath.replace('jest-preset-angular/', 'jest-preset-angular/build/')
      );

      configFile.snapshotSerializers = newPaths;

      // Save changes
      writeFileSync(path, `module.exports=${JSON.stringify(configFile)}`, 'utf8');

      changedFiles.push(name);
    }
  }
});

if (changedFiles.length) {
  execSync('npm run prettier');
  console.log('The following projects jest.config.js files were changed:', changedFiles);
} else {
  console.log('No changes needed');
}
