import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/IfI5TQHHAx/e69at13w_expires_30_days.png" }}
        resizeMode="stretch"
        style={styles.largeIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeIcon: {
    width: width * 0.1,
    height: width * 0.1,
    marginLeft: width * 0.04,
  },
});

export default BackButton;
