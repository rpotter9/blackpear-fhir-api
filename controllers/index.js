const path = require('path'),
	fs = require('fs')

/**
 * Registers routes for express router
 */
exports.registerRoutes = (app) => {

    const controllerFilesPath = path.join(__dirname)
    const files = fs.readdirSync(controllerFilesPath).filter(x => x.includes("controller"))

    files.forEach((file) => {
    const fileObj = require(path.join(controllerFilesPath, file));
      const { base, router, name } = fileObj
  
      app.use(base, router)
      console.log(`Registered ${name} routes`)
    })

  }