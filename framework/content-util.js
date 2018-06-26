function create(args) {
  let content = '';
  if (args.title) {
    content += '<h1>' + args.title + '</h1>';
  }
  if (args.paragraphs) {
    for (const paragraph of args.paragraphs) {
      content += '<p>' + paragraph + '</p>';
    }
  }
  return content;
}

module.exports = {
  create,
};
