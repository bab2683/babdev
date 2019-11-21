const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

const { getOnlyApps } = require('./get-projects');

const librariesPrefix = '@babdev/';
const pathToApps = 'apps';

const apps = getOnlyApps();

const changedFiles = [];

const rootTsConfigPaths = require(`../tsconfig.json`).compilerOptions.paths;

// Only libraries paths
const onlyLibrariesPaths = Object.keys(rootTsConfigPaths).reduce((pathObj, currentPath) => {
  if (currentPath.indexOf(librariesPrefix) > -1) {
    pathObj[currentPath] = rootTsConfigPaths[currentPath];
  }
  return pathObj;
}, {});

// Create new tsconfig.json files for apps
apps.forEach(app => {
  const tsConfigPath = `../apps/${app}/tsconfig.json`;

  const appTsConfigFile = require(tsConfigPath);

  const localPaths = appTsConfigFile.compilerOptions.paths;

  if (localPaths) {
    let changedAtLeastOnePath = false;
    let librariesPathPresent = 0;

    // Change local paths
    const modifiedLocalPaths = Object.keys(localPaths).reduce((pathObj, currentPath) => {
      // Ignore libraries paths
      if (currentPath.indexOf(librariesPrefix) === -1) {
        pathObj[currentPath] = localPaths[currentPath].map(localPath => {
          // Change only unchanged paths
          if (localPath.indexOf(pathToApps) === -1) {
            changedAtLeastOnePath = true;
            return `${pathToApps}/${app}/${localPath}`;
          }
          return localPath;
        });
      } else {
        librariesPathPresent = librariesPathPresent + 1;
      }
      return pathObj;
    }, {});

    if (changedAtLeastOnePath || Object.keys(onlyLibrariesPaths).length !== librariesPathPresent) {
      appTsConfigFile.compilerOptions.baseUrl = '../../';
      appTsConfigFile.compilerOptions.paths = {
        ...modifiedLocalPaths,
        ...onlyLibrariesPaths
      };

      // Save changes
      writeFileSync(`apps/${app}/tsconfig.json`, JSON.stringify(appTsConfigFile));

      changedFiles.push(app);
    }
  }
});

if (changedFiles.length) {
  execSync('npm run prettier');
  console.log('The tsconfig file of the following apps have been updated', changedFiles);
} else {
  console.log('no changes needed');
}
