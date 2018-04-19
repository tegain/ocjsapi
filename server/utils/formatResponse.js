const isArr = data => Object.prototype.toString.call(data) === '[object Array]';

/**
 * @param {Array|Object} links
 */
const formatResponse = res => {
  if (isArr(res)) {
    const returnedLinks = [];

    for (let i = 0; i < res.length; i++) {
      const { titre, url, auteur } = res[i];

      returnedLinks.push({
        titre,
        url,
        auteur
      });
    }

    return returnedLinks;
  }

  const { titre, url, auteur } = res;
  return {
    titre,
    url,
    auteur
  };
};

module.exports = {
  formatResponse
};
