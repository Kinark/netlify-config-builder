import { bool, string, shape, arrayOf, array } from 'prop-types';

export default shape({
   Active: bool.isRequired,
   Name: string.isRequired,
   Description: string.isRequired,
   Released: string.isRequired,
   createdAt: string.isRequired,
   updatedAt: string.isRequired,
   id: string.isRequired,
   Genre: string.isRequired,
   EffectPhrase: string.isRequired,
   ShortDescription: string.isRequired,
   Platforms: string.isRequired,
   AppStoreURL: string,
   BlogURL: string,
   ReleaseDate: string.isRequired,
   SpecialPageURL: string,
   SteamURL: string,
   TrailerURL: string,
   Screenshots: array,
   MediaKit: shape({
      url: string,
      id: string
   }),
   press: arrayOf(
      shape({
         Active: bool,
         Title: string,
         Description: string,
         Date: string,
         Link: string,
         id: string
      })
   ).isRequired,
   rewards: arrayOf(
      shape({
         Active: bool,
         Title: string,
         Description: string,
         Date: string,
         id: string,
         Badge: shape({
            url: string,
         }),
      })
   ).isRequired,
   GamesListCover: shape({
      url: string,
      id: string
   }).isRequired,
   GameCover: shape({
      url: string,
      id: string
   }),
   Logo: shape({
      url: string,
      id: string
   }).isRequired
})
