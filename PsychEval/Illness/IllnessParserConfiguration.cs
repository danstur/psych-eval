using LumenWorks.Framework.IO.Csv;

namespace PsychEval.Illness
{
    public sealed class IllnessParserConfiguration
    {

        public CachedCsvReader GetCsvReader()
        {
            //return new StreamReader(_illnessCsvFilePath, new UTF8Encoding(false));
            var delimiter = ',';
            return new CachedCsvReader(null, hasHeaders: true, delimiter: delimiter);
        }
    }
}