const { nanoid } = require('nanoid');
const ShortUrl = require('../models/ShortUrl');
const isUrlValid = require('../utils/UrlValidator');

module.exports = {
  async ShortNewUrl(req, res) {
    const { url } = req.body;
    const newShortUrl = new ShortUrl();

    if (!(await isUrlValid(url))) {
      return res.status(400).json({
        error: 'invalid url',
        formatExample: 'https://google.com',
      });
    }
    const exists = await ShortUrl.findOne({ original_url: url });
    if (exists) {
      return res.status(400).json({
        error: 'URL already shortened',
        shortenedUrl: exists.short_url,
      });
    }

    newShortUrl.original_url = url;
    newShortUrl.short_url = nanoid(8);

    try {
      const savedDocument = await newShortUrl.save();
      res.json({
        original_url: savedDocument.original_url,
        short_url: savedDocument.short_url,
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  },
  async GoToShortedUrl(req, res) {
    const { url } = req.params;

    const shortened = await ShortUrl.findOne({ short_url: url });

    if (!shortened) {
      return res.status(404).json({
        error: 'URL not found',
      });
    }

    return res.redirect(shortened.original_url);
  },
};
