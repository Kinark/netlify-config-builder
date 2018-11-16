import axios from 'axios';
import apiPath from '~/utils/apiPath';
import getSlug from 'speakingurl';

export default (cancelToken, gameTitle) => new Promise((resolve, reject) => {
   const cache = sessionStorage.gamesList ? JSON.parse(sessionStorage.gamesList) : null;

   if (cache && process.env.NODE_ENV === 'production') return resolve(gameTitle ? cache.find(game => getSlug(game.Name) === gameTitle) : cache)

   axios.get(`${apiPath}/api/game`, { cancelToken })
      .then(response => {
         const data = response.data.filter(game => game.Active)
         sessionStorage.gamesList = JSON.stringify(data);
         return resolve(gameTitle ? data.find(game => getSlug(game.Name) === gameTitle) : data);
      })
      .catch(error => reject(error))
})
