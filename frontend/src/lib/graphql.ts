import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient('http://localhost:4000/graphql');

export const GET_DASHBOARD_DATA = `
  query {
    metrics {
      totalSessions
      totalSessionsChange
      agentCoverage
      agentCoverageChange
      behaviorChangeIndex
      behaviorChangeIndexChange
      roiGenerated
      roiGeneratedChange
      skillFocus
      willFocus
      skillWillChange
    }
    employees {
      employeeId
      name
      team
      channel
      coach
      performanceScore
      lastCoachingDays
      coachingFrequency
      trend
    }
    coachingSessions {
      date
      dayName
      employee
      coach
      sessionCount
    }
  }
`;
