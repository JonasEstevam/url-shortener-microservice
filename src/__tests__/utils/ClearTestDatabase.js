const ShortUrl = require('../../models/ShortUrl');

module.exports = async () => await ShortUrl.deleteMany({});
