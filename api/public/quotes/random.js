const config = require('../../../config.json');

const supabase = require('../../../struct/postgrest');
const rateLimit = require('../../../struct/ratelimiter');

module.exports = async (req, res) => {
  if (config.ratelimit.enabled) {
    try {
      await rateLimit(config.ratelimit.limits.public.quotes_random, req.headers['x-real-ip']);
    } catch (error) {
      return res.status(429).send({ 
        message: 'Too many requests' 
      });
    }
  }

  const { data } = await supabase
  .from('old_quotes')
  .select('author, quote, language')
  .eq('language', req.query.language ? req.query.language.replace('French', 'Français') : 'English');

  const random = data[Math.floor(Math.random() * data.length)];

  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).send(random);
};
