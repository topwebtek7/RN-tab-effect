import React, { useCallback, useState } from 'react';
import { Image, Text, SafeAreaView, ScrollView, StatusBar, View, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import Lightbox from './Lightbox';
import Image1 from '../assets/images/rabbit1.jpeg';
import Image2 from '../assets/images/cat1.jpeg';

const exampleText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a dui nisi. Pellentesque tincidunt vel risus id tincidunt. Praesent tristique vulputate bibendum. Nullam dolor nibh, sollicitudin non turpis eget, accumsan fermentum est. Vivamus et mauris in eros molestie lobortis. Cras sit amet nunc consectetur, pretium mauris gravida, commodo nulla. Curabitur sit amet turpis eget tellus porta porttitor a et ante. Nullam fringilla, libero ut accumsan ultricies, lacus risus posuere magna, sit amet tempus purus dui sed quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim dignissim erat non aliquet. Vestibulum ac leo tincidunt, mollis massa sit amet, condimentum lacus. In pretium a est nec suscipit. Proin pulvinar pulvinar suscipit. Donec tortor odio, hendrerit in posuere sit amet, fermentum vitae elit. Quisque quis tellus semper, hendrerit nunc ut, hendrerit tellus.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a dui nisi. Pellentesque tincidunt vel risus id tincidunt. Praesent tristique vulputate bibendum. Nullam dolor nibh, sollicitudin non turpis eget, accumsan fermentum est. Vivamus et mauris in eros molestie lobortis. Cras sit amet nunc consectetur, pretium mauris gravida, commodo nulla. Curabitur sit amet turpis eget tellus porta porttitor a et ante. Nullam fringilla, libero ut accumsan ultricies, lacus risus posuere magna, sit amet tempus purus dui sed quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim dignissim erat non aliquet. Vestibulum ac leo tincidunt, mollis massa sit amet, condimentum lacus. In pretium a est nec suscipit. Proin pulvinar pulvinar suscipit. Donec tortor odio, hendrerit in posuere sit amet, fermentum vitae elit. Quisque quis tellus semper, hendrerit nunc ut, hendrerit tellus.
`;
const data = [
  { image: Image1, text: exampleText },
  { image: Image2, text: exampleText },
  { image: Image1, text: exampleText },
];

export const Description = styled.Text`
${(props) => props.hidden
  ? `display: none;`
  : 'display: block;'
}
`;

export const SafeAreaViewContainer = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight ? `padding-top: ${StatusBar.currentHeight}px` : ''};
  background-color: black;
`;

export const ScrollViewContainer = styled(ScrollView)`
`;

export const ImageViewContainer = styled(View)`
  overflow: hidden;
  border-radius: 20px;
  border-width: 1px;
  border-color: black;
`;

export const CustomImageOnModal = styled(Image)`
  padding: 0;
  margin: 0;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
`;


const CustomScrollList = ({ navigator }) => {
  const [showLightBox, setShowLightBox] = useState(false);
  const onOpenModal = useCallback(() => {
    setShowLightBox(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowLightBox(false);
  }, []);
  return (
    <SafeAreaViewContainer>
      <ScrollViewContainer contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 100 }}>
        {data.map((item, index) => (
          <Lightbox key={index} didOpen={onOpenModal} willClose={onCloseModal} style={{ marginBottom: 30 }}
            renderContent={
              () => <>
                <CustomImageOnModal source={item.image} resizeMode="cover" />
                <Description style={{ color: '#777' }} hidden={!showLightBox}>
                  {item.text}
                </Description>
              </>
            }>
            <ImageViewContainer>
              <Image source={item.image} resizeMode="cover" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, borderRadius: 20 }} />
            </ImageViewContainer>
          </Lightbox>
        ))}
      </ScrollViewContainer>
    </SafeAreaViewContainer>
  );
};

export default CustomScrollList;
