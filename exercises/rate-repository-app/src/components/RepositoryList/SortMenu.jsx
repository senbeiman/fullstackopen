import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Menu, Modal, Portal } from 'react-native-paper';
import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary
  },
  menu: {
    backgroundColor: 'white',
    padding: 12,
    margin: 20
  }
});
const SortMenu = ({ current, onPress }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  const createText = (value) => {
    switch (value) {
      case 'latest':
        return 'Latest repositories';
      case 'highest':
        return 'Highest rated repositories';
      case 'lowest':
        return 'Lowest rated repositories';
      default:
        throw Error('invalid value for sort menu');
    }
  };
  return (
      <View>
        <Portal>
          <Modal visible={visible} onDismiss={closeMenu} contentContainerStyle={styles.menu}>
          <Menu.Item title="Select an item..." disabled/>
          <Menu.Item onPress={() => {onPress('latest');}} title={createText('latest')} />
          <Menu.Item onPress={() => {onPress('highest');}} title={createText('highest')} />
          <Menu.Item onPress={() => {onPress('lowest');}} title={createText('lowest')} />
          </Modal>
        </Portal>
        <TouchableWithoutFeedback onPress={openMenu}>
          <View style={styles.container}>
            <Text>{createText(current)}</Text>
            <Button icon='chevron-down'></Button>
          </View>
        </TouchableWithoutFeedback>


      </View>
  );
};

export default SortMenu;