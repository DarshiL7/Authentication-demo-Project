
using System.ComponentModel.DataAnnotations;


namespace Authentication_Demo_Project.Model.Models
{
    
    public class Authentication
    {
        
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
