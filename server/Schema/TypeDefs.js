const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Anime {
    id: ID!
    title: String!
    year: Int
    image: String
    characters: [Character]
  }

  type Character {
    id: ID!
    name: String!
    image: String
    favorites: Int
    about: String
    animeId: ID!
  }

  type Query {
    getAllAnime: [Anime!]!
    getAllCharacters: [Character!]!
  }

  type Mutation {
    addNewAnime(anime: AnimeInput): Anime
  }

  input AnimeInput {
    id: ID!
    title: String!
    year: Int
    image: String
  }

  type Mutation {
    addNewCharacter(character: CharacterInput): Character
  }

  input CharacterInput {
    id: ID!
    name: String!
    favorites: Int
    about: String
    image: String
    animeid: ID!
  }
`;

module.exports = typeDefs;
