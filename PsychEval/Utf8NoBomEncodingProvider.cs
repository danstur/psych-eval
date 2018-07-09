using System;
using System.Text;

namespace PsychEval
{
    internal sealed class Utf8NoBomEncodingProvider : EncodingProvider
    {
        private static readonly UTF8Encoding Utf8NoBom = new UTF8Encoding(false);

        public override Encoding GetEncoding(int codepage)
        {
            return codepage == 65001 ? Utf8NoBom : null;
        }

        public override Encoding GetEncoding(string name)
        {
            return name.Equals("Utf-8-NOBOM", StringComparison.OrdinalIgnoreCase) ? Utf8NoBom : null;
        }
    }
}