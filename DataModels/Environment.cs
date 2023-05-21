using FASTER.core;
using Newtonsoft.Json;

namespace Dockland.DataModels
{
    public class EnvironmentData
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public string? Tag { get; set; }

        public override string ToString() => JsonConvert.SerializeObject(this);
    }

    public class EnvironmentDataSerializer : BinaryObjectSerializer<EnvironmentData>
    {
        public override void Serialize(ref EnvironmentData value)
        {
            var str = JsonConvert.SerializeObject(value);
            writer.Write(str);
        }

        public override void Deserialize(out EnvironmentData value)
        {
            var str = reader.ReadString();
            value = JsonConvert.DeserializeObject<EnvironmentData>(str);
        }
    }

    public class EnvironmentDataInput
    {
        public EnvironmentData value;

        public override string ToString() => value.ToString();
    }

    public class EnvironmentDataOutput
    {
        public EnvironmentData value;

        public override string ToString() => value.ToString();
    }

    public class EnvironmentDataContext { }

    public sealed class Functions : FunctionsBase<string, EnvironmentData, EnvironmentDataInput, EnvironmentDataOutput, EnvironmentDataContext>
    {
        public override bool InitialUpdater(ref string key, ref EnvironmentDataInput input, ref EnvironmentData value, ref EnvironmentDataOutput output, ref RMWInfo rmwInfo)
        {
            value = input.value;
            return true;
        }
        public override bool CopyUpdater(ref string key, ref EnvironmentDataInput input, ref EnvironmentData oldValue, ref EnvironmentData newValue, ref EnvironmentDataOutput output, ref RMWInfo rmwInfo)
        {
            newValue = oldValue;
            return true;
        }
        public override bool InPlaceUpdater(ref string key, ref EnvironmentDataInput input, ref EnvironmentData value, ref EnvironmentDataOutput output, ref RMWInfo rmwInfo)
        {
            value = input.value;
            return true;
        }


        public override bool SingleReader(ref string key, ref EnvironmentDataInput input, ref EnvironmentData value, ref EnvironmentDataOutput dst, ref ReadInfo readInfo)
        {
            dst.value = value;
            return true;
        }

        public override bool ConcurrentReader(ref string key, ref EnvironmentDataInput input, ref EnvironmentData value, ref EnvironmentDataOutput dst, ref ReadInfo readInfo)
        {
            dst.value = value;
            return true;
        }

        public override void ReadCompletionCallback(ref string key, ref EnvironmentDataInput input, ref EnvironmentDataOutput output, EnvironmentDataContext ctx, Status status, RecordMetadata recordMetadata)
        {
            if (output.value.Name == key)
                Console.WriteLine("Success!");
        }
    }

}
