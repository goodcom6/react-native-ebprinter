
This demo demonstrates how to use the react-native-ebprinter SDK to print receipts. The react-native-ebprinter SDK supports Goodcom POS machines, Bluetooth printers, USB printers, and Wi-Fi printers.
<p float="left">
  <img src="images/DemoUi.png" width="50%" />
  <img src="images/Receipt.png" width="50%" />
</p>
This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Installation

```bash
npm install react-native-ebprinter --save
```

or

```bash
yarn add react-native-ebprinter
```

## Step 2: Add dependenceie

* modify  app/build.gradle under the android project：

```javascript
implementation project(':react-native-ebprinter')
```

## Step 3: Add 'EbPrinterPackage' to MainApplication

```java
import com.goodcom.react.EbPrinter.EbPrinterPackage;
...

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new EbPrinterPackage()
            );
```

## Step 4: Import in React-Native

```javascript
import EbPrinter, {FontSize, AlignmentType, BarcodeType} from 'react-native-ebprinter';
```

## API

### Constants
FontSize : font size
AlignmentType : Alignment Type
BarcodeType : Barcode Type
| Type           | Sub type                                                    | 
|:-----:|:-----------:|
|FontSize        |Default,Small,Medium,Big,DoubleHeight,DoubleWidth,SmallBold,MediumBold,BigBold,DoubleHeightBold,DoubleWidthBold  |
|AlignmentType   |Left,Center,Right                                            |
|BarcodeType     |barcodeUpca,barcodeUpce,barcodeEan8,barcodeEan13,barcodeCode128,barcodeCode39,barcodeCodeBar,barcodeItf,barcodeCode93,barcodeQrCode  |
### Method 

| Method                 | Parameter                                                | Return Type       |
|:-----:|:-----------:|:-----------:|
| drawText               |strLeft, fontLeft, strMid, fontMid, strRight, fontRight   | void              |
| printText              |isAutoFeed                                                | void              |
| drawLeftRight          |strLeft, fontLeft, strRight, fontRight                    | void              |
| drawCustom             |string, fontSize, align                                   | void              |
| drawNewLine            |                                                          | void              |
| drawOneLine            |fontSize                                                  | void              |
| drawOneLineDefault     |                                                          | void              |
| drawBarcode            |str, align, type                                          | void              |
| drawBarcodeWithHeight  |string, align, type, height                               | void              |
| drawQrCode             |string, align                                             | void              |
| drawQrCodeWithHeight   |string,align,height                                       | void              |
| isDeviceSupport        |                                                          | `Promise<number>` |
| printJson              |json                                                      | void              |
| printImageByBase64     |base64, align, isAutoFeed                                 | void              |
| printImageByArray      |byteArray, align, isAutoFeed                              | void              |
| openCashBox            |                                                          | void              |
| showLcdBitmapByBase64  |base64                                                    | void              |
| showLcdBitmapByArray   |byteArray                                                 | void              |
| selectBluetoothPrinter |macAddress                                                | void              |
| selectUsbPrinter       |deviceInfo                                                | void              |
| selectUsbPrinterById   |vid, pid                                                  | void              |
| selectNetworkPrinter   |ipAddress, port                                           |`Promise<boolean>` |
| getBluetoothDeviceList |                                                          |`Promise<string[]>`|
| getUsbDeviceList       |                                                          |`Promise<string[]>`|

