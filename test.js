import { CompactEncrypt, importSPKI } from 'jose';

const publicKeyPem =
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtHFI9bdz4gVxOIAAw+lsuh9IcuFD6sfPqav9jqx+qIMiBFlbd/859jmcEb4/pBMQCxZuWMQ21UYYB9b9r6YH0vxbwWKOTgZdeh5LznuCTG+jL83VKbIuTixBLDE5M4pen8TUmIovCBuyIFvfs6omD2QnUAE5+SyCwDgtHOW0Hl7t7PTKnPLO0n4bJKnGPLuzneka2GD1s7h+buETW5kGy+Gu4mejz+XvHNRHwCFtgmMrYwjQ1GD6kjBecBLgp6xh3WSr8vSAEt3vKxgLY71DzeCFrtGmx2Kg06jSACNvF+miNzK8l4lQRVscCOjE0ltt+6joEWbTb9DjDIRG+FzktwIDAQAB
-----END PUBLIC KEY-----
`;
const publicKey = await importSPKI(publicKeyPem, 'RSA-OAEP-256');

const payload = new TextEncoder().encode(JSON.stringify({ pan: 'CBNPB7317M' }));

const jwe = await new CompactEncrypt(payload)
  .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
  .encrypt(publicKey);

console.log(jwe); // header.encryptedKey.iv.ciphertext.tag