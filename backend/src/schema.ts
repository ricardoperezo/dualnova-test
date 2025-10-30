import { esClient } from "./elasticsearch";

export const typeDefs = `
  type Metrics {
    totalSessions: Int
    totalSessionsChange: Float
    agentCoverage: Float
    agentCoverageChange: Float
    behaviorChangeIndex: Float
    behaviorChangeIndexChange: Float
    roiGenerated: Int
    roiGeneratedChange: Float
    skillFocus: Int
    willFocus: Int
    skillWillChange: Float
  }

  type Employee {
    employeeId: String
    firstName: String
    lastName: String
    name: String
    team: String
    channel: String
    coach: String
    performanceScore: Int
    lastCoachingDays: Int
    coachingFrequency: Int
    trend: String
  }

  type CoachingSession {
    date: String
    dayName: String
    employee: String
    coach: String
    sessionCount: Int
  }

  type Query {
    metrics: Metrics
    employees: [Employee]
    coachingSessions: [CoachingSession]
  }
`;

export const resolvers = {
  Query: {
    metrics: async () => {
      const result = await esClient.search({
        index: "metrics",
        query: { match_all: {} },
        size: 1,
        sort: [{ timestamp: "desc" }],
      });

      return result.hits.hits[0]?._source || null;
    },

    employees: async () => {
      const result = await esClient.search({
        index: "employees",
        query: { match_all: {} },
        size: 100,
      });

      return result.hits.hits.map((hit) => hit._source);
    },

    coachingSessions: async () => {
      const result = await esClient.search({
        index: "coaching_sessions",
        query: { match_all: {} },
        size: 50,
        sort: [{ date: "asc" }],
      });

      return result.hits.hits.map((hit) => hit._source);
    },
  },
};