```javascript

  /**
   * Draw text into memory, you can specify the position and font size of the printed text, and you can print the left, middle, and right text at the same line
   * You can continuously use drawText to draw all the contents into memory, and finally use printText to print the contents.
   */
  drawText: (strLeft, fontLeft, strMid, fontMid, strRight, fontRight) => void,
 /**
   * Start printing. Except for image printing, other APIs, such as drawText, just draw the printing content in the memory first, and the printing has not been started yet.
   * This method is to print out the printing content in the memory.Control whether to automatically feed paper through isAutoFeed
   */
  printText: (isAutoFeed) => void,
  /**
   * Draw text into memory, you can print left-aligned and right-aligned content at the same line. It needs to be printed using printText.
   */
  drawLeftRight: (strLeft, fontLeft, strRight, fontRight) => void,
  /**
   * Draw text content to memory, you can specify the size and position of the content. It needs to be printed using printText.
   */
  drawCustom: (string, fontSize, align) => void,
  /**
   * Draw a blank line, similar to a newline.
   */
  drawNewLine: () => void,
  /**
   * Draw a horizontal line, you can specify the thickness of the horizontal line by setting the font size.
   */
  drawOneLine: (fontSize) => void,
  /**
   * Draw a horizontal line, use the default font without specifying the font size
   */
  drawOneLineDefault: () => void,
  /**
   * Draw barcodes, including qrcode, you can specify the alignment position and barcode type of the barcode.
   */
  drawBarcode: (str, align, type) => void,
  /**
   * Draw barcodes, including qrcode, you can specify the alignment position and barcode type of the barcode.
   * The height of the barcode can be specified. No width parameter is required, the width is determined by the specific barcode
   */
  drawBarcodeWithHeight: (string, align, type, height) => void,
   /**
   * Draw qrcode,you can specify the alignment position of the qrcode.
   */
  drawQrCode: (string, align) => void;
  /**
   * Draw qrcode,you can specify the alignment position of the qrcode.
   * The height of the qrcode can be specified. No width parameter is required, the width is determined by the specific qrcode
   */
  drawQrCodeWithHeight: (string,align,height) => void;  
  /**
   * Check whether printing is supported. This method returns true only on goodcom printers. This method allows the app to distinguish printers from different manufacturers.
   */
  isDeviceSupport: () => Promise<string>,
  /**
   * Print the content in json format, which will be parsed by the printer according to the template and formatted for printing
   */
  printJson: (json) => void,
  /**
   * Printing an image using base64 encoding, the Base64 string must start with "data:image/png;base64,"
   * You can set the alignment position of the printed image, and decide whether to automatically feed the paper after printing.
   * If you want to print the text after printing the image, the paper will not be automatically fed.
   */
  printImageByBase64: (base64, align, isAutoFeed) => void,
  /**
  * Printing an image using byteArray
  * You can set the alignment position of the printed image, and decide whether to automatically feed the paper after printing.
  * If you want to print the text after printing the image, the paper will not be automatically fed.
  */
  printImageByArray: (byteArray, align, isAutoFeed) => void,
  /**
  * Used to open the cash box, it will be opened once when called. Currently, only GT11R is supported
  */
  openCashBox: () => void,
  /**
  * Show bitmap in customer display LCD by base64 encoding
  * The maximum size is 240 * 320,Images smaller than the customer display screen will be displayed in the center.
  * This feature is supported on some models.
  */
  showLcdBitmapByBase64: (base64) => void,
  /**
  * Show bitmap in customer display LCD by byteArray
  * The maximum size is 240 * 320,Images smaller than the customer display screen will be displayed in the center.
  * This feature is supported on some models.
  */
  showLcdBitmapByArray: (byteArray) => void,
  /**
  * Select Bluetooth printing and set the bluetooth address of the Bluetooth printer device. 
  * This method is not mandatory. 
  * When no Bluetooth device address is set, the SDK will automatically display a list of devices for the user to select.
  */
  selectBluetoothPrinter: (macAddress) => void,
  /**
  * Select USB printing and specify the USB printing device
  * The deviceInfo format: vendor_id: xxx product_id: yyy Where xxx represents the vendor ID and yyy represents the product ID
  */
  selectUsbPrinter: (deviceInfo) => void,
  /**
  * Select USB printing and specify the USB printing device
  */
  selectUsbPrinterById: (vid ,pid) => void,
  /**
  * Select network printing and specify the IP address of the device.
  */
  selectNetworkPrinter: (ipAddress, port) => void,
  /**
  * Get Bluetooth devices
  */
  getBluetoothDeviceList: () => Promise<string[]>,
  /**
  * Get USB devices.
  */
  getUsbDeviceList: ()=>  Promise<string[]>,

```
