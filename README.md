## cornerstoneDicomParserUTF8

### Introduction
For the RadioLogic project started two years ago, I needed a DICOM parser supporting UTF8 encoded data.

RadioLogic is a teaching and assessment tool for radiologists, work in progress. It's a webapp optimized for use on iPAD's.

In a first step I succesfully patched [Chris Hafey](https://github.com/chafey)'s distribution file [dicomParser.js](https://github.com/chafey/dicomParser/blob/master/dist/dicomParser.js) to parse the RadioLogic teaching files. I now took time to modify the source files, document the changes and build new distribution files.

For different reasons I prefer to present the results in my own way, instead of using a standard GitHub fork.

### Demos
The following screenshots show the parsing of a RadioLogic test DICOM file, encoded with the specificCharacterSet ISO_IR 192. The term "Nobody" is encoded in different languages (chinese, japanese, arabic, ...) to specify the names of various performers (physician, operator, evaluator, ...). The WiKi page [Translation](https://github.com/mbarnig/cornerstoneDicomParserUTF8/wiki/Translations) shows the related graphic characters used in the different languages.

The first figure shows the display panel of the [parseDicomUTF8 Demo](https://www.radiologic.fr/cornerstoneDicomParserUTF8/examples/dicomParserUTF8/parseDicomUTF8.html) by using the enhanced dicomParser called **cornerstoneDicomParserUTF8**.

<kbd><img src="https://github.com/mbarnig/cornerstoneDicomParserUTF8/blob/master/images/demoUTF8.PNG" width="768" /></kbd>

The second figure shows the [same demo](https://www.radiologic.fr/cornerstoneDicomParserUTF8/examples/dicomParserUTF8/parseDicom.html) by using the standard dicomParser v1.7.5.

<kbd><img src="https://github.com/mbarnig/cornerstoneDicomParserUTF8/blob/master/images/demoNoUTF8.PNG" width="768" /></kbd>

The third and fourth figures show the results of the modified demo [dumpWithDataDictionary](https://www.radiologic.fr/cornerstoneDicomParserUTF8/examples/dumpWithDataDictionary/index.html) v1.7.5 for use on tablets.

<kbd><img src="https://github.com/mbarnig/cornerstoneDicomParserUTF8/blob/master/images/dumpIcloud.PNG" width="768" /></kbd>

<kbd><img src="https://github.com/mbarnig/cornerstoneDicomParserUTF8/blob/master/images/dumpUTF8.PNG" width="768" /></kbd>

The [radiolodic.dcm](https://www.radiologic.fr/cornerstoneDicomParserUTF8/testfiles/radiologic.dcm) testfile is available with the preceding link or in this repository's **testfiles folder**.

### Changes
I tried to integrate the UTF8 support in the [dicomParser](https://github.com/chafey/dicomParser) with a minimum of code change. For this reason the modifications done are not optimal.

#### byteArrayParser.js
A new export function **readFixedStringUTF8()** is added. The uit8array to utf8 string conversion uses the native **decodeURIComponent()** function and is based upon the code published by [Petka Antonow](http://jsfiddle.net/Z9pQE/).

#### dataSet.js
The **string()** and **text()** functions are modified to use the new readFixedStringUTF8 function, if the DICOM data is encoded with ISO_IR 192.

#### index.html of dumpWithDataDictionary
The dragAndDrop FileHandler is replaced by a simple input FileReader to make it work on tablets (iCloud, iDrive, ...). 

The *stringIsAscii = isASCII(str)* test is replaced by the assignment *stringIsAscii = true*.

The closing body tag is moved to the end of the file to make the code W3C compliant.

#### dataDictionary.js of dumpWithDataDictionary
The private RadioLogic tags with group number 4321 are added to the dictionary.

### Installation   
To build the enhanced dicomParser with UTF8 support, clone or download the [master version](https://github.com/chafey/dicomParser.git) from Chris Hafey's GitHub repository, replace the two source files *byteArrayParser.js* and *dataSet.js* with the modified files, saved in the present **scr folder**, and rebuild the project.

Ready-to-use renamed distribution files are saved in the present **dist folder**. The demo *parseDicomUTF8.html* and the modified *index.html* file of the dumpDicomWithDataDictionary demo are available in the **example folder**, together with the modified *dataDictionary.js* file.
