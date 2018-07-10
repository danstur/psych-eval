namespace PsychEval.Illness
{
    public sealed class CsvParserOptions
    {
        public string FilePath { get; set; }

        public char Delimiter { get; set; } = ',';

        public string Encoding { get; set; } = "Utf-8-NOBOM";
    }
}