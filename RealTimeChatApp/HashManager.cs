using System;
using System.Security.Cryptography;
using System.Text;

namespace RealTimeChatApp
{
    public class HashManager
    {
        private static string GenerateSalt()
        {
            Guid id = Guid.NewGuid();
            var salt = id.ToString();
            return salt;
        }


        public static byte[] GenerateHash(string password)
        {
            string salt = GenerateSalt();
            byte[] unhashed = Encoding.Unicode.GetBytes(String.Concat(salt, password));
            SHA256Managed sha256 = new SHA256Managed();
            byte[] hashed = sha256.ComputeHash(unhashed);

            return hashed;
        }


        public static bool CompareHash(string password, byte[] hash)
        {
            string storedHash = Convert.ToBase64String(hash);
            string newHash = Convert.ToBase64String(GenerateHash(password));
            return storedHash == newHash;
        }
    }
}
