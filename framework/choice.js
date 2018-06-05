const template = require('./template');

class Choice {
  /**
   * @param {{name: string, title: ?string, paragraphs: !Array<string>, options: !Array<!Option>}} args
   */
  constructor(args) {
    this.name_ = args.name;
    this.template_ = constructTemplate(args.name, args.title, args.paragraphs, args.options);
    this.transitions_ = args.options.map((option) => option.transition);
  }

  get name() { return this.name_; }

  handlePage(req, res) {
    res.send(this.template_.apply());
  }

  async handleRequest(req, res) {
    if (req.body.choice && req.body.choice == this.name && req.body.option) {
      const optionIndex = parseInt(req.body.option, 10);
      if (optionIndex >= 0 && optionIndex < this.transitions_.length) {
        await this.transitions_[optionIndex].handleRequest(req, res);
        return;
      }
    }
    
    this.handlePage(req, res);
  }
}

Choice.Option = class {
  constructor(description, transition) {
    this.description = description;
    this.transition = transition;
  }
}

/**
 * @param {string} name The name of the choice
 * @param {string} title
 * @param {!Array<!string>} paragraphs
 * @param {!Array<!Option>} options
 */
function constructTemplate(name, title, paragraphs, options) {
  let content = '<h1>' + title + '</h1>'
  for (const paragraph of paragraphs) {
    content += '<p>' + paragraph + '</p>';
  }
  let i = 0;
  for (const option of options) {
    content += (
      '<form action="@{CHOICE}" method=POST>' +
        '<input type="hidden" name="option" value="' + i + '">' +
        '<input type="hidden" name="choice" value="' + name + '">' +
        '<input type="submit" value="' + option.description + '">' +
      '</form>'
    );
    i++;
  }

  return new template.StringTemplate(content);
}


module.exports = Choice;
