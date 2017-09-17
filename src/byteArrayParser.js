/**
 * Internal helper functions common to parsing byte arrays of any type
 */

/**
 * Reads a string of 8-bit characters from an array of bytes and advances
 * the position by length bytes.  A null terminator will end the string
 * but will not effect advancement of the position.  Trailing and leading
 * spaces are preserved (not trimmed)
 * @param byteArray the byteArray to read from
 * @param position the position in the byte array to read from
 * @param length the maximum number of bytes to parse
 * @returns {string} the parsed string
 * @throws error if buffer overread would occur
 * @access private
 */

export function readFixedString (byteArray, position, length) {
  if (length < 0) {
    throw 'dicomParser.readFixedString - length cannot be less than 0';
  }

  if (position + length > byteArray.length) {
    throw 'dicomParser.readFixedString: attempt to read past end of buffer';
  }

  var result = '';
  var byte;

  for (var i = 0; i < length; i++) {
    byte = byteArray[position + i];
    if (byte === 0) {
      position += length;

      return result;
    }
    result += String.fromCharCode(byte);
  }

  return result;
}

/*
*******************************************************************************************************
*  new function readFixedStringUTF8 added by Marco Barnig
*******************************************************************************************************
uint8array to utf8 string conversion based upon code from Petka Antonov
https://github.com/petkaantonov
http://jsfiddle.net/Z9pQE/
https://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
*/

function pad (n) {
  return n.length < 2 ? '0' + n : n;
} // end function pad
	
function bytesToStringUTF8 (array) {
  var str = '';
  for (var i = 0, len = array.length; i < len; ++i) {
    str += ('%' + pad(array[i].toString(16)))
  }  // end for i

  console.log(str);
  // this works only for utf8 byte sequences
  return decodeURIComponent(str);
} // end function bytesToStringUTF8

export function readFixedStringUTF8 (byteArray, position, length) {
  if (length < 0) {
    throw 'dicomParser.readUTF8String - length cannot be less than 0';
  }
  if (position + length > byteArray.length) {
    throw 'dicomParser.readUTF8String: attempt to read past end of buffer';
  }
  let result = '';
  const utf8Array = new Uint8Array(length);
  let byte;

  for (let i = 0; i < length; i++) {
    byte = byteArray[position + i];
    if (byte === 0) {
      position += length;
      result = bytesToStringUTF8(utf8Array);

      return result;
    } // end if byte
    utf8Array[i] = byte;
  }
  result = bytesToStringUTF8(utf8Array);

  return result;
} // end function readUTF8String
