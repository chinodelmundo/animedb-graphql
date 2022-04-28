const resolvers = {
  Query: {
    getAllAnime(parent, args, { dataSources }) {
      return dataSources.animeAPI.getAllAnime();
    },
    getAllCharacters(parent, args, { dataSources }) {
      return dataSources.animeAPI.getAllCharacters();
    }
  },
  Mutation: {
    addNewAnime: (parent, { anime }, { dataSources }) => {
      return dataSources.animeAPI.addNewAnime(anime);
    },
    addNewCharacter: (parent, { character }, { dataSources }) => {
      return dataSources.animeAPI.addNewCharacter(character);
    }
  }
};

module.exports = resolvers;
