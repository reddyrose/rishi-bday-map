// ============================================================
//  FRIEND CONFIG — add each person as one object in this array
//  All friend data lives here and nowhere else.
// ============================================================
//
// TEMPLATE — copy this block and fill in the fields:
//
// {
//   name:    "First Name",          // displayed in the modal + hover label
//   city:    "City, ST",            // displayed in the modal subtitle
//   yearMet: 2015,                  // used by the timeline filter
//   svgX:    500,                   // x position on the 960×600 SVG map
//   svgY:    300,                   // y position on the 960×600 SVG map
//   driveId: "1AbCdEfGhIj..."       // Google Drive file ID from the share link
//                                   // Share link looks like:
//                                   // https://drive.google.com/file/d/FILE_ID/view
//                                   //                               ^^^^^^^^ copy this part
// },
//
// Quick SVG coordinate reference (Albers Equal-Area projection, 960×600):
//   New York City  → svgX: 846, svgY: 217
//   Los Angeles    → svgX:  95, svgY: 353
//   Chicago        → svgX: 624, svgY: 226
//   Houston        → svgX: 502, svgY: 489
//   Phoenix        → svgX: 201, svgY: 387
//   Philadelphia   → svgX: 831, svgY: 237
//   San Antonio    → svgX: 443, svgY: 496
//   San Diego      → svgX: 108, svgY: 385
//   Dallas         → svgX: 475, svgY: 425
//   San Jose       → svgX:  52, svgY: 270
//   Austin         → svgX: 457, svgY: 478
//   Seattle        → svgX: 106, svgY:  60
//   Denver         → svgX: 341, svgY: 271
//   Boston         → svgX: 884, svgY: 172
//   Nashville      → svgX: 650, svgY: 346
//   Atlanta        → svgX: 698, svgY: 392
//   Miami          → svgX: 801, svgY: 547
//   Minneapolis    → svgX: 532, svgY: 166
//   Portland, OR   → svgX:  88, svgY: 100
//   Las Vegas      → svgX: 159, svgY: 321
//   Washington DC  → svgX: 806, svgY: 265
//   New Orleans    → svgX: 601, svgY: 482
//   Salt Lake City → svgX: 231, svgY: 235
//   Kansas City    → svgX: 514, svgY: 291
//   Memphis        → svgX: 595, svgY: 372
//   Charlotte      → svgX: 756, svgY: 353
//   Detroit        → svgX: 696, svgY: 209
//   St. Louis      → svgX: 587, svgY: 298
//   Pittsburgh     → svgX: 751, svgY: 241
//   Raleigh        → svgX: 792, svgY: 335
// ============================================================

