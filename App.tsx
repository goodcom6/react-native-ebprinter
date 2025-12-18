/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import EbPrinter, {FontSize, AlignmentType} from 'react-native-ebprinter';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputRow: {
      flexDirection: 'row',
      flexWrap: 'wrap', // allow wrapping on narrow screens
      justifyContent: 'space-between',
      padding: 10,
    },
    inputContainer: {
      flex: 1,
      minWidth: 100, // prevent too narrow
      borderWidth: 1,
      borderColor: '#ccc',
      marginVertical: 5,
      marginHorizontal: 5,
      padding: 5,
      borderRadius: 5,
    },
    deviceButtonContainer: {
      marginTop: 10,
      paddingHorizontal: 10,
    },
    deviceButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      marginVertical: 5,
      alignItems: 'center',
    },
    deviceButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalView: {
      marginHorizontal: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 20,
      elevation: 5,
    },
    listItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    modalButtonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
      marginVertical: 5,
    },
    printButton: {
      backgroundColor: '#28a745',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      marginVertical: 5,
      alignItems: 'center',
    },
    printButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  // Text Inputs
  const [strLeft, setStrLeft] = useState('Left');
  const [strMid, setStrMid] = useState('Mid');
  const [strRight, setStrRight] = useState('Right');

  // Device button defaults and state
  const DEFAULT_BT = 'Bluetooth Device';
  const DEFAULT_USB = 'Usb Device';
  const DEFAULT_IP = 'IP Device';
  const DEFAULT_OPEN_CASH = 'Open Cash';
  const [selectedBluetooth, setSelectedBluetooth] = useState(DEFAULT_BT);
  const [selectedUsb, setSelectedUsb] = useState(DEFAULT_USB);
  const [selectedIp, setSelectedIp] = useState(DEFAULT_IP);
  const [openCash] = useState(DEFAULT_OPEN_CASH);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'bluetooth' | 'usb' | 'ip' | null>(null);
  const [deviceList, setDeviceList] = useState<string[]>([]);
  const [ipAddress, setIpAddress] = useState('192.168.0.');
  const [ipPort, setIpPort] = useState('9100');

  // Button Handlers
  const printLeft = () => {
    EbPrinter.drawCustom(strLeft, FontSize.Default, AlignmentType.Left);
    EbPrinter.printText(true);
  };
  const printMid = () => {
    EbPrinter.drawText('', 0, strMid, 0, '', 0);
    EbPrinter.printText(true);
  };
  const printRight = () => {
    EbPrinter.drawText('', 0, '', 0, strRight, 0);
    EbPrinter.printText(true);
  };
  const openCashBox = ()=>{
    EbPrinter.openCashBox();
  };
  const printTicket = () => {
    EbPrinter.printImageByBase64(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYQAAACGCAYAAADdAv1sAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M1NjU4OUFEMUZEMTFFREFBM0E4MjQ1N0E0M0IzREUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M1NjU4OUJEMUZEMTFFREFBM0E4MjQ1N0E0M0IzREUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QzU2NTg5OEQxRkQxMUVEQUEzQTgyNDU3QTQzQjNERSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3QzU2NTg5OUQxRkQxMUVEQUEzQTgyNDU3QTQzQjNERSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRG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',
      AlignmentType.Center,
      false,
    );
    EbPrinter.drawOneLine(FontSize.MediumBold);
    EbPrinter.drawCustom('Request Time', FontSize.Medium, AlignmentType.Center);
    EbPrinter.drawCustom('10:03', FontSize.MediumBold, AlignmentType.Center);
    EbPrinter.drawOneLineDefault();
    EbPrinter.drawText(
      '1 x',
      FontSize.SmallBold,
      'test',
      FontSize.SmallBold,
      '65.00',
      FontSize.SmallBold,
    );
    EbPrinter.drawLeftRight(
      'option1',
      FontSize.Default,
      '60.00',
      FontSize.Default,
    );
    EbPrinter.drawText(
      'option2',
      FontSize.Default,
      '',
      FontSize.Default,
      '5.00',
      FontSize.Default,
    );
    EbPrinter.drawQrCode('test123', AlignmentType.Center);
    EbPrinter.drawText('', 0, 'test123', FontSize.Default, '', 0);
    EbPrinter.drawOneLineDefault();
    EbPrinter.drawCustom('Thanks!', FontSize.Small, AlignmentType.Center);
    EbPrinter.printText(true);
  };
  const printImageByBase64 = () => {
    EbPrinter.printImageByBase64(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYQAAACGCAYAAADdAv1sAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M1NjU4OUFEMUZEMTFFREFBM0E4MjQ1N0E0M0IzREUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M1NjU4OUJEMUZEMTFFREFBM0E4MjQ1N0E0M0IzREUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QzU2NTg5OEQxRkQxMUVEQUEzQTgyNDU3QTQzQjNERSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3QzU2NTg5OUQxRkQxMUVEQUEzQTgyNDU3QTQzQjNERSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRG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',
      AlignmentType.Center,
      true,
    );
  };
  // Device Modal Handlers
  const openDeviceModal = async (type: 'bluetooth' | 'usb' | 'ip') => {
    setModalType(type);
    if (type === 'bluetooth') {
      const list = await EbPrinter.getBluetoothDeviceList();
      setDeviceList(list);
    } else if (type === 'usb') {
      const list = await EbPrinter.getUsbDeviceList();
      setDeviceList(list);
    }
    setModalVisible(true);
  };

  const cancelModal = () => setModalVisible(false);

  const selectDevice = (item: string) => {
    if (modalType === 'bluetooth') {
      setSelectedBluetooth(item);
      setSelectedUsb(DEFAULT_USB);
      setSelectedIp(DEFAULT_IP);
      EbPrinter.selectBluetoothPrinter(item);
    } else if (modalType === 'usb') {
      setSelectedUsb(item);
      setSelectedBluetooth(DEFAULT_BT);
      setSelectedIp(DEFAULT_IP);
      EbPrinter.selectUsbPrinter(item);
    }
    cancelModal();
  };

  const confirmIpDevice = () => {
    setSelectedIp(ipAddress);
    setSelectedBluetooth(DEFAULT_BT);
    setSelectedUsb(DEFAULT_USB);
    EbPrinter.selectNetworkPrinter(ipAddress, parseInt(ipPort, 10));
    cancelModal();
  };

  // Custom Button component to preserve case
  const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.deviceButton} onPress={onPress}>
      <Text style={styles.deviceButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const PrintButton = ({ title, onPress }: { title: Element; onPress: () => void }) => (
    <TouchableOpacity style={styles.printButton} onPress={onPress}>
      <Text style={styles.printButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        {/* Left / Mid / Right Row */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <TextInput value={strLeft} onChangeText={setStrLeft} />
            <PrintButton title={<>Print{'\n'}Left</>} onPress={printLeft} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput value={strMid} onChangeText={setStrMid} />
            <PrintButton title={<>Print{'\n'}Mid</>} onPress={printMid} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput value={strRight} onChangeText={setStrRight} />
            <PrintButton title={<>Print{'\n'}Right</>} onPress={printRight} />
          </View>
        </View>

        {/* Print Ticket / Image */}
        <View style={{paddingHorizontal: 10}}>
          <PrintButton title="Print Ticket" onPress={printTicket} />
          <PrintButton
            title="Print Image by Base64"
            onPress={printImageByBase64}
          />
        </View>

        {/* Device Buttons */}
        <View style={styles.deviceButtonContainer}>
          <CustomButton
            title={selectedBluetooth}
            onPress={() => openDeviceModal('bluetooth')}
          />
          <CustomButton
            title={selectedUsb}
            onPress={() => openDeviceModal('usb')}
          />
          <CustomButton
            title={selectedIp}
            onPress={() => openDeviceModal('ip')}
          />
          <CustomButton title={openCash} onPress={openCashBox} />
        </View>

        {/* Modal */}
        <Modal transparent visible={modalVisible} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <View style={styles.modalView}>
              {(modalType === 'bluetooth' || modalType === 'usb') && (
                <>
                  <FlatList
                    data={deviceList}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => selectDevice(item)}>
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <View style={styles.modalButtonRow}>
                    <PrintButton title="Cancel" onPress={cancelModal} />
                  </View>
                </>
              )}
              {modalType === 'ip' && (
                <>
                  <Text>IP Address:</Text>
                  <TextInput
                    style={styles.input}
                    value={ipAddress}
                    onChangeText={text =>
                      setIpAddress(text.replace(/[^0-9.]/g, ''))}
                    keyboardType="numeric"
                  />
                  <Text>Port:</Text>
                  <TextInput
                    style={styles.input}
                    value={ipPort}
                    onChangeText={text =>
                      setIpPort(text.replace(/[^0-9]/g, ''))}
                    keyboardType="numeric"
                  />
                  <View style={styles.modalButtonRow}>
                    <PrintButton title="OK" onPress={confirmIpDevice} />
                    <PrintButton title="Cancel" onPress={cancelModal} />
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
