import { makeScene, makeChoice } from '../StoryEngine';

const approveScene = makeScene({
  id: 'approved',
  title: 'Pre-Approval Success',
  body: 'Congratulations — based on the info you provided, you look eligible for pre-approval. Next: compare offers and lock your rate.',
  choices: [makeChoice('Restart', null)]
});

const sampleScene = makeScene({
  id: 'start',
  title: 'Welcome — Your Home Loan Journey',
  body: 'You are starting your home loan application journey. Choose an initial action to learn more.',
  choices: [
    makeChoice('Check credit & docs', approveScene),
    makeChoice('Estimate budget', approveScene)
  ]
});

export default sampleScene;
