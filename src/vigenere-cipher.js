const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
constructor(isDirect = true) {
  this.isDirect = isDirect;
}

  encrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }

    return this.#process(message, key, true)
  }

  decrypt(encryptedMessage, key) {
    if (encryptedMessage === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }

    return this.#process(encryptedMessage, key, false)
  }

  #process(input, key, isEncrypt) {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const upperInput = input.toUpperCase();
    const upperKey = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < upperInput.length; i++) {
      const inputChar = upperInput[i];
      const inputCharIndex = ALPHABET.indexOf(inputChar);

      if (inputCharIndex === -1) {
        result += inputChar;
        continue;
      }

      const keyChar = upperKey[keyIndex % upperKey.length];
      const keyCharIndex = ALPHABET.indexOf(keyChar);

      const shift = isEncrypt
        ? (inputCharIndex + keyCharIndex) % ALPHABET.length
        : (inputCharIndex - keyCharIndex + ALPHABET.length) % ALPHABET.length;

      result += ALPHABET[shift];

      keyIndex++;
    }
    
    return this.isDirect ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
