namespace PsychEval.Illness
{
    public sealed class CsvParserOptions
    {
        public string FilePath { get; set; } = "data.csv";

        public char Delimiter { get; set; } = ',';

        public string Encoding { get; set; } = "Utf-8-NOBOM";
    }
}
