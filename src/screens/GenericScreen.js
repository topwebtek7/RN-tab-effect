import React from 'react';
import { Text } from 'react-native';
import { Container } from '../components/Common';
import CustomScrollList from '../components/CustomScrollList';

const GenericScreen = ({ title, navigator }) => {
  return (
    <Container>
      {title === 'Home' || title === 'Bitcoin' ?  (
        <CustomScrollList navigator={navigator} />
      ) : <Text>{title}</Text>}
    </Container>
  );
};

export default GenericScreen;
