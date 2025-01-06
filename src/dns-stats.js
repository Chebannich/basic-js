const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const reversedDomains = domains.map(domain => domain.split('.').reverse());

  const allSubdomains = [];

  reversedDomains.forEach(reversedDomain => {
    for (let i = 1; i <= reversedDomain.length; i++) {
      allSubdomains.push(reversedDomain.slice(0, i));
    }
  });

  const dnsStats = {};
  allSubdomains.forEach(subdomainArray => {
    const subdomain = '.' + subdomainArray.join('.');
    dnsStats[subdomain] = (dnsStats[subdomain] || 0) + 1;
  });

  return dnsStats;
}

module.exports = {
  getDNSStats
};
