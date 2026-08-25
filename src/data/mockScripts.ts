import type { Screenplay } from '../types/script';

export const MOCK_SCRIPTS: Screenplay[] = [
  {
    id: 'the-last-train',
    title: 'THE LAST TRAIN',
    author: 'Elena Vance & Arjun Mehta',
    genre: 'Drama',
    pageCount: 18,
    lastEdited: '12 mins ago',
    storyIntelligenceScore: 82,
    categoryScores: {
      structure: 86,
      character: 91,
      dialogue: 78,
      pacing: 74,
      theme: 89,
      visualStorytelling: 84,
    },
    logline:
      'On the final commuter train out of an abandoned industrial terminal, an estranged father and his adult daughter must confront a ten-year silence before the train reaches its terminus.',
    fullRawText: `EXT. RAILYARD TERMINAL - NIGHT

A relentless coastal downpour lashing against rusting freight cars. The rain turns the gravel into black glass.

A lone passenger train idles on Track 4, diesel engines humming like a dying leviathan.

INT. PASSENGER CAR 3 - CONTINUOUS

Flickering incandescent tubes hum overhead. The air smells of damp wool and cold brass.

ARJUN (58) sits by the frosted window. Weathered trench coat, silver-threaded beard. His knuckles are scarred from thirty years of dockwork. Between his fingers, he rolls an old silver coin.

Down the aisle, wet footsteps echo.

ELENA (28) stands in the doorway. Soaked dark coat, clutching a leather violin case as if it were a shield. Her eyes lock onto Arjun. Ten years of unspoken grief hangs between them.

ARJUN
(without looking up)
You almost missed it.

ELENA
I wasn't sure I wanted to catch it.

Arjun finally looks up. The coin stops between his calloused fingers.

ARJUN
Sit down, Elena. The conductor won't stop again until the harbor.

Elena hesitates. She takes the vinyl seat across from him, placing the violin case between them like a barricade.

ELENA
You haven't changed the coat.

ARJUN
Keeps the rain out. That's all a coat is supposed to do.

ELENA
(dry smile)
Practical as ever. Is that why you didn't call after Mother's service? Not practical?

Arjun flinches. A micro-expression of raw guilt vanishes behind a hardened jawline.

ARJUN
I came here because you asked. Not to dissect a decade on a ninety-minute commute.

ELENA
You came because you have nowhere else to run.

EXT. TRAIN TRACKS - NIGHT

The train lurches forward into the black coastal expanse, its headlights piercing through the deluge.`,
    scenes: [
      {
        id: 's-1',
        sceneNumber: 1,
        slugline: 'EXT. RAILYARD TERMINAL - NIGHT',
        location: 'Railyard Terminal',
        timeOfDay: 'NIGHT',
        act: 'Act I',
        pageNumber: 1,
        estDurationMinutes: 2,
        conflictIntensity: 65,
        dialogueDensity: 30,
        actionDensity: 85,
        emotionalValence: -25,
        summary: 'Establish the bleak, storm-swept terminal and the idling commuter train.',
        content: `EXT. RAILYARD TERMINAL - NIGHT

A relentless coastal downpour lashing against rusting freight cars. The rain turns the gravel into black glass.

A lone passenger train idles on Track 4, diesel engines humming like a dying leviathan. Steam hisses from the brake lines into the chill Atlantic air.

The station clock reads 11:58 PM. The last departure.`,
        dialogueLines: [],
        charactersPresent: [],
        themesAddressed: ['Isolation', 'The Inescapable Past'],
        motifsPresent: ['Coastal Rain', 'Rusting Freight Cars'],
        aiAnnotations: [
          {
            id: 'ann-1',
            lineSnippet: 'diesel engines humming like a dying leviathan',
            type: 'visual',
            title: 'Atmospheric Sensory Anchor',
            observation: 'The animalistic metaphor gives immediate mechanical weight to the train.',
            whyItMatters: 'Establishes the claustrophobic and inevitable pressure of the upcoming reunion.',
            suggestion: 'Consider adding a subtle sound cue of the station horn to mark the temporal countdown.',
            severity: 'low',
          },
        ],
        rewriteSuggestions: {
          tightenPacing: 'EXT. RAILYARD TERMINAL - NIGHT\n\nCoastal rain turns gravel to black glass.\n\nOn Track 4, the midnight passenger train idles—diesel rumble cutting the deluge.\n\n11:58 PM. Final call.',
          increaseTension: 'EXT. RAILYARD TERMINAL - NIGHT\n\nRain hammers Track 4. The train shudders, brakes groaning against rusted steel.\n\nTime running out.',
          deepenSubtext: 'EXT. RAILYARD TERMINAL - NIGHT\n\nFreight cars rot in the Atlantic deluge. Between them, one lone engine keeps breathing.',
          raiseStakes: 'EXT. RAILYARD TERMINAL - NIGHT\n\nThe last train out before the rail line permanently shuts down.',
          strengthenVoice: 'EXT. RAILYARD TERMINAL - NIGHT\n\nBlack water drowns the gravel. The engine growls like an old dog waiting to die.',
          reduceExposition: 'EXT. RAILYARD TERMINAL - NIGHT\n\nStorm-soaked railyard. Track 4 engine hums. 11:58 PM.',
        },
      },
      {
        id: 's-2',
        sceneNumber: 2,
        slugline: 'INT. PASSENGER CAR 3 - CONTINUOUS',
        location: 'Passenger Car 3',
        timeOfDay: 'NIGHT',
        act: 'Act I',
        pageNumber: 2,
        estDurationMinutes: 4,
        conflictIntensity: 88,
        dialogueDensity: 82,
        actionDensity: 35,
        emotionalValence: -40,
        summary: 'Elena confronts Arjun in the empty carriage; their ten-year estrangement flares up.',
        content: `INT. PASSENGER CAR 3 - CONTINUOUS

Flickering incandescent tubes hum overhead. The air smells of damp wool and cold brass.

ARJUN (58) sits by the frosted window. Weathered trench coat, silver-threaded beard. His knuckles are scarred from thirty years of dockwork. Between his fingers, he rolls an old silver coin.

Down the aisle, wet footsteps echo.

ELENA (28) stands in the doorway. Soaked dark coat, clutching a leather violin case as if it were a shield. Her eyes lock onto Arjun. Ten years of unspoken grief hangs between them.

ARJUN
(without looking up)
You almost missed it.

ELENA
I wasn't sure I wanted to catch it.

Arjun finally looks up. The coin stops between his calloused fingers.

ARJUN
Sit down, Elena. The conductor won't stop again until the harbor.

Elena hesitates. She takes the vinyl seat across from him, placing the violin case between them like a barricade.

ELENA
You haven't changed the coat.

ARJUN
Keeps the rain out. That's all a coat is supposed to do.

ELENA
(dry smile)
Practical as ever. Is that why you didn't call after Mother's service? Not practical?

Arjun flinches. A micro-expression of raw guilt vanishes behind a hardened jawline.

ARJUN
I came here because you asked. Not to dissect a decade on a ninety-minute commute.

ELENA
You came because you have nowhere else to run.`,
        dialogueLines: [
          {
            id: 'd-1',
            character: 'ARJUN',
            parenthetical: 'without looking up',
            line: 'You almost missed it.',
            subtextScore: 84,
            naturalnessScore: 92,
            tensionScore: 78,
            subtextAnalysis: {
              surfaceMeaning: 'Commentary on her arrival time.',
              underlyingEmotion: 'Deep fear that she would abandon him again, masked as casual indifference.',
              whyItWorksOrStruggles: 'High subtext. He does not say "I waited for you in terror," he deflects to punctuality.',
              suggestedAlternative: 'The platform bell rang twice.',
              highTensionAlternative: 'Door was already locking.',
              visualTerseAlternative: 'Two minutes to spare.',
            },
          },
          {
            id: 'd-2',
            character: 'ELENA',
            line: "I wasn't sure I wanted to catch it.",
            subtextScore: 72,
            naturalnessScore: 85,
            tensionScore: 88,
            subtextAnalysis: {
              surfaceMeaning: 'She had doubts about getting on the train.',
              underlyingEmotion: 'She wanted to hurt him immediately to protect herself from being vulnerable.',
              whyItWorksOrStruggles: 'Direct escalation. Sets the terms of engagement immediately.',
              suggestedAlternative: 'Ticket agent told me there is another in the morning. Almost took it.',
              highTensionAlternative: 'Would have saved us both the trouble.',
            },
          },
          {
            id: 'd-3',
            character: 'ELENA',
            parenthetical: 'dry smile',
            line: "Practical as ever. Is that why you didn't call after Mother's service? Not practical?",
            subtextScore: 54,
            naturalnessScore: 68,
            tensionScore: 90,
            hasExpositionRisk: true,
            isOnTheNose: true,
            subtextAnalysis: {
              surfaceMeaning: 'Confronting him about not calling after the funeral.',
              underlyingEmotion: 'Devastation that he abandoned the family during their darkest hour.',
              whyItWorksOrStruggles: 'Slightly on-the-nose exposition. She names "Mother\'s service" directly instead of letting the resentment breathe.',
              suggestedAlternative: 'Practical. Like staying in Rotterdam through November.',
              highTensionAlternative: 'Ten years of rain, Arjun. You still think you can stay dry?',
              visualTerseAlternative: 'Did the coat keep the church bells out too?',
            },
          },
          {
            id: 'd-4',
            character: 'ARJUN',
            line: 'I came here because you asked. Not to dissect a decade on a ninety-minute commute.',
            subtextScore: 62,
            naturalnessScore: 80,
            tensionScore: 85,
            subtextAnalysis: {
              surfaceMeaning: 'Setting boundaries for the conversation.',
              underlyingEmotion: 'Desperate shame about his past cowardice.',
              whyItWorksOrStruggles: 'Strong defensive posturing characteristic of a stoic dockworker.',
              suggestedAlternative: 'We have ninety minutes. Let’s not waste sixty of them on graves.',
            },
          },
        ],
        charactersPresent: ['ARJUN', 'ELENA'],
        themesAddressed: ['Grief & Evasion', 'The Burden of Memory', 'Father-Daughter Fracture'],
        motifsPresent: ['Silver Coin', 'Violin Case Barrier', 'Weathered Coat'],
        aiAnnotations: [
          {
            id: 'ann-2',
            lineSnippet: 'Is that why you didn\'t call after Mother\'s service?',
            type: 'dialogue',
            title: 'Expositional Dialogue Flag',
            observation: 'Elena introduces backstory explicitly rather than through organic behavioral conflict.',
            whyItMatters: 'Reduces subtext and feels like writer convenience to inform the audience.',
            suggestion: 'Have Elena focus on the physical object (the black ribbon or cold silence) rather than spelling out "Mother\'s service".',
            severity: 'medium',
          },
          {
            id: 'ann-3',
            lineSnippet: 'placing the violin case between them like a barricade',
            type: 'visual',
            title: 'Masterful Prop Staging',
            observation: 'Physicalizes the emotional wall between father and daughter.',
            whyItMatters: 'Props used as emotional armor give actors clear physical objectives.',
            suggestion: 'Maintain this barrier across Act II and have Arjun attempt to touch it during the midpoint breakdown.',
            severity: 'low',
          },
        ],
        rewriteSuggestions: {
          tightenPacing: `ARJUN\nYou made it.\n\nELENA\nBarely.\n\nARJUN\nSit. Conductor won't stop till the docks.\n\nElena sits. Drops the violin case between them. A concrete wall.`,
          increaseTension: `ARJUN\nYou almost missed it.\n\nELENA\nI stood on Track 3 for twenty minutes hoping it would derail.\n\nArjun stops the coin. The metal clinks cold against his ring.`,
          deepenSubtext: `ELENA\nYou haven't changed the coat.\n\nARJUN\nKeeps the rain out.\n\nELENA\nDid it keep the church bells out in November?`,
          raiseStakes: `ELENA\nThe bank served the foreclosure notice yesterday, Arjun. This train ride is all that's left of the estate.`,
          strengthenVoice: `ARJUN\nWind's coming off the estuary. Sit down before you freeze that fiddle.`,
          reduceExposition: `ELENA\nPractical. Just like you were ten years ago.`,
        },
      },
      {
        id: 's-3',
        sceneNumber: 3,
        slugline: 'INT. PASSENGER CAR 3 - LATER (MIDPOINT)',
        location: 'Passenger Car 3',
        timeOfDay: 'NIGHT',
        act: 'Act IIA',
        pageNumber: 8,
        estDurationMinutes: 5,
        conflictIntensity: 92,
        dialogueDensity: 88,
        actionDensity: 20,
        emotionalValence: -15,
        summary: 'Arjun reveals the truth about his absence: he was imprisoned following the shipyard strike.',
        content: `INT. PASSENGER CAR 3 - LATER

Rain streaks horizontal across the window glass. The train rattles violently over switch tracks.

The violin case sits open between them now. Inside: velvet lining, but no violin. Only stacks of yellowed letters, unsent, addressed to Elena.

Elena stares at the handwriting. Her fingers tremble over the postmarks: ROTTERDAM, GDANSK, ANTWERP.

ELENA
You wrote these. Every month.

ARJUN
(voice cracked)
They wouldn't let me send them from the detention ward. Not while the union trial was active.

ELENA
You let me believe you were drinking on the docks. You let Mother die thinking you simply walked away.

ARJUN
Your mother knew, Elena. She was the one who hid the money in the conservatory floorboards so you could study in Vienna.

Elena freezes. The entire narrative of her life re-aligns in a single second.

ELENA
She lied to me? To protect you?

ARJUN
To protect you from my trial.

Arjun reaches across the vinyl divider. For the first time, his hand touches hers.`,
        dialogueLines: [
          {
            id: 'd-5',
            character: 'ELENA',
            line: 'You wrote these. Every month.',
            subtextScore: 90,
            naturalnessScore: 95,
            tensionScore: 89,
            subtextAnalysis: {
              surfaceMeaning: 'Acknowledging the existence of the letters.',
              underlyingEmotion: 'The agonizing shattering of her decade-long hatred.',
              whyItWorksOrStruggles: 'Simplicity gives immense emotional room for the actor.',
              suggestedAlternative: 'The ink is ten years old.',
            },
          },
          {
            id: 'd-6',
            character: 'ARJUN',
            parenthetical: 'voice cracked',
            line: "They wouldn't let me send them from the detention ward. Not while the union trial was active.",
            subtextScore: 78,
            naturalnessScore: 82,
            tensionScore: 94,
            subtextAnalysis: {
              surfaceMeaning: 'Explaining the institutional censorship.',
              underlyingEmotion: 'The humiliation of having failed to be present.',
              whyItWorksOrStruggles: 'High-stakes revelation that reframes the entire inciting incident.',
              suggestedAlternative: 'Three censors stamped every page. None left the block.',
            },
          },
        ],
        charactersPresent: ['ARJUN', 'ELENA'],
        themesAddressed: ['Sacrifice vs Deception', 'The Illusion of Abandonment', 'Redemption'],
        motifsPresent: ['Unsent Yellowed Letters', 'Violin Case as Secret Box', 'Switch Track Rattle'],
        aiAnnotations: [
          {
            id: 'ann-4',
            lineSnippet: 'The violin case sits open between them now. Inside: velvet lining, but no violin.',
            type: 'structure',
            title: 'Midpoint Reversal Revelation',
            observation: 'The subversion of the expected violin prop into an archive of unsent letters executes a textbook dramatic pivot.',
            whyItMatters: 'Shifts Elena from interrogator to conflicted mourner, raising the emotional stakes for the second half.',
            suggestion: 'Emphasize the physical scent of the old paper or grease on the envelopes to heighten cinematic realism.',
            severity: 'low',
          },
        ],
      },
      {
        id: 's-4',
        sceneNumber: 4,
        slugline: 'EXT. HARBOR PIER STATION - DAWN',
        location: 'Harbor Pier Station',
        timeOfDay: 'DAWN',
        act: 'Act III',
        pageNumber: 17,
        estDurationMinutes: 3,
        conflictIntensity: 45,
        dialogueDensity: 25,
        actionDensity: 60,
        emotionalValence: 35,
        summary: 'The train reaches the Atlantic terminus. Arjun and Elena step onto the mist-laden dock together.',
        content: `EXT. HARBOR PIER STATION - DAWN

The rain has tapered into a fine, salty sea spray. Pale blue light breaks across the horizon, illuminating the silhouettes of ocean freighters.

The train comes to a final, hissing halt.

Arjun steps down onto the wooden pier planks. The wind catches his coat.

Behind him, Elena steps down. In her right hand: the violin case, now carrying the letters. In her left hand: Arjun's old silver coin.

ARJUN
First ferry to the island leaves at seven.

Elena looks at the coin in her palm. The silver catches the first glint of dawn.

ELENA
We have twenty minutes.

ARJUN
Coffee?

ELENA
Black. Two sugars. Like you used to make it.

Arjun smiles—small, cracked, but genuine. They walk side by side down the wet timber pier into the rising light.

FADE OUT.`,
        dialogueLines: [
          {
            id: 'd-7',
            character: 'ELENA',
            line: 'Black. Two sugars. Like you used to make it.',
            subtextScore: 96,
            naturalnessScore: 94,
            tensionScore: 40,
            subtextAnalysis: {
              surfaceMeaning: 'Coffee order preference.',
              underlyingEmotion: 'Unconditional reconciliation and acknowledgment of childhood memories.',
              whyItWorksOrStruggles: 'Perfect craft-based resonance. Bridges the ten-year gap through a tactile ritual.',
              suggestedAlternative: 'Two sugars. Don\'t forget this time.',
            },
          },
        ],
        charactersPresent: ['ARJUN', 'ELENA'],
        themesAddressed: ['Rebirth at Dawn', 'Shared Heritage', 'Resolution'],
        motifsPresent: ['First Light on Atlantic', 'Silver Coin Exchange', 'Coffee Ritual'],
        aiAnnotations: [
          {
            id: 'ann-5',
            lineSnippet: 'In her left hand: Arjun\'s old silver coin.',
            type: 'theme',
            title: 'Circular Motif Resolution',
            observation: 'The coin, introduced as Arjun\'s nervous avoidance tool in Scene 1, is now held by Elena.',
            whyItMatters: 'Completes the thematic arc of generational inheritance and forgiveness.',
            suggestion: 'Ensure the coin is visually highlighted in the cinematography notes.',
            severity: 'low',
          },
        ],
      },
    ],
    characters: [
      {
        id: 'c-arjun',
        name: 'ARJUN',
        role: 'Protagonist',
        externalGoal: 'Deliver the truth and his life savings to Elena before the rail line shuts down.',
        internalNeed: 'Forgive himself for the years lost to political imprisonment and admit his shame.',
        coreFear: 'Dying in complete obscurity without his daughter knowing he loved her.',
        stakes: 'Permanently losing the only family member he has left.',
        arcSummary: 'Defensive Avoidance → Painful Confession → Rebuilt Dignity',
        arcStages: [
          { stage: 'Status Quo (Defensive Armor)', sceneNumber: 1, description: 'Hides behind silence and physical routine rolling his coin.', emotionalState: 25 },
          { stage: 'First Crack (The Funeral Question)', sceneNumber: 2, description: 'Forced to endure Elena\'s bitter accusations without defending himself.', emotionalState: 38 },
          { stage: 'The Midpoint Revelation', sceneNumber: 3, description: 'Unlocks the violin case, exposing his years in the detention ward.', emotionalState: 75 },
          { stage: 'Resolution & Acceptance', sceneNumber: 4, description: 'Hands over the coin, accepting a quiet future together on the island.', emotionalState: 88 },
        ],
        voiceProfile: {
          vocabularyCadence: 'Terse, maritime idioms, monosyllabic under stress, deliberate and measured.',
          emotionalDefenseMechanism: 'Changes topic to logistical details (timetables, coats, weather, fares).',
          dialogueRhythm: 'Short declarative sentences punctuated by heavy sensory pauses.',
          distinctivePhrasing: 'Keeps the rain out; That is all it is supposed to do; Dock rules.',
        },
        screenTimePercentage: 62,
        sceneAppearances: [1, 2, 3, 4],
        relationships: [
          {
            targetCharacter: 'ELENA',
            dynamic: 'Estranged father / daughter bound by shared trauma and pride.',
            conflictVector: 'Elena seeks vengeance for neglect; Arjun seeks absolution without pity.',
            powerBalance: 'Volatile',
          },
        ],
      },
      {
        id: 'c-elena',
        name: 'ELENA',
        role: 'Protagonist',
        externalGoal: 'Force Arjun to apologize for abandoning her mother before leaving the country.',
        internalNeed: 'Let go of her armor of resentment and mourn the parents she misunderstood.',
        coreFear: 'Discovering that she inherited her father\'s emotional coldness and solitude.',
        stakes: 'Living the rest of her creative life poisoned by bitterness and artistic paralysis.',
        arcSummary: 'Aggressive Interrogation → Vulnerability & Grief → Forgiveness',
        arcStages: [
          { stage: 'The Shield (Violin Barricade)', sceneNumber: 2, description: 'Enters armed with sarcastic barbs and bitter grievances.', emotionalState: 30 },
          { stage: 'The Discovery of the Letters', sceneNumber: 3, description: 'Realizes her father never stopped writing; her worldview crumbles.', emotionalState: 65 },
          { stage: 'Dawn on the Pier', sceneNumber: 4, description: 'Accepts the silver coin and orders coffee with two sugars.', emotionalState: 90 },
        ],
        voiceProfile: {
          vocabularyCadence: 'Sharp, musical metaphors, ironic wit, quick-fire cadence.',
          emotionalDefenseMechanism: 'Sarcastic mockery and preemptive emotional strikes.',
          dialogueRhythm: 'Staccato questions followed by piercing philosophical observations.',
          distinctivePhrasing: 'Practical as ever; Ten years of silence; Was Vienna worth it?',
        },
        screenTimePercentage: 58,
        sceneAppearances: [2, 3, 4],
        relationships: [
          {
            targetCharacter: 'ARJUN',
            dynamic: 'Adversarial prosecutor transforming into grieving daughter.',
            conflictVector: 'Reconciling childhood devotion with adult betrayal.',
            powerBalance: 'Balanced',
          },
        ],
      },
    ],
    storyBeats: [
      {
        id: 'b-1',
        beatName: 'Opening Image',
        act: 'Act I',
        targetPage: 1,
        actualScene: 1,
        dramaticFunction: 'Visualizes the dying industrial past and isolated storm environment.',
        craftEvaluation: 'Strong',
        description: 'Track 4 railyard at midnight; the dying leviathan engine in the Atlantic downpour.',
        aiFeedback: {
          observation: 'Atmospheric density is palpable.',
          whyItMatters: 'Immerses the audience in sensory weight before a single line of dialogue is spoken.',
          suggestion: 'Ensure the sound design bridges into the interior cabin rattle.',
        },
      },
      {
        id: 'b-2',
        beatName: 'Inciting Incident (Catalyst)',
        act: 'Act I',
        targetPage: 2,
        actualScene: 2,
        dramaticFunction: 'Elena boards the train and places the violin case between them.',
        craftEvaluation: 'Strong',
        description: 'The physical meeting of two estranged lives under a non-negotiable countdown.',
        aiFeedback: {
          observation: 'Physical prop placement sets the boundary of conflict.',
          whyItMatters: 'Anchors an otherwise talky scene in physical space.',
          suggestion: 'Escalate the emotional stakes before the first train whistle.',
        },
      },
      {
        id: 'b-3',
        beatName: 'Break into Two (Act IIA)',
        act: 'Act IIA',
        targetPage: 5,
        actualScene: 2,
        dramaticFunction: 'Elena challenges Arjun to tell her why he missed the funeral.',
        craftEvaluation: 'Needs Escalation',
        description: 'The argument escalates from polite evasion to direct accusatory warfare.',
        aiFeedback: {
          observation: 'Dialogue trends slightly on-the-nose on page 4.',
          whyItMatters: 'Reduces the mystery if Elena reveals all her anger too quickly.',
          suggestion: 'Have Arjun stonewall with physical action before the truth breaks through.',
        },
      },
      {
        id: 'b-4',
        beatName: 'Midpoint Reversal',
        act: 'Act IIA',
        targetPage: 8,
        actualScene: 3,
        dramaticFunction: 'Opening of the violin case reveals stacks of unsent prison letters.',
        craftEvaluation: 'Strong',
        description: 'The core premise inverts: Arjun was imprisoned, not indifferent.',
        aiFeedback: {
          observation: 'Flawlessly executes a dramatic reversal that deepens both characters.',
          whyItMatters: 'Validates the audience\'s investment and elevates the story from simple melodrama to tragedy.',
          suggestion: 'Give Elena three silent beats to process the handwriting on the stamps.',
        },
      },
      {
        id: 'b-5',
        beatName: 'All Is Lost / Dark Night of the Soul',
        act: 'Act IIB',
        targetPage: 12,
        actualScene: 3,
        dramaticFunction: 'Elena realizes her deceased mother concealed the truth to protect her career.',
        craftEvaluation: 'Strong',
        description: 'Elena confronts the painful realization that her entire adult identity was built on a false grievance.',
        aiFeedback: {
          observation: 'Shifts the antagonist from the father to the burden of protective silence.',
          whyItMatters: 'Creates authentic adult catharsis.',
          suggestion: 'Keep dialogue minimal during the mother\'s letter reading.',
        },
      },
      {
        id: 'b-6',
        beatName: 'Climax & Finale',
        act: 'Act III',
        targetPage: 17,
        actualScene: 4,
        dramaticFunction: 'Dawn arrival at the harbor pier; transfer of the silver coin.',
        craftEvaluation: 'Strong',
        description: 'The rain stops; father and daughter walk down the pier together into dawn light.',
        aiFeedback: {
          observation: 'Visual storytelling resolves the thematic conflict without speeches.',
          whyItMatters: 'Leaves a lasting cinematic resonance that respects the audience.',
          suggestion: 'Ensure the final fade out lands on their synchronized footsteps.',
        },
      },
    ],
    themeMotifs: [
      {
        id: 't-1',
        name: 'The Silver Coin (Inheritance & Guilt)',
        type: 'symbol',
        description: 'Arjun\'s tactile anchor rolled between scarred dockworker knuckles.',
        sceneChain: [1, 2, 4],
        occurrences: [
          { sceneNumber: 1, contextQuote: 'Between his fingers, he rolls an old silver coin.', thematicResonance: 'Nervous compulsion masking guilt.' },
          { sceneNumber: 2, contextQuote: 'The coin stops between his calloused fingers.', thematicResonance: 'Arrest of routine when confrontation begins.' },
          { sceneNumber: 4, contextQuote: 'In her left hand: Arjun\'s old silver coin.', thematicResonance: 'Generational forgiveness and shared burden.' },
        ],
      },
      {
        id: 't-2',
        name: 'The Weathered Trench Coat (Armor vs Exposure)',
        type: 'visual_motif',
        description: 'Arjun\'s barrier against both the Atlantic downpour and emotional vulnerability.',
        sceneChain: [1, 2, 4],
        occurrences: [
          { sceneNumber: 1, contextQuote: 'Weathered trench coat, silver-threaded beard.', thematicResonance: 'Wear and tear of working-class survival.' },
          { sceneNumber: 2, contextQuote: 'Keeps the rain out. That\'s all a coat is supposed to do.', thematicResonance: 'Emotional defense disguised as practicality.' },
          { sceneNumber: 4, contextQuote: 'The wind catches his coat... pale blue light breaks.', thematicResonance: 'Openness to the elements and new morning.' },
        ],
      },
      {
        id: 't-3',
        name: 'Loneliness & The Atlantic Horizon',
        type: 'theme',
        description: 'The vast ocean as the boundary between exile and homecoming.',
        sceneChain: [1, 2, 3, 4],
        occurrences: [
          { sceneNumber: 1, contextQuote: 'Relentless coastal downpour turning gravel to black glass.', thematicResonance: 'Bleak isolation of the terminal.' },
          { sceneNumber: 3, contextQuote: 'Rain streaks horizontal... train rattles over switch tracks.', thematicResonance: 'Psychological turbulence at midpoint.' },
          { sceneNumber: 4, contextQuote: 'Pale blue light breaks across the horizon.', thematicResonance: 'The Odyssey completion: Ithaca reached.' },
        ],
      },
    ],
    continuityIssues: [
      {
        id: 'cont-1',
        category: 'Timeline',
        severity: 'Moderate',
        title: 'Train Departure Countdown Mismatch',
        firstScene: 1,
        secondScene: 2,
        description: 'Scene 1 establishes departure at 11:58 PM. Scene 2 states the ride is a 90-minute commute to the harbor, but Scene 4 takes place at 7:00 AM dawn (over 6 hours later).',
        evidenceA: 'Scene 1: "The station clock reads 11:58 PM. The last departure."',
        evidenceB: 'Scene 4: "First ferry to the island leaves at seven."',
        resolutionOptions: [
          {
            optionTitle: 'Insert Freight Siding Delay',
            proposedPatch: 'Add a brief conductor announcement in Scene 3 noting an engine switch on the salt marshes, accounting for the 4-hour delay.',
            impactDescription: 'Increases claustrophobia in the car and validates the dawn arrival.',
          },
          {
            optionTitle: 'Adjust Starting Time to 04:30 AM',
            proposedPatch: 'Change Scene 1 clock from 11:58 PM to 04:45 AM pre-dawn departure.',
            impactDescription: 'Aligns 90-minute commute precisely with 6:30 AM arrival at ferry pier.',
          },
        ],
      },
      {
        id: 'cont-2',
        category: 'Prop',
        severity: 'Minor',
        title: 'Violin Case Lock Status',
        firstScene: 2,
        secondScene: 3,
        description: 'Scene 2 states Elena is clutching the case tightly locked; Scene 3 opens with it already laid out without a key unlock action.',
        evidenceA: 'Scene 2: "placing the violin case between them like a barricade"',
        evidenceB: 'Scene 3: "The violin case sits open between them now."',
        resolutionOptions: [
          {
            optionTitle: 'Add Brass Latch Snap Action',
            proposedPatch: 'Insert: "Elena\'s thumbs flick the dual brass latches. SNAP. The velvet lid lifts."',
            impactDescription: 'Provides an auditory transition into the midpoint revelation.',
          },
        ],
      },
    ],
    coverage: {
      logline:
        'Trapped on the final midnight commuter train before a coastal rail line shuts down forever, a scarred dockworker and his estranged violinist daughter must unpack ten years of unsent letters before they hit the harbor terminal.',
      synopsis:
        'The Last Train is a tightly wound, two-hander chamber drama set in a vintage passenger carriage during a torrential Atlantic storm. What begins as a bitter inquest into familial abandonment morphs into an exploration of labor struggle, political imprisonment, and the protective lies parents tell their children. With razor-sharp subtext and poignant prop storytelling, the script demonstrates exceptional craft discipline.',
      recommendation: 'RECOMMEND',
      marketViability: 'Festival Contender',
      strengths: [
        'Masterful subtext and economy of dialogue in high-pressure two-hander setup.',
        'Superb integration of props (silver coin, violin case, unsent prison letters) as physical emotional meters.',
        'Strong visual framing utilizing train motion, rain, and dawn transitions.',
        'High production feasibility with minimal cast and contained location.',
      ],
      areasForDevelopment: [
        'Scene 2 dialogue slightly veers into overt exposition regarding the mother\'s service.',
        'Timeline gap between midnight departure and dawn arrival needs a formal narrative bridge.',
      ],
      executiveSummary:
        'A festival-ready, deeply cinematic short screenplay that showcases mature writing craft. Highly recommended for production, student showcase portfolios, or expansion into a feature-length chamber piece.',
    },
  },
  {
    id: 'blue-hour',
    title: 'BLUE HOUR',
    author: 'Marcus Sterling',
    genre: 'Thriller',
    pageCount: 42,
    lastEdited: '2 hours ago',
    storyIntelligenceScore: 74,
    categoryScores: {
      structure: 78,
      character: 76,
      dialogue: 69,
      pacing: 82,
      theme: 72,
      visualStorytelling: 80,
    },
    logline:
      'During the brief twilight before sunrise in an offshore research observatory, a marine acoustic researcher intercepts a distress signal originating from deep inside her own sub-floor ballast tank.',
    fullRawText: `INT. OFFSHORE OBSERVATORY - BLUE HOUR

Deep oceanic twilight filters through two-inch quartz viewports. The ocean outside is an endless sapphire abyss.

DR. MAYA LIN (34) adjusts the frequency dials on a vintage hydrophone console. Oscilloscope green waves dance across the phosphor screen.

A rhythmic, low-frequency pulse emerges through the headphones: THUMP... THUMP... PAUSE... THUMP.

MAYA
(into microphone)
Observation Deck to Tender. David, confirm your dive team is cleared from Sector 4.

RADIO (V.O.)
Deck, this is David. Dive team has been docked in Aberdeen since 18:00. You're alone out there until Friday.

Maya's fingers freeze on the gain knob.

The acoustic pulse repeats—louder. This time, accompanied by metal scratching against the sub-floor ballast hatch beneath her chair.`,
    scenes: [
      {
        id: 'bh-1',
        sceneNumber: 1,
        slugline: 'INT. OFFSHORE OBSERVATORY - BLUE HOUR',
        location: 'Offshore Observatory',
        timeOfDay: 'DAWN',
        act: 'Act I',
        pageNumber: 1,
        estDurationMinutes: 3,
        conflictIntensity: 78,
        dialogueDensity: 45,
        actionDensity: 70,
        emotionalValence: -30,
        summary: 'Maya discovers an impossible acoustic frequency echoing from beneath her floorboards.',
        content: `INT. OFFSHORE OBSERVATORY - BLUE HOUR

Deep oceanic twilight filters through two-inch quartz viewports. The ocean outside is an endless sapphire abyss.

DR. MAYA LIN (34) adjusts the frequency dials on a vintage hydrophone console. Oscilloscope green waves dance across the phosphor screen.

A rhythmic, low-frequency pulse emerges through the headphones: THUMP... THUMP... PAUSE... THUMP.

MAYA
(into microphone)
Observation Deck to Tender. David, confirm your dive team is cleared from Sector 4.

RADIO (V.O.)
Deck, this is David. Dive team has been docked in Aberdeen since 18:00. You're alone out there until Friday.

Maya's fingers freeze on the gain knob.

The acoustic pulse repeats—louder. This time, accompanied by metal scratching against the sub-floor ballast hatch beneath her chair.`,
        dialogueLines: [
          {
            id: 'bhd-1',
            character: 'MAYA',
            parenthetical: 'into microphone',
            line: 'Observation Deck to Tender. David, confirm your dive team is cleared from Sector 4.',
            subtextScore: 70,
            naturalnessScore: 88,
            tensionScore: 85,
            subtextAnalysis: {
              surfaceMeaning: 'Radio check on dive team locations.',
              underlyingEmotion: 'Mounting dread that an intruder or anomalous pressure leak has breached the rig.',
              whyItWorksOrStruggles: 'Professional protocol masks personal terror.',
              suggestedAlternative: 'David, tell me the secondary buoy team is doing hull maintenance.',
            },
          },
        ],
        charactersPresent: ['DR. MAYA LIN'],
        themesAddressed: ['Isolation', 'The Unfathomable Deep', 'Technological Fragility'],
        motifsPresent: ['Phosphor Green Wave', 'Sapphire Twilight', 'Ballast Hatch'],
        aiAnnotations: [
          {
            id: 'bh-ann-1',
            lineSnippet: 'metal scratching against the sub-floor ballast hatch',
            type: 'pacing',
            title: 'Immediate Hook Delivery',
            observation: 'The tactile auditory horror lands within the first 90 seconds.',
            whyItMatters: 'Establishes high thriller stakes without unnecessary exposition.',
            suggestion: 'Build up the ambient hum before the first strike to maximize acoustic contrast.',
            severity: 'low',
          },
        ],
      },
    ],
    characters: [
      {
        id: 'c-maya',
        name: 'DR. MAYA LIN',
        role: 'Protagonist',
        externalGoal: 'Identify the source of the ballast breach and seal the primary bulkhead.',
        internalNeed: 'Overcome her panic induced by deep-water phobia after a past submarine incident.',
        coreFear: 'Suffocation in the black depths of the North Sea.',
        stakes: 'Complete structural implosion of the offshore station.',
        arcSummary: 'Scientific Detachment → Primal Survival Panic → Decisive Action',
        arcStages: [
          { stage: 'Scientific Routine', sceneNumber: 1, description: 'Monitoring whale acoustic pathways.', emotionalState: 40 },
          { stage: 'Bulkhead Breach', sceneNumber: 2, description: 'Direct contact with anomalous diver.', emotionalState: 85 },
        ],
        voiceProfile: {
          vocabularyCadence: 'Scientific, technical shorthand, rapid under pressure.',
          emotionalDefenseMechanism: 'Reciting sensor data and pressure readings.',
          dialogueRhythm: 'Crisp, clinical, urgent.',
          distinctivePhrasing: 'Sonar ping; Psi rating; Barometric drop.',
        },
        screenTimePercentage: 92,
        sceneAppearances: [1],
        relationships: [],
      },
    ],
    storyBeats: [
      {
        id: 'bh-b1',
        beatName: 'Opening Image',
        act: 'Act I',
        targetPage: 1,
        actualScene: 1,
        dramaticFunction: 'Establishes solitary offshore isolation and underwater sensor technology.',
        craftEvaluation: 'Strong',
        description: 'The blue hour observatory suspended over the abyss.',
        aiFeedback: {
          observation: 'Great atmospheric immersion.',
          whyItMatters: 'Sets the isolation parameter essential for horror/thriller.',
          suggestion: 'Enhance the acoustic descriptions in parentheticals.',
        },
      },
    ],
    themeMotifs: [
      {
        id: 'bh-t1',
        name: 'The Abyss / Claustrophobia',
        type: 'theme',
        description: 'Vast ocean outside contrasted with claustrophobic iron capsule inside.',
        sceneChain: [1],
        occurrences: [
          { sceneNumber: 1, contextQuote: 'The ocean outside is an endless sapphire abyss.', thematicResonance: 'Cosmic scale vs human insignificance.' },
        ],
      },
    ],
    continuityIssues: [
      {
        id: 'bh-cont-1',
        category: 'Character Knowledge',
        severity: 'Moderate',
        title: 'Aberdeen Docking Verification',
        firstScene: 1,
        secondScene: 1,
        description: 'David confirms the tender is in Aberdeen, but earlier logs in the treatment implied a 20-minute Zodiac response time.',
        evidenceA: 'Scene 1: "Dive team has been docked in Aberdeen since 18:00."',
        evidenceB: 'Treatment page 3: "Support craft is stationed 2 miles off buoy 7."',
        resolutionOptions: [
          {
            optionTitle: 'Clarify Storm Evacuation',
            proposedPatch: 'Add radio line: "We were ordered back to Aberdeen due to the gale warning."',
            impactDescription: 'Justifies why Maya cannot expect immediate rescue.',
          },
        ],
      },
    ],
    coverage: {
      logline:
        'A solitary acoustic researcher aboard an offshore observatory intercepts a rhythmic tapping coming from inside her flooded ballast tanks, uncovering a sabotaged deep-sea diving pod.',
      synopsis:
        'A high-tension single-location thriller combining the procedural intelligence of The Abyss with the claustrophobic dread of Alien. Excellent tension engineering.',
      recommendation: 'CONSIDER',
      marketViability: 'Prestige TV Pilot',
      strengths: ['Superb sound design notes and acoustic suspense.', 'Tight single-location production economy.'],
      areasForDevelopment: ['Dialogue between Maya and David on the radio needs higher character specificity.'],
      executiveSummary: 'A promising thriller premise with exceptional visual and acoustic atmosphere.',
    },
  },
  {
    id: 'ithaca-odyssey',
    title: 'ITHACA: ODYSSEY REDUX',
    author: 'Callum Thorne',
    genre: 'Sci-Fi',
    pageCount: 112,
    lastEdited: 'Yesterday',
    storyIntelligenceScore: 91,
    categoryScores: {
      structure: 94,
      character: 92,
      dialogue: 88,
      pacing: 89,
      theme: 96,
      visualStorytelling: 92,
    },
    logline:
      'Following a twenty-year interstellar drift across uncharted gravitational rifts, a weary starship navigator finally enters the orbital approach of her home colony—only to find it occupied by corporate suitors vying for the throne.',
    fullRawText: `EXT. ORBIT OF ITHACA PRIME - SPACE

A silent, monolithic ocean world swathed in cyan storm bands. Two silver moons cast twin crescents across the deep blue atmosphere.

Drifting out of the cosmic shadow: THE ARGO-9, scarred by asteroid micro-impacts, solar sails torn like antique linen.

INT. NAVIGATION BRIDGE - CONTINUOUS

Starlight filters through the faceted crystal dome. Ancient navigational bronze charts are pinned over modern digital holograms.

CAPTAIN ODESSA (49) stands over the astrolabe interface. Her hair is silvered at the temples; her eyes carry the gravity of twenty light-years.

She runs a calloused thumb across the tarnished brass compass she has carried since the Jovian War.

ODESSA
Athena, calculate descent vector.

ATHENA (AI VOICE)
(warm, calm cadence)
Descent vector locked. Warning: Ithaca station communications are not responding on colonial frequencies. 

Odessa narrows her eyes.

ODESSA
Who is broadcasting on the royal beacon?

ATHENA
Twelve corporate mining freighters, Captain. They have moored at your gates. They believe you died in the Sirens Nebula.

Odessa draws a slow breath. She slips the bronze compass into her flight suit.

ODESSA
Then let us see if they remember how Ithaca deals with suitors.`,
    scenes: [
      {
        id: 'ith-1',
        sceneNumber: 1,
        slugline: 'EXT. ORBIT OF ITHACA PRIME - SPACE',
        location: 'Orbit of Ithaca Prime',
        timeOfDay: 'NIGHT',
        act: 'Act I',
        pageNumber: 1,
        estDurationMinutes: 3,
        conflictIntensity: 60,
        dialogueDensity: 20,
        actionDensity: 80,
        emotionalValence: 10,
        summary: 'Odessa\'s battered flagship emerges from deep space above her home ocean colony.',
        content: `EXT. ORBIT OF ITHACA PRIME - SPACE

A silent, monolithic ocean world swathed in cyan storm bands. Two silver moons cast twin crescents across the deep blue atmosphere.

Drifting out of the cosmic shadow: THE ARGO-9, scarred by asteroid micro-impacts, solar sails torn like antique linen.`,
        dialogueLines: [],
        charactersPresent: [],
        themesAddressed: ['Homecoming', 'The Cost of the Long Odyssey'],
        motifsPresent: ['Two Silver Moons', 'Torn Solar Sails', 'Deep Blue Ocean Colony'],
        aiAnnotations: [
          {
            id: 'ith-ann-1',
            lineSnippet: 'solar sails torn like antique linen',
            type: 'visual',
            title: 'Homeric Metaphor in Hard Sci-Fi',
            observation: 'The classical imagery reinforces the mythic archetype without breaking hard sci-fi rules.',
            whyItMatters: 'Builds an evocative aesthetic bridge between the ancient epic and high-concept space opera.',
            suggestion: 'Maintain this hybrid antiquity/cybernetics motif in Odessa\'s costume design.',
            severity: 'low',
          },
        ],
      },
      {
        id: 'ith-2',
        sceneNumber: 2,
        slugline: 'INT. NAVIGATION BRIDGE - CONTINUOUS',
        location: 'Navigation Bridge',
        timeOfDay: 'NIGHT',
        act: 'Act I',
        pageNumber: 2,
        estDurationMinutes: 4,
        conflictIntensity: 82,
        dialogueDensity: 75,
        actionDensity: 40,
        emotionalValence: -10,
        summary: 'Odessa learns from Athena AI that colonial suitors have occupied Ithaca.',
        content: `INT. NAVIGATION BRIDGE - CONTINUOUS

Starlight filters through the faceted crystal dome. Ancient navigational bronze charts are pinned over modern digital holograms.

CAPTAIN ODESSA (49) stands over the astrolabe interface. Her hair is silvered at the temples; her eyes carry the gravity of twenty light-years.

She runs a calloused thumb across the tarnished brass compass she has carried since the Jovian War.

ODESSA
Athena, calculate descent vector.

ATHENA (AI VOICE)
(warm, calm cadence)
Descent vector locked. Warning: Ithaca station communications are not responding on colonial frequencies.

ODESSA
Who is broadcasting on the royal beacon?

ATHENA
Twelve corporate mining freighters, Captain. They have moored at your gates. They believe you died in the Sirens Nebula.

ODESSA
Then let us see if they remember how Ithaca deals with suitors.`,
        dialogueLines: [
          {
            id: 'ithd-1',
            character: 'ODESSA',
            line: 'Then let us see if they remember how Ithaca deals with suitors.',
            subtextScore: 92,
            naturalnessScore: 89,
            tensionScore: 95,
            subtextAnalysis: {
              surfaceMeaning: 'Preparing to confront the corporate ships.',
              underlyingEmotion: 'Fierce sovereign determination forged in twenty years of solitary survival.',
              whyItWorksOrStruggles: 'Epic mythic gravitas delivered with disciplined brevity.',
              suggestedAlternative: 'Prepare the ion bow.',
            },
          },
        ],
        charactersPresent: ['CAPTAIN ODESSA', 'ATHENA (AI)'],
        themesAddressed: ['Reclaiming Sovereign Identity', 'The Incorruptible Navigator'],
        motifsPresent: ['Tarnished Brass Compass', 'Astrolabe Interface', 'Corporate Freighters'],
        aiAnnotations: [
          {
            id: 'ith-ann-2',
            lineSnippet: 'Ancient navigational bronze charts are pinned over modern digital holograms.',
            type: 'theme',
            title: 'Visual Synthesis of Craft & Tech',
            observation: 'Directly mirrors the ScriptForge philosophy of ancient wisdom meets AI precision.',
            whyItMatters: 'Communicates Odessa\'s dual identity as both classic explorer and tech commander.',
            suggestion: 'Feature the tactile compass clicking in subsequent confrontation scenes.',
            severity: 'low',
          },
        ],
      },
    ],
    characters: [
      {
        id: 'c-odessa',
        name: 'CAPTAIN ODESSA',
        role: 'Protagonist',
        externalGoal: 'Reclaim her home colony station from twelve predatory corporate cartels.',
        internalNeed: 'Acknowledge that Ithaca has evolved in her absence and that she cannot simply return to the past.',
        coreFear: 'Finding that her family and people no longer recognize her.',
        stakes: 'The permanent strip-mining and enslavement of the Ithaca oceanic ecosystem.',
        arcSummary: 'Exiled Wanderer → Infiltrator in Disguise → Just Ruler Reclaimed',
        arcStages: [
          { stage: 'Return from the Void', sceneNumber: 1, description: 'Reaches Ithaca orbit after twenty light years.', emotionalState: 45 },
          { stage: 'The Discovery of the Suitors', sceneNumber: 2, description: 'Vows retribution against the cartels.', emotionalState: 80 },
        ],
        voiceProfile: {
          vocabularyCadence: 'Regal, nautical, stoic, commanding without raising volume.',
          emotionalDefenseMechanism: 'Consulting physical navigational instruments.',
          dialogueRhythm: 'Measured, rhythmic, ancient cadence.',
          distinctivePhrasing: 'By the salt tide; Keep the heading; Suitors at the gate.',
        },
        screenTimePercentage: 74,
        sceneAppearances: [1, 2],
        relationships: [],
      },
    ],
    storyBeats: [
      {
        id: 'ith-b1',
        beatName: 'Opening Image & Return',
        act: 'Act I',
        targetPage: 1,
        actualScene: 1,
        dramaticFunction: 'Epic return of the legendary voyager to her home world.',
        craftEvaluation: 'Strong',
        description: 'The battered Argo-9 drifts over Ithaca Prime\'s cyan oceans.',
        aiFeedback: {
          observation: 'Outstanding visual scale and thematic weight.',
          whyItMatters: 'Immediately commands prestige sci-fi prestige interest.',
          suggestion: 'Highlight the contrast between the pristine world and the scarred starship.',
        },
      },
    ],
    themeMotifs: [
      {
        id: 'ith-t1',
        name: 'The Astrolabe & Brass Compass (True North)',
        type: 'symbol',
        description: 'Physical compass representing unwavering moral navigation.',
        sceneChain: [1, 2],
        occurrences: [
          { sceneNumber: 2, contextQuote: 'She runs a calloused thumb across the tarnished brass compass.', thematicResonance: 'The constant in an ever-shifting universe.' },
        ],
      },
    ],
    continuityIssues: [],
    coverage: {
      logline:
        'Twenty years after vanishing into an uncharted gravitational anomaly, legendary star-captain Odessa returns to her oceanic colony world to find it besieged by twelve predatory corporate consortiums claiming her throne.',
      synopsis:
        'A magnificent, literary space opera that transposes Homer\'s Odyssey into a hard sci-fi marine setting. Exceptional dialogue, mythic resonance, and towering female lead.',
      recommendation: 'RECOMMEND',
      marketViability: 'Studio Spec',
      strengths: ['Electrifying dialogue with genuine mythic weight.', 'Deeply realized visual worldbuilding.'],
      areasForDevelopment: ['Ensure corporate suitor motivations remain nuanced and distinct.'],
      executiveSummary: 'An extraordinary spec screenplay with major studio franchise potential.',
    },
  },
  {
    id: 'echoes-of-neon',
    title: 'ECHOES OF NEON',
    author: 'Sora Tanaka',
    genre: 'Noir',
    pageCount: 94,
    lastEdited: '3 days ago',
    storyIntelligenceScore: 85,
    categoryScores: {
      structure: 88,
      character: 87,
      dialogue: 84,
      pacing: 80,
      theme: 86,
      visualStorytelling: 89,
    },
    logline:
      'In a waterlogged subterranean megacity, a washed-up memory detective is hired to extract the final recorded thoughts of a murdered synthetic diva—only to hear her singing his dead wife’s favorite lullaby.',
    fullRawText: `INT. DETECTIVE OFFICE - RAINY NIGHT

Neon light from the Holo-Billboard outside paints the Venetian blinds in cyan and amber streaks.

KAI (42) sits with his boots on a dented steel desk. Cybernetic ocular implant flickering like a faulty fluorescent bulb.

The door chimes. A woman in a translucent silk trench coat enters, smelling of ozone and black orchids.`,
    scenes: [],
    characters: [],
    storyBeats: [],
    themeMotifs: [],
    continuityIssues: [],
    coverage: {
      logline: 'A memory retrieval detective in rain-soaked Neo-Shinjuku gets embroiled in a conspiracy involving synthetic pop stars and forbidden human nostalgia.',
      synopsis: 'Stylized neo-noir with razor-sharp dialogue, melancholic visual poetry, and gripping mystery plotting.',
      recommendation: 'RECOMMEND',
      marketViability: 'Indie Arthouse',
      strengths: ['Atmospheric worldbuilding and sensory prose.', 'Compelling cynical protagonist voice.'],
      areasForDevelopment: ['Second act pacing can be tightened in the archives sequence.'],
      executiveSummary: 'Stylish cyberpunk detective piece with strong international festival appeal.',
    },
  },
];
