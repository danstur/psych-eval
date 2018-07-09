using System;
using System.IO;
using System.Text;

namespace PsychEval.Illness
{
    public sealed class IllnessParserConfiguration
    {
        private readonly string _illnessCsvFilePath;

        public TextReader GetCsvStream()
        {
            return new StreamReader(_illnessCsvFilePath, new UTF8Encoding(false));
        }

        private IllnessParserConfiguration(string illnessCsvFilePath)
        {
            _illnessCsvFilePath = illnessCsvFilePath;
        }

        public static IllnessParserConfiguration Create(string illnessCsvFilePath)
        {
            if (string.IsNullOrEmpty(illnessCsvFilePath))
            {
                throw new ArgumentNullException(nameof(illnessCsvFilePath));
            }
            if (!File.Exists(illnessCsvFilePath))
            {
                throw new InvalidOperationException($"File '{illnessCsvFilePath}' does not exist.");
            }
            return new IllnessParserConfiguration(illnessCsvFilePath);
        }
    }
}