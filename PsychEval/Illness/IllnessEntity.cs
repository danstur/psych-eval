using System;
using System.Collections.Generic;
using System.Linq;

namespace PsychEval.Illness
{
    [Serializable]
    public sealed class IllnessEntity
    {
        public string Id { get; }

        public string Name { get; }

        public string Description { get; }

        public ICollection<string> Symptoms { get; }

        public IllnessEntity(string id, string name, string description, ICollection<string> symptoms)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("Id should not be null or empty.", nameof(id));
            }
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name should not be null or empty.", nameof(name));
            }
            if (string.IsNullOrWhiteSpace(description))
            {
                throw new ArgumentException("Description should not be null or empty.", nameof(description));
            }
            if (!symptoms.Any())
            {
                throw new ArgumentException("At least one symptom must be specified.", nameof(symptoms));
            }
            Id = id;
            Name = name;
            Description = description;
            Symptoms = symptoms;
        }
    }
}
