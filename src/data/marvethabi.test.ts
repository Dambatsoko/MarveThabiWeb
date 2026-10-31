import test from 'node:test';
import assert from 'node:assert/strict';
import { leadershipTeamData, getLeaderBySlug } from './marvethabi';

test('leadership team contains exactly 3 directors with mapped photographs', () => {
  assert.equal(leadershipTeamData.length, 3);
  
  const slugs = leadershipTeamData.map((l) => l.slug);
  assert.ok(slugs.includes('marvellous-ngoatle'));
  assert.ok(slugs.includes('thabang-ngoatle'));
  assert.ok(slugs.includes('jonas-lufuluabo'));

  const marvellous = leadershipTeamData.find((l) => l.slug === 'marvellous-ngoatle');
  const thabang = leadershipTeamData.find((l) => l.slug === 'thabang-ngoatle');
  const jonas = leadershipTeamData.find((l) => l.slug === 'jonas-lufuluabo');

  assert.equal(marvellous?.image, 'Marvelous.png');
  assert.equal(thabang?.image, 'Thabang.png');
  assert.equal(jonas?.image, 'Jonas.png');
});

test('each leadership member has the exact requested LinkedIn profile URL', () => {
  const marvellous = leadershipTeamData.find((l) => l.slug === 'marvellous-ngoatle');
  const thabang = leadershipTeamData.find((l) => l.slug === 'thabang-ngoatle');
  const jonas = leadershipTeamData.find((l) => l.slug === 'jonas-lufuluabo');

  assert.equal(
    marvellous?.linkedinUrl,
    'https://www.linkedin.com/in/marvelous-tladi-ngoatle-pr-tech-eng-msaiee-72591a116/'
  );
  assert.equal(
    thabang?.linkedinUrl,
    'https://www.linkedin.com/in/thabang-ngoatle-pr-sci-nat-63647521a/'
  );
  assert.equal(
    jonas?.linkedinUrl,
    'https://za.linkedin.com/in/jonas-lufuluabo-a6a971186?trk=public_post_follow-view-profile'
  );
});

test('getLeaderBySlug preserves the leader LinkedIn profile URL', () => {
  const leaderM = getLeaderBySlug('marvellous-ngoatle');
  assert.equal(
    leaderM?.linkedinUrl,
    'https://www.linkedin.com/in/marvelous-tladi-ngoatle-pr-tech-eng-msaiee-72591a116/'
  );

  const leaderT = getLeaderBySlug('thabang-ngoatle');
  assert.equal(
    leaderT?.linkedinUrl,
    'https://www.linkedin.com/in/thabang-ngoatle-pr-sci-nat-63647521a/'
  );

  const leaderJ = getLeaderBySlug('jonas-lufuluabo');
  assert.equal(
    leaderJ?.linkedinUrl,
    'https://za.linkedin.com/in/jonas-lufuluabo-a6a971186?trk=public_post_follow-view-profile'
  );
});
