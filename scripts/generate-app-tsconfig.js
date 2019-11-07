const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

const librariesPrefix = '@babdev/';
const pathToApps = 'apps';

const apps = execSync('(cd apps/ && ls)')
  .toString()
  .match(/(.+)/gm)
  // Comment next line to generate files for e2e projects as well
  .filter(app => app.indexOf('e2e') === -1);

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

  // Change local paths
  const modifiedLocalPaths = Object.keys(localPaths).reduce((pathObj, currentPath) => {
    // Ignore libraries paths
    if (currentPath.indexOf(librariesPrefix) === -1) {
      pathObj[currentPath] = localPaths[currentPath].map(localPath => {
        // Change only unchanged paths
        if (localPath.indexOf(pathToApps) === -1) {
          return `${pathToApps}/${app}/${localPath}`;
        }
        return localPath;
      });
    }
    return pathObj;
  }, {});
  appTsConfigFile.compilerOptions.baseUrl = '../../';
  appTsConfigFile.compilerOptions.paths = {
    ...modifiedLocalPaths,
    ...onlyLibrariesPaths
  };

  // Save changes
  writeFileSync(`apps/${app}/tsconfig.json`, JSON.stringify(appTsConfigFile));
});

console.log('The tsconfig file of all apps have been updated');
