export interface University {
  id: string;
  name: string;
  country: string;
  aliases?: string[];
}

export const universities: University[] = [
  // UK Universities - Russell Group
  { id: "oxford", name: "University of Oxford", country: "UK", aliases: ["Oxford"] },
  { id: "cambridge", name: "University of Cambridge", country: "UK", aliases: ["Cambridge"] },
  { id: "imperial", name: "Imperial College London", country: "UK", aliases: ["Imperial", "ICL"] },
  { id: "ucl", name: "University College London", country: "UK", aliases: ["UCL"] },
  { id: "kcl", name: "King's College London", country: "UK", aliases: ["KCL", "King's"] },
  { id: "lse", name: "London School of Economics", country: "UK", aliases: ["LSE"] },
  { id: "edinburgh", name: "University of Edinburgh", country: "UK", aliases: ["Edinburgh"] },
  { id: "manchester", name: "University of Manchester", country: "UK", aliases: ["Manchester"] },
  { id: "warwick", name: "University of Warwick", country: "UK", aliases: ["Warwick"] },
  { id: "bristol", name: "University of Bristol", country: "UK", aliases: ["Bristol"] },
  { id: "glasgow", name: "University of Glasgow", country: "UK", aliases: ["Glasgow"] },
  { id: "birmingham", name: "University of Birmingham", country: "UK", aliases: ["Birmingham"] },
  { id: "nottingham", name: "University of Nottingham", country: "UK", aliases: ["Nottingham"] },
  { id: "southampton", name: "University of Southampton", country: "UK", aliases: ["Southampton"] },
  { id: "leeds", name: "University of Leeds", country: "UK", aliases: ["Leeds"] },
  { id: "sheffield", name: "University of Sheffield", country: "UK", aliases: ["Sheffield"] },
  { id: "durham", name: "Durham University", country: "UK", aliases: ["Durham"] },
  { id: "st-andrews", name: "University of St Andrews", country: "UK", aliases: ["St Andrews"] },
  { id: "york", name: "University of York", country: "UK", aliases: ["York"] },
  { id: "exeter", name: "University of Exeter", country: "UK", aliases: ["Exeter"] },
  
  // Other Top UK Universities
  { id: "bath", name: "University of Bath", country: "UK", aliases: ["Bath"] },
  { id: "lancaster", name: "Lancaster University", country: "UK", aliases: ["Lancaster"] },
  { id: "loughborough", name: "Loughborough University", country: "UK", aliases: ["Loughborough"] },
  { id: "surrey", name: "University of Surrey", country: "UK", aliases: ["Surrey"] },
  { id: "sussex", name: "University of Sussex", country: "UK", aliases: ["Sussex"] },
  
  // US Universities - Ivy League
  { id: "harvard", name: "Harvard University", country: "US", aliases: ["Harvard"] },
  { id: "yale", name: "Yale University", country: "US", aliases: ["Yale"] },
  { id: "princeton", name: "Princeton University", country: "US", aliases: ["Princeton"] },
  { id: "columbia", name: "Columbia University", country: "US", aliases: ["Columbia"] },
  { id: "pennsylvania", name: "University of Pennsylvania", country: "US", aliases: ["UPenn", "Penn"] },
  { id: "dartmouth", name: "Dartmouth College", country: "US", aliases: ["Dartmouth"] },
  { id: "brown", name: "Brown University", country: "US", aliases: ["Brown"] },
  { id: "cornell", name: "Cornell University", country: "US", aliases: ["Cornell"] },
  
  // Other Top US Universities
  { id: "mit", name: "Massachusetts Institute of Technology", country: "US", aliases: ["MIT"] },
  { id: "stanford", name: "Stanford University", country: "US", aliases: ["Stanford"] },
  { id: "caltech", name: "California Institute of Technology", country: "US", aliases: ["Caltech"] },
  { id: "chicago", name: "University of Chicago", country: "US", aliases: ["UChicago"] },
  { id: "northwestern", name: "Northwestern University", country: "US", aliases: ["Northwestern"] },
  { id: "duke", name: "Duke University", country: "US", aliases: ["Duke"] },
  { id: "johns-hopkins", name: "Johns Hopkins University", country: "US", aliases: ["Johns Hopkins", "JHU"] },
  { id: "vanderbilt", name: "Vanderbilt University", country: "US", aliases: ["Vanderbilt"] },
  { id: "rice", name: "Rice University", country: "US", aliases: ["Rice"] },
  { id: "carnegie-mellon", name: "Carnegie Mellon University", country: "US", aliases: ["CMU"] },
  { id: "emory", name: "Emory University", country: "US", aliases: ["Emory"] },
  { id: "georgetown", name: "Georgetown University", country: "US", aliases: ["Georgetown"] },
  { id: "berkeley", name: "University of California, Berkeley", country: "US", aliases: ["UC Berkeley", "Berkeley"] },
  { id: "ucla", name: "University of California, Los Angeles", country: "US", aliases: ["UCLA"] },
  { id: "michigan", name: "University of Michigan", country: "US", aliases: ["UMich", "Michigan"] },
  { id: "nyu", name: "New York University", country: "US", aliases: ["NYU"] },
  
  // Canadian Universities
  { id: "toronto", name: "University of Toronto", country: "Canada", aliases: ["UofT"] },
  { id: "mcgill", name: "McGill University", country: "Canada", aliases: ["McGill"] },
  { id: "ubc", name: "University of British Columbia", country: "Canada", aliases: ["UBC"] },
  { id: "waterloo", name: "University of Waterloo", country: "Canada", aliases: ["Waterloo"] },
  
  // Australian Universities
  { id: "melbourne", name: "University of Melbourne", country: "Australia", aliases: ["Melbourne"] },
  { id: "sydney", name: "University of Sydney", country: "Australia", aliases: ["Sydney"] },
  { id: "anu", name: "Australian National University", country: "Australia", aliases: ["ANU"] },
  { id: "unsw", name: "University of New South Wales", country: "Australia", aliases: ["UNSW"] },
  { id: "queensland", name: "University of Queensland", country: "Australia", aliases: ["UQ"] },
  { id: "monash", name: "Monash University", country: "Australia", aliases: ["Monash"] },
];
