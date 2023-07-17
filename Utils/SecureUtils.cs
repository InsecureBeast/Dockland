using System.Security;

namespace Dockland.Utils
{
    public class SecureUtils
    {
        internal static SecureString StringToSecureString(string str)
        {
            var chars = str.ToCharArray();

            var secure = new SecureString();
            for (var i = 0; i < chars.Length; i++)
            {
                secure.AppendChar(chars[i]);
            }

            secure.MakeReadOnly();

            return secure;
        }
    }

}
