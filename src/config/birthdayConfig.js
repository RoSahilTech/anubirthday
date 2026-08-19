/**
 * ANUSHKA — THE BIRTHDAY QUEST
 * Configuration File
 * 
 * Edit this file to easily customize text, messages, questions, and clues
 * for Anushka Mehta's 22nd Birthday!
 */

export const birthdayConfig = {
  // Person details
  name: "Anushka Mehta",
  shortName: "Anushka",
  age: 22,
  birthdayYear: 2026,

  // Stage 1: Mystery Intro
  intro: {
    greeting: "Hey Anushka...",
    subtitle1: "I made something special for you.",
    subtitle2: "But there's a small catch...",
    challenge: "You're going to have to earn it. 👀",
    buttonText: "BEGIN THE ADVENTURE",
  },

  // Stage 2: Identity Check
  identityCheck: {
    title: "ACCESSING MEMORY DATABASE...",
    subtitle: "IDENTITY VERIFICATION REQUIRED",
    question: "Who is this secret digital quest created for?",
    options: [
      { id: "anushka", label: "Anushka Mehta", isCorrect: true },
      { id: "someone_else", label: "Someone else", isCorrect: false, response: "Wrong answer! Please report to the nearest Birthday Bureau immediately. 😂" },
      { id: "not_me", label: "Definitely not me", isCorrect: false, response: "Nice try 😂 But the system knows who you are!" },
      { id: "fbi", label: "My FBI Agent 🕵️‍♀️", isCorrect: false, response: "Your FBI agent is currently busy celebrating your birthday too! Try again. 👀" },
    ],
    successMessage: "IDENTITY CONFIRMED ✓",
    welcomeMessage: "Welcome, Anushka. Initiating memory decapsulation sequence...",
  },

  // Stage 3: Memory Access Cards Captions
  memoryDatabaseCaptions: [
    "One of those moments worth remembering forever.",
    "This one still brings an instant smile.",
    "Some memories don't need any explanation.",
    "Unfiltered joy captured in a single frame.",
    "A golden moment in the story of you.",
  ],

  // Stage 4: Jigsaw Puzzle
  puzzle: {
    title: "MEMORY FRAGMENT DETECTED",
    instructions: "Drag or tap adjacent tiles to assemble this memory fragment.",
    completedMessage: "Memory Restored ❤️",
    buttonText: "CONTINUE QUEST",
  },

  // Stage 5: Hidden Heart
  hiddenHeart: {
    title: "HIDDEN ELEMENT DETECTED",
    instructions: "There's a secret glowing heart hidden inside this memory. Tap around to find it!",
    wrongFeedback: [
      "Not there 👀",
      "Getting warmer...",
      "Almost! Look closer...",
      "Keep searching!",
    ],
    successMessage: "You found it! ❤️ Another memory unlocked.",
  },

  // Stage 6: Memory Quiz
  quiz: {
    title: "MEMORY VERIFICATION QUIZ",
    subtitle: "Answer these 3 questions to unlock deeper archives.",
    questions: [
      {
        id: 1,
        question: "Which vibe best describes your signature aesthetic?",
        options: [
          { text: "Main Character Energy ✨", response: "100% facts! Always radiating main character energy." },
          { text: "Beautiful Chaos 🌪️", response: "Undeniable! The best kind of unpredictable fun." },
          { text: "Cozy & Iconic ☕", response: "Classic Anushka — effortlessly cool." },
        ],
      },
      {
        id: 2,
        question: "What is your secret superpower?",
        options: [
          { text: "Making ordinary days memorable 🌟", response: "Spot on! That's your true magic." },
          { text: "Uncontrollable laughter therapy 😂", response: "Laughter is guaranteed whenever you're around!" },
          { text: "Lighting up every room 💡", response: "A bright light wherever you step." },
        ],
      },
      {
        id: 3,
        question: "How should 22 be celebrated?",
        options: [
          { text: "With endless cake & core memories 🎂", response: "Agreed! Starting right here, right now." },
          { text: "With zero regrets & infinite laughs 🥂", response: "Here's to making 22 your best chapter yet!" },
          { text: "All of the above! 🎉", response: "The only correct answer! 🎉" },
        ],
      },
    ],
  },

  // Stage 7: Evasive Button
  annoyingButton: {
    title: "Ready for the next memory level?",
    buttonText: "YES, CONTINUE",
    teaseTexts: [
      "Too slow! 😜",
      "Almost got it!",
      "Not so fast! 😂",
      "Okay okay... You win! ❤️",
    ],
  },

  // Stage 8: Constellation
  constellation: {
    title: "THE MEMORY CONSTELLATION",
    subtitle: "Every memory is a glowing star in your sky. Tap each star to reveal a photo.",
  },

  // Stage 9: Final Passcode Lock
  finalLock: {
    title: "FINAL MEMORY ARCHIVE",
    subtitle: "One final vault remains sealed. Solve the passcode clue to unlock your birthday reveal.",
    clue: "Enter the name of the person this entire website was made for:",
    placeholder: "TYPE PASSCODE HERE...",
    correctAnswer: "ANUSHKA",
    errorMessage: "That's not it 👀 Check spelling and try again!",
    successMessage: "ACCESS GRANTED 🔓",
  },

  // Stage 10: Fake Ending
  fakeEnding: {
    title: "CONGRATULATIONS!",
    subtitle: "You have completed The Birthday Quest.",
    text: "That's all for today... Hope you had fun!",
    buttonText: "FINISH ADVENTURE",
    glitchText: "WAIT...",
    teaser1: "Did you really think that was all?",
    teaser2: "Not even close. 😈",
  },

  // Stage 11: Real Reveal
  reveal: {
    header: "Happy Birthday, Anushka! ❤️",
    subHeader: "22 looks absolutely stunning on you.",
    caption: "Here begins your real birthday surprise...",
  },

  // Stage 14: Things That Make Anushka Special
  specialThings: [
    { title: "Your Radiant Smile", description: "It brightens up even the dullest days instantly." },
    { title: "Your Magnetic Energy", description: "You bring warmth, excitement, and positivity everywhere you go." },
    { title: "Your Kind Heart", description: "You genuinely care for people and make everyone feel cherished." },
    { title: "Your Beautiful Chaos 😂", description: "Life is never boring with you around — every day is an adventure!" },
    { title: "Your Ability to Make Memories", description: "Turning simple moments into unforgettable stories." },
    { title: "Simply Being YOU", description: "Unapologetically authentic, resilient, and wonderful." },
  ],

  // Stage 15: Final Message & Letter
  finalMessage: {
    header: "Dear Anushka,",
    paragraphs: [
      "I could have simply wished you a Happy Birthday.",
      "But someone as special as you deserves an adventure to remember.",
      "So I built you this tiny digital quest.",
      "Every photograph here represents a precious fragment of laughter, joy, and memories created along the way.",
      "As you step into 22, I hope your year is filled with unfiltered happiness, magical adventures, and a hundred new reasons to smile every single day.",
      "Never stop shining, laughing, and being the incredible person you are.",
      "Happy 22nd Birthday, Anushka! ❤️",
    ],
    closing: "Here's to another year of unforgettable memories.",
    replayButton: "REPLAY THE QUEST",
  },
};
