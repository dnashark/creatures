module.exports = class Controller {
  constructor(path, handleRequest) {
    if (!path) throw new Error('unspecified path');
    if (!handleRequest) throw new Error('unspecified handleRequest');
    
    this.path_ = path;
    this.handleRequest_ = handleRequest;
  }

  /** @returns {string} */
  get path() { return this.path_; }

  handleRequest(req, res) { return this.handleRequest_(req, res); }

  /** @param {!Array<!Controller>} controllers */
  static register(app, controllers) {
    const paths = new Set();
    for (const controller of controllers) {
      const caseInsensitivePath = controller.path.toLowerCase();
      if (paths.has(caseInsensitivePath)) throw new Error('Duplicate controllers for ' + controller.path);

      paths.add(caseInsensitivePath);
      app.all(controller.path, controller.handleRequest.bind(controller));
    }
  }
};
