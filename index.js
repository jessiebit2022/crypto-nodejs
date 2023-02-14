const fs = require('fs');
const crypto = require('crypto');

// Generate a public and private key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Save the public and private keys to files
fs.writeFileSync('public.pem', publicKey);
fs.writeFileSync('private.pem', privateKey);

// Define the plaintext to be encrypted
const plainText = 'Hello world';

// Sign and encrypt the plaintext using the private key
const sign = crypto.createSign('SHA256');
sign.update(plainText);
const signature = sign.sign(privateKey, 'base64');
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(plainText)).toString('base64');

// Decrypt the ciphertext using the public key
const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(encrypted, 'base64')).toString();

// Verify the signature using the public key
const verify = crypto.createVerify('SHA256');
verify.update(plainText);
const isVerified = verify.verify(publicKey, signature, 'base64');

// Output the results
console.log('Plaintext:', plainText);
console.log('Encrypted:', encrypted);
console.log('Decrypted:', decrypted);
console.log('Signature:', signature);
console.log('Is signature verified using public key?', isVerified);
