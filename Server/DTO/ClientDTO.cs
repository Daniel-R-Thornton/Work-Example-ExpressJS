using System.ComponentModel.DataAnnotations;
using Server.Models;

namespace Server.DTO;
public class ClientDto
{


    [Required]
    public string Name { get; set; }
    [Required]
    public DateTime DateOfBirth { get; set; }
    [Required]
    public string MainLanguage { get; set; }
    [Required]
    public string SecondaryLanguage { get; set; }
    [Required]
    public int FundingSourceId { get; set; }
    public int? Id { get; set; }

    public string? FundingSourceName { get; set; }
}
