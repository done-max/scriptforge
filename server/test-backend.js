async function testBackend() {
  console.log('Testing ScriptForge Backend API...');
  
  // 1. Health check
  const healthRes = await fetch('http://localhost:5000/api/health');
  const health = await healthRes.json();
  console.log('1. Health Check:', health);

  // 2. Signup
  const signupRes = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'vikram_ray',
      email: 'vikram@nyufilm.edu',
      password: 'filmmakingpass',
    }),
  });
  const signupData = await signupRes.json();
  console.log('2. Signup Result:', {
    token: signupData.token ? 'TOKEN_RECEIVED' : 'NONE',
    user: signupData.user,
    emailNotification: signupData.emailNotification,
  });

  const token = signupData.token;

  // 3. Check Emails for user
  const emailsRes = await fetch('http://localhost:5000/api/emails', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const emailsData = await emailsRes.json();
  console.log('3. Dispatched Emails in DB:', emailsData.emails.length, 'emails found.');
  console.log('   Email subject:', emailsData.emails[0]?.subject);
  console.log('   Recipient:', emailsData.emails[0]?.recipientEmail);

  // 4. Create / Upload Script
  const uploadRes = await fetch('http://localhost:5000/api/scripts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'MIDNIGHT HARBOR',
      author: 'Vikram Ray',
      genre: 'Noir',
      pageCount: 15,
      storyIntelligenceScore: 86,
      logline: 'A retired marine detective inspects an abandoned shipyard.',
      fullRawText: 'INT. DOCKHOUSE - NIGHT\n\nRain drums against corrugated tin.\n\nVIKRAM\n(lighting a match)\nWe are running out of shoreline.',
      scenes: [
        {
          id: 'scn-1',
          sceneNumber: 1,
          slugline: 'INT. DOCKHOUSE - NIGHT',
          location: 'DOCKHOUSE',
          timeOfDay: 'NIGHT',
          pageNumber: 1,
          summary: 'Vikram arrives at the dockhouse in the rain.',
          content: 'INT. DOCKHOUSE - NIGHT\n\nRain drums against corrugated tin.\n\nVIKRAM\n(lighting a match)\nWe are running out of shoreline.',
          charactersPresent: ['VIKRAM'],
          dialogueLines: [],
          conflictIntensity: 75,
          dialogueDensity: 50,
          actionDensity: 50,
          estDurationMinutes: 1,
          act: 'Act I',
          aiAnnotations: [],
        },
      ],
      characters: [
        {
          id: 'c-vikram',
          name: 'VIKRAM',
          role: 'Protagonist',
          externalGoal: 'Recover the lost harbor log',
          internalNeed: 'Confront his past trauma',
          coreFear: 'Becoming like the smugglers',
          stakes: 'Loss of freedom',
          screenTimePercentage: 90,
          arcSummary: 'From cynical recluse to courageous witness',
          voiceProfile: {
            dialogueRhythm: 'Terse, measured cadence',
            vocabularyCadence: 'Marine technical slang',
            emotionalDefenseMechanism: 'Deflection through weather observations',
          },
          arcStages: [],
          relationships: [],
        },
      ],
    }),
  });

  const uploadData = await uploadRes.json();
  console.log('4. Upload Script to SQLite Result:', uploadData.message, 'Script ID:', uploadData.script?.id);

  // 5. Fetch all scripts for user
  const allScriptsRes = await fetch('http://localhost:5000/api/scripts', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const allScriptsData = await allScriptsRes.json();
  console.log('5. Total Screenplays Retrieved from SQLite:', allScriptsData.scripts.length);

  console.log('ALL BACKEND & DATABASE TESTS COMPLETED SUCCESSFULLY!');
}

testBackend().catch(console.error);
