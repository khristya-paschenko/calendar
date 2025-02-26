import { Modal, View } from 'react-native';
import React from 'react';
import { styles } from '~/shared/components/bottom-modal/bottom-modal.styles';

type BottomModalProps = {
  visible: boolean;
  children: React.ReactNode;
};
export const BottomModal = ({ visible, children }: BottomModalProps) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>{children}</View>
      </View>
    </Modal>
  );
};
