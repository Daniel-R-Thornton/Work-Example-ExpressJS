using System.Text.Json.Serialization;

namespace Server.Models
{
    public class FundingSource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        // Navigation property for the relationship (a funding source can have many clients) internal only 
        [JsonIgnore]
        public ICollection<Client> Clients { get; set; }

    }
}