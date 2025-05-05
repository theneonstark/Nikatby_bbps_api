<?php

namespace App\Helpers;

class CryptoJsAes
{
    public function test()
    {
        return "Test";
    }
    /**
     * Encrypt any value
     * @param string $plainText The text to encrypt
     * @param string $key The encryption key
     * @return string Encrypted hex string
     */
    public static function encrypt($plainText, $key)
    {
        $key = self::hextobin(md5($key));
        $initVector = pack("C*", 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f);
        $openMode = openssl_encrypt($plainText, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $initVector);
        return bin2hex($openMode);
    }

    /**
     * Decrypt an encrypted hex string
     * @param string $encryptedText The encrypted hex string
     * @param string $key The encryption key
     * @return string Decrypted text
     */
    public static function decrypt($encryptedText, $key)
    {
        // dd('Decrypt');
        $key = self::hextobin(md5($key));
        $initVector = pack("C*", 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f);
        $encryptedText = self::hextobin($encryptedText);
        return openssl_decrypt($encryptedText, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $initVector);
    }

    /**
     * Convert a hex string to binary
     * @param string $hexString Hexadecimal string
     * @return string Binary data
     */
    private static function hextobin($hexString)
    {
        return pack("H*", $hexString);
    }
}
