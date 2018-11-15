import axios from 'axios';
import apiPath from '~/utils/apiPath';

export default (cancelToken, id) => new Promise((resolve, reject) => {
   const cache = sessionStorage.gamesList ? JSON.parse(sessionStorage.gamesList) : null;

   if (cache && process.env.NODE_ENV === 'production') return resolve(id ? cache.find(game => game.id === id) : cache)

   axios.get(`${apiPath}/api/game`, { cancelToken })
      .then(response => {
         const data = response.data.filter(game => game.Active)
         sessionStorage.gamesList = JSON.stringify(data);
         return resolve(id ? data.find(game => game.id === id) : data);
      })
      .catch(error => reject(error))
})
