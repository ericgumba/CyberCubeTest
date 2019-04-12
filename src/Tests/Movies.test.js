// Link.react.test.js
import React from 'react';
import MoviesCard from '../Components/MovieCard';
import renderer from 'react-test-renderer';
import App from '../App'
test('Tests that MoviesCard renders properly', () => {
  const component = renderer.create(
    <MoviesCard title={"A New Hope"} displayCharacters={() => App.displayCharacters()}></MoviesCard>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
 
 
});