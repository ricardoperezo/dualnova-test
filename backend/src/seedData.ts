import { esClient } from "./elasticsearch";

export async function seedData() {
  // Metricas
  await esClient.indices.create(
    {
      index: "metrics",
      mappings: {
        properties: {
          totalSessions: { type: "integer" },
          totalSessionsChange: { type: "float" },
          agentCoverage: { type: "float" },
          agentCoverageChange: { type: "float" },
          behaviorChangeIndex: { type: "float" },
          behaviorChangeIndexChange: { type: "float" },
          roiGenerated: { type: "integer" },
          roiGeneratedChange: { type: "float" },
          skillFocus: { type: "integer" },
          willFocus: { type: "integer" },
          skillWillChange: { type: "float" },
          timestamp: { type: "date" },
        },
      },
    },
    { ignore: [400] }
  );

  await esClient.index({
    index: "metrics",
    document: {
      totalSessions: 241,
      totalSessionsChange: 8.2,
      agentCoverage: 55.0,
      agentCoverageChange: 5.3,
      behaviorChangeIndex: 77.1,
      behaviorChangeIndexChange: 5.7,
      roiGenerated: 41000,
      roiGeneratedChange: 12.4,
      skillFocus: 60,
      willFocus: 40,
      skillWillChange: -2.1,
      timestamp: new Date(),
    },
  });

  // Empleados
  await esClient.indices.create(
    {
      index: "employees",
      mappings: {
        properties: {
          employeeId: { type: "keyword" },
          firstName: { type: "text" },
          lastName: { type: "text" },
          name: { type: "text" },
          team: { type: "keyword" },
          channel: { type: "keyword" },
          coach: { type: "text" },
          performanceScore: { type: "integer" },
          lastCoachingDays: { type: "integer" },
          coachingFrequency: { type: "integer" },
          trend: { type: "keyword" },
        },
      },
    },
    { ignore: [400] }
  );

  const teams = ["Sales", "Support", "Retention"];
  const channels = ["Phone", "Chat", "Email"];
  const coaches = ["Sarah Chen", "Michael Rodriguez", "Jennifer Park", "David Thompson", "Laura Wang"];
  const trends = ["improving", "stable", "declining"];
  const firstNames = [
    "Alex", "Blake", "Casey", "Dakota", "Emerson",
    "Finley", "Gray", "Harper", "Indigo", "Jordan",
    "Kennedy", "Logan", "Morgan", "Nova", "Ocean",
    "Parker", "Quinn", "River", "Sage", "Taylor"
  ];
  const lastNames = ["Anderson", "Brown", "Chen", "Davis", "Evans", "Foster", "Garcia", "Harris", "Irving", "Johnson"];

  let employeeCount = 0;

  for (let teamIndex = 0; teamIndex < 5; teamIndex++) {
    const team = teams[teamIndex % teams.length];

    for (let i = 0; i < 20; i++) {
      const firstName = firstNames[i];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const channel = channels[Math.floor(Math.random() * channels.length)];
      const coach = coaches[Math.floor(Math.random() * coaches.length)];
      const trend = trends[Math.floor(Math.random() * trends.length)];

      await esClient.index({
        index: "employees",
        document: {
          employeeId: `EMP-${employeeCount++}`,
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          team,
          channel,
          coach,
          performanceScore: Math.floor(Math.random() * 40) + 60, // 60-99
          lastCoachingDays: Math.floor(Math.random() * 15), // 0-14 days
          coachingFrequency: Math.floor(Math.random() * 10) + 1, // 1-10 sessions
          trend,
        },
      });
    }
  }

  // Coaching Sessions
  await esClient.indices.create(
    {
      index: "coaching_sessions",
      mappings: {
        properties: {
          date: { type: "date" },
          dayName: { type: "keyword" },
          employee: { type: "text" },
          coach: { type: "text" },
          sessionCount: { type: "integer" },
        },
      },
    },
    { ignore: [400] }
  );

  const sessions = [
    {
      date: "2024-08-12",
      dayName: "Monday, Aug 12",
      sessionCount: 8,
      employee: "A.Anderson",
      coach: "S.Chen",
    },
    {
      date: "2024-08-12",
      dayName: "Monday, Aug 12",
      sessionCount: 8,
      employee: "B.Brown",
      coach: "S.Chen",
    },
    {
      date: "2024-08-12",
      dayName: "Monday, Aug 12",
      sessionCount: 8,
      employee: "C.Clark",
      coach: "S.Chen",
    },
    {
      date: "2024-08-12",
      dayName: "Monday, Aug 12",
      sessionCount: 8,
      employee: "D.Davis",
      coach: "S.Chen",
    },
    {
      date: "2024-08-12",
      dayName: "Monday, Aug 12",
      sessionCount: 8,
      employee: "E.Evans",
      coach: "S.Chen",
    },
    {
      date: "2024-08-12",
      dayName: "Monday, Aug 12",
      sessionCount: 8,
      employee: "F.Foster",
      coach: "S.Chen",
    },
    {
      date: "2024-08-12",
      dayName: "Monday, Aug 12",
      sessionCount: 8,
      employee: "G.Green",
      coach: "S.Chen",
    },
    {
      date: "2024-08-12",
      dayName: "Monday, Aug 12",
      sessionCount: 8,
      employee: "H.Harris",
      coach: "S.Chen",
    },

    // Tuesday
    {
      date: "2024-08-13",
      dayName: "Tuesday, Aug 13",
      sessionCount: 6,
      employee: "I.Iris",
      coach: "M.Rodriguez",
    },
    {
      date: "2024-08-13",
      dayName: "Tuesday, Aug 13",
      sessionCount: 6,
      employee: "J.Johnson",
      coach: "J.Park",
    },
    {
      date: "2024-08-13",
      dayName: "Tuesday, Aug 13",
      sessionCount: 6,
      employee: "K.King",
      coach: "M.Rodriguez",
    },
    {
      date: "2024-08-13",
      dayName: "Tuesday, Aug 13",
      sessionCount: 6,
      employee: "L.Lewis",
      coach: "J.Park",
    },
    {
      date: "2024-08-13",
      dayName: "Tuesday, Aug 13",
      sessionCount: 6,
      employee: "M.Martin",
      coach: "M.Rodriguez",
    },
    {
      date: "2024-08-13",
      dayName: "Tuesday, Aug 13",
      sessionCount: 6,
      employee: "N.Nelson",
      coach: "J.Park",
    },

    // Wednesday
    {
      date: "2024-08-14",
      dayName: "Wednesday, Aug 14",
      sessionCount: 5,
      employee: "O.Owen",
      coach: "D.Thompson",
    },
    {
      date: "2024-08-14",
      dayName: "Wednesday, Aug 14",
      sessionCount: 5,
      employee: "P.Parker",
      coach: "D.Thompson",
    },
    {
      date: "2024-08-14",
      dayName: "Wednesday, Aug 14",
      sessionCount: 5,
      employee: "Q.Quinn",
      coach: "D.Thompson",
    },
    {
      date: "2024-08-14",
      dayName: "Wednesday, Aug 14",
      sessionCount: 5,
      employee: "R.Roberts",
      coach: "D.Thompson",
    },
    {
      date: "2024-08-14",
      dayName: "Wednesday, Aug 14",
      sessionCount: 5,
      employee: "S.Smith",
      coach: "D.Thompson",
    },

    // Thursday
    {
      date: "2024-08-15",
      dayName: "Thursday, Aug 15",
      sessionCount: 7,
      employee: "T.Taylor",
      coach: "L.Wang",
    },
    {
      date: "2024-08-15",
      dayName: "Thursday, Aug 15",
      sessionCount: 7,
      employee: "U.Uma",
      coach: "R.Kim",
    },
    {
      date: "2024-08-15",
      dayName: "Thursday, Aug 15",
      sessionCount: 7,
      employee: "V.Val",
      coach: "M.Garcia",
    },
    {
      date: "2024-08-15",
      dayName: "Thursday, Aug 15",
      sessionCount: 7,
      employee: "W.White",
      coach: "L.Wang",
    },
    {
      date: "2024-08-15",
      dayName: "Thursday, Aug 15",
      sessionCount: 7,
      employee: "X.Xara",
      coach: "R.Kim",
    },
    {
      date: "2024-08-15",
      dayName: "Thursday, Aug 15",
      sessionCount: 7,
      employee: "Y.Young",
      coach: "M.Garcia",
    },
    {
      date: "2024-08-15",
      dayName: "Thursday, Aug 15",
      sessionCount: 7,
      employee: "Z.Zara",
      coach: "L.Wang",
    },

    // Friday
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "A.Adams",
      coach: "J.Lee",
    },
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "B.Baker",
      coach: "A.Johnson",
    },
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "C.Cooper",
      coach: "J.Lee",
    },
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "D.Drew",
      coach: "A.Johnson",
    },
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "E.Ellis",
      coach: "J.Lee",
    },
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "F.Fisher",
      coach: "A.Johnson",
    },
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "G.Gray",
      coach: "J.Lee",
    },
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "H.Hill",
      coach: "A.Johnson",
    },
    {
      date: "2024-08-16",
      dayName: "Friday, Aug 16",
      sessionCount: 9,
      employee: "I.Irving",
      coach: "J.Lee",
    },
  ];

  for (const session of sessions) {
    await esClient.index({
      index: "coaching_sessions",
      document: session,
    });
  }

  console.log("All data seeded");
}