const friends = [
  {
    name:    "Sameer + Jerry + Sarah + Jack",
    city:    "NYC",
    yearMet: 2025,
    svgX:    846,
    svgY:    219,
    vertical: true,
    driveId: "1HBOxRsZDw9mtMbZDiBiHpQWRZdfJOWSU"
  },
  {
    name:    "Adyant",
    city:    "Nashua, NH",
    yearMet: 2021,
    svgX:    879,
    svgY:    168,
    vertical: true,
    driveId: "1RByU8AQtKZ_RqvGJrE9J0A28cre_vMp_"
  },
  {
    name: "Marcus",
    city: "Orlando, FL",
    yearMet: 2021,
    svgX:    769,
    svgY:    494,
    vertical: true,
    driveId: "1xu4KzuUzReeDqIRt3NUo871hPFcIWEWh"
  },
  {
    name:    "Sarah",
    city:    "NYC",
    yearMet: 2025,
    svgX:    846,
    svgY:    217,
    vertical: true,
    driveId: "1-Btx95CEAikxrSYToUOeN1mFB8mpvXsd"
  },
  {
    name:    "Devanshu",
    city:    "Stanford, CA",
    yearMet: 2021,
    svgX:    48,
    svgY:    262,
    vertical: true,
    driveId: "13TEBiyUl90SS-p_Y_hxqD_AjMjsvfNF7"
  },
  {
    name:    "Maya",
    city:    "NYC",
    yearMet: 2022,
    svgX:    846,
    svgY:    219,
    vertical: true,
    driveId: "1gT0rGtxA3e5pEuI1UHKHpF4-YMYSpEKg"
  },
  {
    name:    "Amrita",
    city:    "Stanford, CA",
    yearMet: 2023,
    svgX:    48,
    svgY:    267,
    vertical: true,
    driveId: "1vTbULriZUzbWdLQh1DiK0LR4zX9zE6CQ"
  },
  {
    name:    "Arjun",
    city:    "Stanford, CA",
    yearMet: 2021,
    svgX:    48,
    svgY:    267,
    vertical: true,
    driveId: "1B55VppDRTu8a_B4ZY0jv3zdhtGahmKYu"
  },
  {
    name:    "Ashna",
    city:    "Stanford, CA",
    yearMet: 2023,
    svgX:    48,
    svgY:    267,
    vertical: true,
    driveId: "1YddlBZ1Rsg4_QW2stlshTFIU3B1DieRc"
  },
  {
    name:    "Corrie",
    city:    "Boston, MA",
    yearMet: 2021,
    svgX:    879,
    svgY:    168,
    vertical: true,
    driveId: "1Ja6euKm950jeM2iCchrRoqlsqNAU8clT"
  },
  {
    name:    "Kevin",
    city:    "NYC",
    yearMet: 2014,
    svgX:    846,
    svgY:    217,
    vertical: true,
    driveId: "1Gfmeok0bRRCE4yBEiBFwDajLrwF-OSln"
  },
  {
    name:    "Krishna",
    city:    "NYC",
    yearMet: 2014,
    svgX:    846,
    svgY:    217,
    vertical: true,
    driveId: "1chtVCfHP6GN2PrVKSHwq2jLm3Tstpqu0"
  },
    {
    name:    "Karthik",
    city:    "NYC",
    yearMet: 2022,
    svgX:    846,
    svgY:    217,
    vertical: true,
    driveId: "TBD"
  },
  {
    name:    "Norah",
    city:    "Seattle, WA",
    yearMet: 2014,
    svgX:    100,
    svgY:    60,
    vertical: true,
    driveId: "1ZBJCRLcyvKRiSJqdM1Wl5GzXwzyj3Y6P"
  },
  {
    name:    "Sam",
    city:    "Stanford, CA",
    yearMet: 2025,
    svgX:    48,
    svgY:    267,
    vertical: true,
    driveId: "1ncB9TUmyXYK3PkIX8A1Iy6o3Jop4RJqF"
  },
  {
    name:    "Sherry",
    city:    "San Francisco, CA",
    yearMet: 2024,
    svgX:    46,
    svgY:    259,
    vertical: true,
    driveId: "1E9AREJHCauv0Th3CLZOTgdSC-upexhNp"
  },
  {
    name:    "Raghav",
    city:    "Stanford, CA",
    yearMet: 2021,
    svgX:    48,
    svgY:    267,
    vertical: true,
    driveId: "TBD"
  },
  {
    name:    "Liz",
    city:    "San Francisco, CA",
    yearMet: 2024,
    svgX:    46,
    svgY:    259,
    vertical: true,
    driveId: "1w12VP1H__gIfBrISw1bquVuxr9KWYsqK"
  },
  {
    name:    "Artur",
    city:    "San Francisco, CA",
    yearMet: 2024,
    svgX:    46,
    svgY:    259,
    vertical: true,
    driveId: "TBD"
  },
  {
    name:    "Kohi",
    city:    "NYC",
    yearMet: 2024,
    svgX:    846,
    svgY:    219,
    vertical: true,
    driveId: "1-KAG0HipeuM7RJWJF8GJVe8U-yxlHAL6"
  },
  {
    name:    "Saloni",
    city:    "NYC",
    yearMet: 2021,
    svgX:    846,
    svgY:    219,
    vertical: true,
    driveId: "TBD"
  },
  {
    name:    "Kimi",
    city:    "Berkeley, CA",
    yearMet: 2021,
    svgX:    49,
    svgY:    258,
    vertical: true,
    driveId: "13t0pu-bThTQ7jAexQQ-lswVZQGKTc4OF"
  },
  {
    name:    "Ritwik",
    city:    "Stanford, CA",
    yearMet: 2021,
    svgX:    48,
    svgY:    267,
    vertical: true,
    driveId: "TBD"
  },
  {
    name:    "Vignesh",
    city:    "Boston, MA",
    yearMet: 2021,
    svgX:    879,
    svgY:    168,
    vertical: true,
    driveId: "1qIrzQtq0qF2yZmhWodeXesgGSuWufiQ8"
  },
  {
    name:    "Khusbhu",
    city:    "Boston, MA",
    yearMet: 2021,
    svgX:    879,
    svgY:    168,
    vertical: true,
    driveId: "REPLACE_WITH_DRIVE_ID"
  },
  {
    name:    "Gaby",
    city:    "NYC",
    yearMet: 2014,
    svgX:    846,
    svgY:    219,
    vertical: true,
    driveId: "189tKlfDHJdv7DSpMtwEbZWX8HH4CTtjS"
  },
  {
    name:    "Avika",
    city:    "NYC",
    yearMet: 2022,
    svgX:    846,
    svgY:    219,
    vertical: true,
    driveId: "TBD"
  },
];

// Home / center point — Rishi's hometown — all arcs radiate from here
// Update svgX/svgY to match his actual hometown using the coordinate table above
const HOME = { svgX: 846, svgY: 217, label: "Home" };
