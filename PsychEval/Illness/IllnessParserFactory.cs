using System.IO;
using System.Text;
using LumenWorks.Framework.IO.Csv;
using Microsoft.Extensions.Options;

namespace PsychEval.Illness
{
    public sealed class IllnessParserFactory
    {
        private readonly CsvParserOptions _csvParserOptions;

        public IllnessParserFactory(IOptions<CsvParserOptions> csvParserOptions)
        {
            _csvParserOptions = csvParserOptions.Value;
        }

        public CachedCsvReader GetCsvReader()
        {
            var sr = new StreamReader(_csvParserOptions.FilePath, Encoding.GetEncoding(_csvParserOptions.Encoding));
            return new CachedCsvReader(sr, hasHeaders: true, delimiter: _csvParserOptions.Delimiter);
        }
    }
}
