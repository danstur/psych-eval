using System;
using System.Collections.Generic;
using System.Linq;

namespace PsychEval.Illness
{
    public sealed class IllnessService
    {
        private readonly IllnessParserFactory _parserFactory;

        public IllnessService(IllnessParserFactory parserFactory)
        {
            _parserFactory = parserFactory ?? throw new ArgumentNullException(nameof(parserFactory));
        }

        public ICollection<IllnessEntity> GetIllnesses()
        {
            var illnesses = new List<IllnessEntity>();
            using (var csv = _parserFactory.GetCsvReader())
            {
                csv.SkipEmptyLines = true;
                while (csv.ReadNextRecord())
                {
                    var id = csv["Id"].Trim();
                    var name = csv["Name"].Trim();
                    var description = csv["Description"].Trim();
                    var symptomsCount = csv.FieldCount - 3;
                    var symptoms = Enumerable.Range(3, symptomsCount)
                        .Select(idx => csv[idx].Trim())
                        .Where(s => !string.IsNullOrWhiteSpace(s))
                        .ToList();
                    // Ignore row without any values.
                    if (string.IsNullOrWhiteSpace(id) && string.IsNullOrWhiteSpace(name) &&
                        string.IsNullOrWhiteSpace(description) && !symptoms.Any())
                    {
                        continue;
                    }
                    try
                    {
                        illnesses.Add(new IllnessEntity(id, name, description, symptoms));
                    }
                    catch (ArgumentException e)
                    {
                        var line = csv.GetCurrentRawData();
                        throw new Exception($"Line '{line}' could not be parsed.", e);
                    }
                }
            }
            return illnesses;
        }
    }
}
