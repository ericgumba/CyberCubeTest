// Link.react.test.js
import React from 'react';
import CharactersCard from '../Components/CharactersCard';
import renderer from 'react-test-renderer';

test('Tests that CharactersCard renders properly', () => {
  const component = renderer.create(
    <CharactersCard name={"Luke Skywaler"} species={"Human"}></CharactersCard>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
 
 
});