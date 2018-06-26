const contentUtil = require('./content-util');
const template = require('./template');

class Choice {
  /**
   * @param {{title: ?string, paragraphs: !Array<string>, options: !Array<!Option>}} args
   */
  constructor(args) {
    this.template_ = constructTemplate(args.title, args.paragraphs, args.options);
    this.nextAdventures_ = args.options.map((option) => option.nextAdventure);
  }

  pageHandler() {
    return this.template_.apply();
  }

  async handler(req) {
    if (req.body.option) {
      const optionIndex = parseInt(req.body.option, 10);
      if (optionIndex >= 0 && optionIndex < this.nextAdventures_.length) {
        return await this.nextAdventures_[optionIndex].handler(req);
      }
    }
    
    return this.pageHandler();
  }
}

Choice.Option = class {
  constructor(description, nextAdventure) {
    this.description = description;
    this.nextAdventure = nextAdventure;
  }
}

/**
 * @param {string} title
 * @param {!Array<!string>} paragraphs
 * @param {!Array<!Option>} options
 */
function constructTemplate(title, paragraphs, options) {
  let content = contentUtil.create({title, paragraphs});

  for (let i = 0; i < options.length; i++) {
    content += (
      '<form action="@{CHOICE}" method=POST>' +
        '<input type="hidden" name="option" value="' + i + '">' +
        '<input type="submit" value="' + options[i].description + '">' +
      '</form>'
    );
  }

  return new template.StringTemplate(content);
}


module.exports = Choice;
