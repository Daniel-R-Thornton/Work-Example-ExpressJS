using System.ComponentModel.DataAnnotations;

public class ClientDto
{
    [Required]
    public string Name { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string MainLanguage { get; set; }
    public string SecondaryLanguage { get; set; }
    public int FundingSourceId { get; set; }
}
