using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models;
public class Client
{
    public int Id { get; set; }

    public string Name { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string MainLanguage { get; set; }
    public string SecondaryLanguage { get; set; }

    // Foreign Key
    public int FundingSourceId { get; set; }

    public FundingSource FundingSource { get; set; }

}