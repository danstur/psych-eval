using System;
using System.Collections;
using System.Collections.Generic;

namespace PsychEval.Illness.Application
{
    [Serializable]
    public sealed class IllnessResponse
    {
        public string Id { get; }

        public string Name { get; }

        public string Description { get; }

        public ICollection<string> Symptoms { get; }

        public IllnessResponse(string id, string name, string description, ICollection<string> symptoms)
        {
            Id = id;
            Name = name;
            Description = description;
            Symptoms = symptoms;
        }
    }
}