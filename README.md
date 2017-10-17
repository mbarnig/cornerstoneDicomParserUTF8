## cornerstoneDicomParserUTF8

For the RadioLogic project started two years ago, I needed a DICOM parser supporting UTF8 encoded data.

RadioLogic is a teaching and assessment tool for radiologists, work in progress. It's a webapp optimized for use on iPAD's.

In a first step I succesfully patched [Chris Hafey](https://github.com/chafey)'s distribution file [dicomParser.js](https://github.com/chafey/dicomParser/blob/master/dist/dicomParser.js) to parse the RadioLogic teaching files. 

In a second step I modified the source files to document the changes and to build new distribution files. This approach is described in the present wiki page [First Approach](https://github.com/mbarnig/cornerstoneDicomParserUTF8/wiki/First-Approach).

Following feedback from Chris Hafey and the [cornerstone-platform community](https://groups.google.com/forum/#!topic/cornerstone-platform/RyhpMVeW0Ls), I am currently creating a separate decoding module to support not only UTF8, but also other DICOM character set encodings.

 
