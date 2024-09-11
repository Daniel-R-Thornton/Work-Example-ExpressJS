using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class FundingSource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        // Navigation property for the relationship (a funding source can have many clients)
        public ICollection<Client> Clients { get; set; }

    }
}