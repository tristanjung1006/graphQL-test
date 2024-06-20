import {ApolloServer, gql} from "apollo-server";
import * as url from "node:url";

const tweets = [
    {
        id:"1",
        text:"hello",
    },
    {
        id:"2",
        text:"world",
    }
];

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
    }
    type Tweet {
        id: ID
        text: String
        author: User
    }
    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }
    # REST API에서 POST의 역할
    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

// GET /api/v1/tweets
// POST/DELETE/PUT /api/v1/tweets
// GET /api/v 1/

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        tweet(root, {id}){
            return tweets.find((tweet) => tweet.id === id);
        },
    },
};

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
    console.log(`Server started: ${url}`);
});